import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { ideaSchema } from "./ideaSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/store";
import { postIdea } from "@/lib/features/ideas/ideasSlice";

const categories = [
  "Mobile application",
  "Web application",
  "Website",
  "Agency",
  "d2c brand",
];

interface ModalProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  refetchIdeas?: () => void;
}

const CreateIdeaModal: React.FC<ModalProps> = ({
  openDialog,
  setOpenDialog,
  refetchIdeas,
}) => {
  type IdeaFormData = z.infer<typeof ideaSchema>;
  const form = useForm<IdeaFormData>({
    resolver: zodResolver(ideaSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: IdeaFormData) => {
    try {
      await dispatch(postIdea(data)).unwrap();
      setOpenDialog(false);
      form.reset();
      toast.success("Idea shared");
      refetchIdeas?.();
    } catch (error) {
      toast.error("Failed to share idea");
      console.log(error);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={(val) => setOpenDialog(val)}>
      <DialogContent>
        <DialogTitle className="text-xl">Post your Idea</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idea</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit">Post</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIdeaModal;
