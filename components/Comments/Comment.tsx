import { Comment as CommentItem } from "@/types/comment";
import {
  downvoteComment,
  upvoteComment,
} from "@/lib/features/comments/commentsSlice";
import { formatNumber } from "@/lib/formatNumber";
import { useAppDispatch } from "@/lib/store";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useSession } from "next-auth/react";

interface CommentProps {
  comment: CommentItem;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { data } = useSession();
  const user = data?.user;
  const dispatch = useAppDispatch();

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
              "flex items-center gap-1 text-sm mx-2 my-1 relative hover:text-destructive before:bg-destructive/30 before:absolute before:w-8 before:h-8 before:-top-1 before:-left-1 before:rounded-full before:transition before:opacity-0 before:hover:opacity-100 ",
              user?.id && comment.upvotes.includes(user.id)
                ? "text-destructive"
                : "text-primary"
            )}
          >
            <ArrowBigUp
              fill={
                user?.id && comment.upvotes.includes(user.id)
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
              "flex items-center gap-1 text-sm mx-2 my-1 relative hover:text-destructive before:bg-destructive/30 before:absolute before:w-8 before:h-8 before:-top-1 before:-left-1 before:rounded-full before:transition before:opacity-0 before:hover:opacity-100",
              user?.id && comment.downvotes.includes(user.id)
                ? "text-destructive"
                : "text-primary"
            )}
          >
            <ArrowBigDown
              fill={
                user?.id && comment.downvotes.includes(user.id)
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
