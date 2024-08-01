import React, { useEffect, useState } from "react";

import CommentInput from "./CommentInput";
import { axiosInstance } from "@/lib/axiosInstance";
import { Comment as CommentItem } from "@/app/types/comment";
import Comment from "./Comment";
import { selectComments, useAppDispatch } from "@/lib/store";
import { fetchComments } from "@/lib/features/comments/commentsSlice";
import { useSelector } from "react-redux";
import { fetchIdeas } from "@/lib/features/ideas/ideasSlice";

interface CommentsProps {
  ideaId: string | undefined;
  onCommentAdded: () => void;
}

const Comments: React.FC<CommentsProps> = ({ ideaId, onCommentAdded }) => {
  const dispatch = useAppDispatch();
  const { comments } = useSelector(selectComments);

  useEffect(() => {
    if (ideaId) {
      dispatch(fetchComments(ideaId));
    }
  }, [ideaId, dispatch]);

  const handleCommentAdded = () => {
    if (ideaId) {
      dispatch(fetchComments(ideaId));
      onCommentAdded();
    }
  };

  const sortedComments = [...(comments || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      <CommentInput ideaId={ideaId} onCommentAdded={handleCommentAdded} />
      <div>
        {sortedComments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
