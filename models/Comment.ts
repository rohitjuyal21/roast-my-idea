import { Document, model, models, ObjectId, Schema } from "mongoose";

export interface IComment extends Document {
  comment: string;
  user: ObjectId;
  upvotes: ObjectId[];
  downvotes: ObjectId[];
}

const commentSchema = new Schema<IComment>(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    upvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Comment =
  models?.Comment || model<IComment>("Comment", commentSchema);
