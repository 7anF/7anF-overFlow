"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/iteraction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId } = params;

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return console.log("User has already viewed.");

      // Update view count for the question we current viewing
      await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

      // Create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
