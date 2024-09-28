import { Idea } from "@/types/idea";
import {
  downvoteIdea,
  fetchSavedIdeas,
  toggleSavedIdeas,
  upvoteIdea,
} from "@/lib/features/ideas/ideasSlice";
import { formatNumber } from "@/lib/formatNumber";
import { useAppDispatch } from "@/lib/store";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface IdeaCardProps {
  idea: Idea;
  isSmallCard?: boolean;
  onUpvoteOrDownvote?: () => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  isSmallCard,
  onUpvoteOrDownvote,
}) => {
  const { data } = useSession();
  const user = data?.user;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleUpvote = async () => {
    try {
      await dispatch(upvoteIdea(idea._id)).unwrap();
      onUpvoteOrDownvote?.();
    } catch (error) {
      console.log("Error doing upvote");
    }
  };

  const handleDownvote = async () => {
    try {
      await dispatch(downvoteIdea(idea._id)).unwrap();
      onUpvoteOrDownvote?.();
    } catch (error) {
      console.log("Error downvoting the idea");
    }
  };

  const handleSaveToggle = async () => {
    try {
      await dispatch(
        toggleSavedIdeas({ ideaId: idea._id, userId: user?.id })
      ).unwrap();
      onUpvoteOrDownvote?.();
    } catch (error) {
      console.log("Error saving/unsaving the idea");
    }
  };

  const handleComments = () => {
    router.push(`/${idea._id}/comments`);
  };

  return (
    <div className="py-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h4 className="font-medium">{idea.category}</h4>
        {idea.createdAt && (
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(idea.createdAt), {
              addSuffix: true,
            })}
          </span>
        )}
      </div>
      <p>{idea.idea}</p>
      <div className="flex items-center justify-between">
        <div className="flex">
          <button
            onClick={handleUpvote}
            className={cn(
              "flex items-center gap-1 text-sm mx-2 my-1 relative hover:text-destructive before:bg-destructive/30 before:absolute before:w-8 before:h-8 before:-top-1 before:-left-1 before:rounded-full before:transition before:opacity-0 before:hover:opacity-100",
              user?.id && idea.upvotes.includes(user?.id)
                ? "text-destructive"
                : "text-primary"
            )}
          >
            <ArrowBigUp
              fill={
                user?.id && idea.upvotes.includes(user?.id)
                  ? "hsl(var(--destructive)"
                  : "hsl(var(--background))"
              }
            />

            <span className="font-medium">
              {idea?.upvotes?.length > 0 && formatNumber(idea?.upvotes?.length)}
            </span>
            {!isSmallCard && (
              <span className="font-medium md:inline hidden">Upvote</span>
            )}
          </button>
          <button
            onClick={handleDownvote}
            className={cn(
              "flex items-center gap-1 text-sm mx-2 my-1 relative hover:text-destructive before:bg-destructive/30 before:absolute before:w-8 before:h-8 before:-top-1 before:-left-1 before:rounded-full before:transition before:opacity-0 before:hover:opacity-100",
              user?.id && idea.downvotes.includes(user?.id)
                ? "text-destructive"
                : "text-primary"
            )}
          >
            <ArrowBigDown
              fill={
                user?.id && idea.downvotes.includes(user?.id)
                  ? "hsl(var(--destructive)"
                  : "hsl(var(--background))"
              }
            />
            <span className="font-medium">
              {idea?.downvotes?.length > 0 &&
                `-${formatNumber(idea?.downvotes?.length)}`}
            </span>
            {!isSmallCard && (
              <span className="font-medium md:inline hidden">Downvote</span>
            )}
          </button>

          <button
            onClick={handleComments}
            className="flex items-center gap-1 text-sm mx-2 my-1 relative hover:text-destructive before:bg-destructive/30 before:absolute before:w-8 before:h-8 before:-top-1 before:-left-1 before:rounded-full before:transition before:opacity-0 before:hover:opacity-100"
          >
            <MessageSquare className="p-0.5" />
            <span className="font-medium">
              {idea?.comments?.length > 0 && idea?.comments?.length}
            </span>
            {!isSmallCard && (
              <span className="font-medium md:inline hidden">Comment</span>
            )}
          </button>
        </div>
        <div>
          <button
            onClick={handleSaveToggle}
            className={cn(
              "flex items-center gap-1 text-sm mx-2 my-1 relative hover:text-destructive before:bg-destructive/30 before:absolute before:w-8 before:h-8 before:-top-1 before:-left-1 before:rounded-full before:transition before:opacity-0 before:hover:opacity-100",
              user?.id && idea.saves.includes(user?.id)
                ? "text-destructive"
                : "text-primary"
            )}
          >
            <Bookmark
              className="p-0.5"
              fill={
                user?.id && idea.saves.includes(user?.id)
                  ? "hsl(var(--destructive)"
                  : "hsl(var(--background))"
              }
            />
            {!isSmallCard && (
              <span className="font-medium md:inline hidden">Save</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
