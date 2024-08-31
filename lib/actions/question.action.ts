"use server";

import Question from "@/database/questionModel";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tagModel";

export async function createQuestion(params: any) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;
    // Create the question

    const question = await Question.create({
      title,
      content,
      author,
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
  } catch (error) {}
}
