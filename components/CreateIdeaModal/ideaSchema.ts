import * as z from "zod";

export const ideaSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  idea: z.string().min(1, "Idea field can't be empty"),
});
