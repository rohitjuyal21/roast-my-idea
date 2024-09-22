export interface Idea {
  _id: string;
  category: string;
  idea: string;
  upvotes: string[];
  downvotes: string[];
  comments: string[];
  saves: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
