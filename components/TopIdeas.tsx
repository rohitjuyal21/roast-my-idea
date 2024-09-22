"use client";
import React, { useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { selectIdeas, useAppDispatch, useAppSelector } from "@/lib/store";
import { fetchIdeas } from "@/lib/features/ideas/ideasSlice";
import AnimatedIdeaCard from "./AnimatedIdeaCard";

const TopIdeas = () => {
  const { ideas, ideasStatus } = useAppSelector(selectIdeas);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIdeas());
  }, [dispatch]);

  const sortedIdeas = [...(ideas || [])]
    .sort((a, b) => b.upvotes?.length - a.upvotes?.length)
    .slice(0, 5);

  return (
    <div className="fixed min-h-screen h-full w-96 border-l right-0 hidden xl:flex">
      <ScrollArea className="h-full w-full flex flex-1 flex-col">
        <div className="p-8 min-h-full w-full flex flex-col gap-4">
          <h1 className="font-bold text-3xl">Top Ideas</h1>
          {ideasStatus === "loading" ? (
            <div className="flex flex-1 items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="divide-y">
              {sortedIdeas.map((idea) => (
                <AnimatedIdeaCard
                  key={idea._id}
                  idea={idea}
                  isSmallCard={true}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TopIdeas;
