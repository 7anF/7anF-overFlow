import { z } from "zod";

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters." })
    .max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const ProfilesSchema = z.object({
  name: z.string().min(4).max(50),
  username: z.string().min(4).max(50),
  portfolioLink: z.union([z.literal(""), z.string().trim().url()]),
  location: z.string().optional(),
  bio: z.string().optional(),
});
