"use client";
import CreateIdeaModal from "@/components/CreateIdeaModal/CreateIdeaModal";
import IdeaCard from "@/components/IdeaCard";
import { Button } from "@/components/ui/button";
import withAuth from "@/components/withAuth";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { selectIdeas, selectUser, useAppDispatch } from "@/lib/store";
import { useSelector } from "react-redux";
import { fetchIdeas, fetchSavedIdeas } from "@/lib/features/ideas/ideasSlice";

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useAppDispatch();
  const { ideas, ideasStatus } = useSelector(selectIdeas);

  useEffect(() => {
    dispatch(fetchIdeas());
    dispatch(fetchSavedIdeas());
  }, [dispatch]);

  const sortedIdeas = [...(ideas || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="p-8 h-full flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Feed</h1>
        <Button onClick={() => setOpenDialog(true)}>
          <Plus className="mr-2 size-5" />
          Post Idea
        </Button>
      </div>
      {ideasStatus === "loading" ? (
        <div className="flex h-full items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="divide-y">
          {sortedIdeas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>
      )}
      <CreateIdeaModal openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default withAuth(Home);
