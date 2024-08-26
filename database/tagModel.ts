import { Schema, models, model, Document } from "mongoose";

interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  createdOn: { type: Date, default: Date.now },
});

const Tag = models.Question || model("Tag", TagSchema);

export default Tag;
