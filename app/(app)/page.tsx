"use client";
import CreateIdeaModal from "@/components/CreateIdeaModal/CreateIdeaModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { selectIdeas, useAppDispatch, useAppSelector } from "@/lib/store";
import { fetchIdeas, fetchSavedIdeas } from "@/lib/features/ideas/ideasSlice";
import AnimatedIdeaCard from "@/components/AnimatedIdeaCard";
import LoginPopup from "@/components/LoginPopup";
import { useSession } from "next-auth/react";

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useAppDispatch();
  const { ideas, ideasStatus } = useAppSelector(selectIdeas);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(fetchIdeas());
    // dispatch(fetchSavedIdeas());
  }, [dispatch]);

  const sortedIdeas = [...(ideas || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handlePostIdeaClick = () => {
    if (!session) {
      setOpenLoginPopup(true);
      return;
    }
    setOpenDialog(true);
  };

  return (
    <div className="p-4 md:p-8 h-full flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Feed</h1>
        <Button onClick={handlePostIdeaClick}>
          <Plus className="mr-2 size-5" />
          Post Idea
        </Button>
      </div>
      {ideasStatus === "loading" ? (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="divide-y">
          {sortedIdeas.map((idea) => (
            <AnimatedIdeaCard key={idea._id} idea={idea} />
          ))}
        </div>
      )}
      <CreateIdeaModal openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <LoginPopup
        openDialog={openLoginPopup}
        setOpenDialog={setOpenLoginPopup}
      />
    </div>
  );
};

export default Home;
