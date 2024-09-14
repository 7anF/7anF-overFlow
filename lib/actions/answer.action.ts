"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Interaction from "@/database/iteraction.model";
import User from "@/database/user.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, questions, path } = params;

    const newAnswer = await Answer.create({
      content,
      author,
      questions,
    });

    const question = await Question.findByIdAndUpdate(questions, {
      $push: { answers: newAnswer._id },
    });

    await Interaction.create({
      user: author,
      action: "answer",
      question,
      answer: newAnswer._id,
      tags: question.tags,
    });

    // Increment author's reputation by +10
    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId, filter, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};

    if (filter === "highestUpvotes") {
      sortOptions = { upvotes: -1 };
    } else if (filter === "lowestUpvotes") {
      sortOptions = { upvotes: 1 };
    } else if (filter === "recent") {
      sortOptions = { createdAt: -1 };
    } else if (filter === "old") {
      sortOptions = { createdAt: 1 };
    }

    const answers = await Answer.find({ questions: questionId })
      .populate("author", "_id clerkId name picture")
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalAnswers = await Answer.countDocuments({ questions: questionId });

    const isNext = totalAnswers > skipAmount + pageSize;

    return { answers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { userId, answerId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found!");
    }

    /* Increment author's reputation by +1 for upvoting answer and if 
      it's notUpVoted answer then we will decrement by -1 */
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasupVoted ? -1 : 1 },
    });

    /* Increment author's reputation by +5 for receiving upvoting answer and if 
        it's receiving notUpVoted answer then we will decrement by -5 */
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasupVoted ? -5 : 5 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();

    const { userId, answerId, hasdownVoted, hasupVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found!");
    }
    /* Increment author's reputation by +1 for downVoted answer and if 
      it's notDownVoted answer then we will decrement by -1 */
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasdownVoted ? -1 : 1 },
    });

    /* Increment author's reputation by +5 for receiving notDownVoted answer and if 
          it's receiving downVoted answer then we will decrement by -5 */
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasdownVoted ? 5 : -5 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function DeleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();

    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    await Answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { answers: answerId },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
