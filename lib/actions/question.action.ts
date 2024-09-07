"use server";

import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionByIdParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import Question from "@/database/question.model";

export async function getQuestions(params: any) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({ createdAt: -1 });

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;
    // Create the question

    const question = await Question.create({
      title,
      content,
      author,
      path,
    });

    const tagDocument = [];
    // Cretae the tags or get them if they already exists
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}`, "i") } }, // Find the tag by reg
        { $setOnInsert: { name: tag }, $push: { questions: question._id } }, // Action on that tag
        { upsert: true, new: true } // Additional Info
      );

      tagDocument.push(existingTag._id);
    }

    // Update the question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocument } },
    });

    // Create an interaction record for the user's ask_question action
    // Then we want to increament author's reputation bt +5 for each question

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
