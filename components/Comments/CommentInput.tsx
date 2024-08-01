import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/store";
import {
  addComment,
  fetchComments,
} from "@/lib/features/comments/commentsSlice";
import { fetchIdeas } from "@/lib/features/ideas/ideasSlice";

const commentSchema = z.object({
  comment: z.string().min(1, "Comment can't be empty"),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentsProps {
  ideaId: string | undefined;
  onCommentAdded: () => void;
}

const CommentInput: React.FC<CommentsProps> = ({ ideaId, onCommentAdded }) => {
  const dispatch = useAppDispatch();
  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const postComment = async (comment: CommentFormData) => {
    if (ideaId) {
      try {
        await dispatch(addComment({ ideaId, comment })).unwrap();
        dispatch(fetchComments(ideaId));
        onCommentAdded();
        form.reset();
        toast.success("Comment added");
      } catch (error) {
        toast.error("Failed to add comment");
        console.log(error);
      }
    }
  };

  const onSubmit = (data: CommentFormData) => {
    postComment(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-5 w-full relative"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Add a comment" {...field} />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        <Button>Comment</Button>
      </form>
    </Form>
  );
};

export default CommentInput;
