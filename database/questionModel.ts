import { Schema, models, model, Document } from "mongoose";

interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  views: { type: Number, default: 0 },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answers" }],
  createdAt: { type: Date, default: Date.now },
});

// const UserSchema = new Schema<IUser>({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// });

// interface IUser {
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   password: string;
// }

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
