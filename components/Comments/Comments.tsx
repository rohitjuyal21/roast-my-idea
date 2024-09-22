import React, { useEffect } from "react";

import CommentInput from "./CommentInput";
import Comment from "./Comment";
import { selectComments, useAppDispatch, useAppSelector } from "@/lib/store";
import { fetchComments } from "@/lib/features/comments/commentsSlice";

interface CommentsProps {
  ideaId: string | undefined;
  onCommentAdded: () => void;
}

const Comments: React.FC<CommentsProps> = ({ ideaId, onCommentAdded }) => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector(selectComments);

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
    <div className="flex flex-col gap-6 w-full h-full">
      <CommentInput ideaId={ideaId} onCommentAdded={handleCommentAdded} />
      <div className="h-full">
        {sortedComments?.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Comments list is empty</p>
          </div>
        ) : (
          sortedComments?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
