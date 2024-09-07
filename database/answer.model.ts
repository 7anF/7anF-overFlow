import { Schema, models, model, Document } from "mongoose";

interface IAnswer extends Document {
  content: string;
  questions: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId[];
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  content: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question", required: true }],
  author: [{ type: Schema.Types.ObjectId, ref: "Users", required: true }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
