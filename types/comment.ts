export interface Comment {
  _id: string;
  comment: string;
  user: {
    name: string;
    profileImage: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  upvotes: string[];
  downvotes: string[];
  __v: number;
}
