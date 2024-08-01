export interface Idea {
  _id: string;
  category: string;
  idea: string;
  createdBy: string;
  createdAt: string;
  upvotes: string[];
  downvotes: string[];
  comments: string[];
  saves: string[];
  __v: number;
}
