"use client";
import { Idea } from "@/types/idea";
import Comments from "@/components/Comments/Comments";
import IdeaCard from "@/components/IdeaCard";
import { Button } from "@/components/ui/button";
import { fetchIdeaById } from "@/lib/features/ideas/ideasSlice";
import { useAppDispatch } from "@/lib/store";
import { Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const [idea, setIdea] = useState<Idea>();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const handlefetchIdeabyId = useCallback(async () => {
    try {
      const data = await dispatch(fetchIdeaById(id)).unwrap();
      setIdea(data);
    } catch (error) {
      console.log("Error fetching post");
    } finally {
      setLoading(false);
    }
  }, [id, dispatch]);

  useEffect(() => {
    handlefetchIdeabyId();
  }, [handlefetchIdeabyId, dispatch, id]);

  const handleCommentAdded = () => {
    handlefetchIdeabyId();
  };

  return (
    <div className="p-8 h-full flex-1 flex flex-col gap-4">
      <div>
        <Button variant="ghost" onClick={() => router.back()}>
          <Undo className="size-5 mr-2" /> Back
        </Button>
      </div>
      <div className="flex h-full w-full">
        {loading ? (
          <p className="flex items-center justify-center w-full">Loading...</p>
        ) : (
          <div className="w-full flex flex-col gap-6">
            {idea && (
              <IdeaCard idea={idea} onUpvoteOrDownvote={handlefetchIdeabyId} />
            )}
            <Comments ideaId={idea?._id} onCommentAdded={handleCommentAdded} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
