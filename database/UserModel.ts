import { Schema, models, model, Document } from "mongoose";

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const User = models.Question || model("User", UserSchema);

export default User;
