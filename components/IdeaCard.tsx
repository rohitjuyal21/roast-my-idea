import { formatDistanceToNow } from "date-fns";
import {
  ArrowBigDown,
  ArrowBigUp,
  Bookmark,
  MessageSquare,
} from "lucide-react";

const IdeaCard = () => {
  return (
    <div className="py-4 border-b flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h4 className="font-medium">Mobile app</h4>
        <span className="text-sm text-muted-foreground">
          {formatDistanceToNow("2024-07-18T10:00:00Z", { addSuffix: true })}
        </span>
      </div>
      <p>
        an app to help me invest in other people who have great ideas so that I
        can make a return on the investment when they become big.
      </p>
      <div className="flex items-center justify-between">
        <div className="flex">
          <button className="flex items-center gap-1 text-sm mx-2 my-1 hover:text-destructive">
            <ArrowBigUp />
            <span className="font-medium">1K</span>
            <span className="font-medium">Upvote</span>
          </button>
          <button className="flex items-center gap-1 text-sm mx-2 my-1 hover:text-destructive">
            <ArrowBigDown />
            <span className="font-medium">1K</span>
            <span className="font-medium">Downvote</span>
          </button>
          <button className="flex items-center gap-1 text-sm mx-2 my-1 hover:text-destructive">
            <MessageSquare className="size-5" />
            <span className="font-medium">1K</span>
            <span className="font-medium">Comment</span>
          </button>
        </div>
        <div>
          <button className="flex items-center gap-1 text-sm mx-2 my-1 hover:text-destructive">
            <Bookmark className="size-5" />
            <span className="font-medium">Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
