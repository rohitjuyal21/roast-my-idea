"use client";

import AnimatedIdeaCard from "@/components/AnimatedIdeaCard";
import IdeaCard from "@/components/IdeaCard";
import { fetchSavedIdeas } from "@/lib/features/ideas/ideasSlice";
import { selectIdeas, useAppDispatch, useAppSelector } from "@/lib/store";
import React, { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const { savedIdeas, savedIdeasStatus } = useAppSelector(selectIdeas);

  useEffect(() => {
    dispatch(fetchSavedIdeas());
  }, [dispatch]);

  return (
    <div className="p-4 md:p-8 h-full flex-1 flex flex-col gap-4">
      <h1 className="font-bold text-3xl">Saved</h1>
      {savedIdeasStatus === "loading" ? (
        <div className="flex h-full items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {savedIdeas.length > 0 ? (
            <div className="divide-y">
              {savedIdeas.map((idea) => (
                <AnimatedIdeaCard key={idea._id} idea={idea} />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              Your saved ideas list is empty
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
