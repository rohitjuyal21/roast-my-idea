"use client";
import React, { useEffect } from "react";
import IdeaCard from "./IdeaCard";
import { ScrollArea } from "./ui/scroll-area";
import { selectIdeas, useAppDispatch } from "@/lib/store";
import { fetchIdeas } from "@/lib/features/ideas/ideasSlice";
import { useSelector } from "react-redux";

const TopIdeas = () => {
  const { ideas, ideasStatus } = useSelector(selectIdeas);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIdeas());
  }, [dispatch]);

  const sortedIdeas = [...(ideas || [])]
    .sort((a, b) => b.upvotes.length - a.upvotes.length)
    .slice(0, 5);

  return (
    <div className="fixed h-full w-96 border-l right-0 hidden xl:flex">
      <ScrollArea className="h-full w-full">
        <div className="p-8 h-full w-full flex flex-col gap-4">
          <h1 className="font-bold text-3xl =">Top Ideas</h1>
          {ideasStatus === "loading" ? (
            <div className="flex h-full items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="divide-y">
              {sortedIdeas.map((idea) => (
                <IdeaCard key={idea._id} idea={idea} isSmallCard={true} />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TopIdeas;
