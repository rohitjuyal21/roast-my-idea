import { Comment as CommentItem } from "@/app/types/comment";
import {
  downvoteComment,
  fetchComments,
  upvoteComment,
} from "@/lib/features/comments/commentsSlice";
import { formatNumber } from "@/lib/formatNumber";
import { selectUser, useAppDispatch } from "@/lib/store";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useSelector } from "react-redux";

interface CommentProps {
  comment: CommentItem;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(selectUser);

  const handleUpvote = async () => {
    try {
      await dispatch(upvoteComment(comment._id)).unwrap();
    } catch (error) {
      console.log("Error upvoting comment");
    }
  };

  const handleDownvote = async () => {
    try {
      await dispatch(downvoteComment(comment._id)).unwrap();
    } catch (error) {
      console.log("Error upvoting comment");
    }
  };
  return (
    <div className="py-2 mt-2 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h4 className="font-medium">{comment.user.name}</h4>
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
        </span>
      </div>
      <p>{comment.comment}</p>
      <div className="flex items-center justify-between">
        <div className="flex">
          <button
            onClick={handleUpvote}
            className={cn(
              "flex items-center gap-1 text-sm mx-2 my-1 hover:text-destructive",
              user && comment.upvotes.includes(user?._id)
                ? "text-destructive"
                : "text-primary"
            )}
          >
            <ArrowBigUp
              fill={
                user && comment.upvotes.includes(user?._id)
                  ? "hsl(var(--destructive)"
                  : "hsl(var(--background))"
              }
            />
            <span className="font-medium">
              {comment.upvotes.length > 0 &&
                formatNumber(comment.upvotes.length)}
            </span>
          </button>
          <button
            onClick={handleDownvote}
            className={cn(
              "flex items-center gap-1 text-sm mx-2 my-1 hover:text-destructive",
              user && comment.downvotes.includes(user?._id)
                ? "text-destructive"
                : "text-primary"
            )}
          >
            <ArrowBigDown
              fill={
                user && comment.downvotes.includes(user?._id)
                  ? "hsl(var(--destructive)"
                  : "hsl(var(--background))"
              }
            />
            <span className="font-medium">
              {comment.downvotes.length > 0 &&
                `-${formatNumber(comment.downvotes.length)}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
