"use client";
import CreateIdeaModal from "@/components/CreateIdeaModal/CreateIdeaModal";
import IdeaCard from "@/components/IdeaCard";
import { Button } from "@/components/ui/button";
import withAuth from "@/components/withAuth";
import { axiosInstance } from "@/lib/axiosInstance";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axiosInstance.get("/posts");
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIdeas();
  }, []);

  return (
    <div className="p-8 flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Feed</h1>
        <Button onClick={() => setOpenDialog(true)}>
          <Plus className="mr-2 size-5" />
          Add Idea
        </Button>
      </div>
      <div>
        <IdeaCard />
      </div>
      <CreateIdeaModal openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default withAuth(Home);
