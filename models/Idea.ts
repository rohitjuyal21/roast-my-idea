import { Document, model, models } from "mongoose";
import { ObjectId, Schema } from "mongoose";

export interface IIdea extends Document {
  idea: string;
  category: string;
  upvotes: ObjectId[];
  downvotes: ObjectId[];
  comments: ObjectId[];
  saves: ObjectId[];
  createdBy: ObjectId;
}

const ideaSchema = new Schema<IIdea>(
  {
    idea: {
      type: String,
      required: true,
    },
    category: {
      type: String,
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    saves: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Idea = models?.Idea || model<IIdea>("Idea", ideaSchema);
