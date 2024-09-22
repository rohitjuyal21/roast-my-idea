import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  googleId: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    googleId: { type: String },
  },
  { timestamps: true }
);

export const User = models?.User || model<IUser>("User", userSchema);
