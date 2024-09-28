import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";
import { NextRequest } from "next/server";
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const commentId = params.id;
    const session = await auth();
    const userId = session?.user?.id;

    const user = await User.findById(userId);

    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return Response.json({ message: "Comment not found" }, { status: 404 });
    }

    if (comment.downvotes.includes(userId)) {
      comment.downvotes.pull(userId);
    } else {
      comment.downvotes.push(userId);
      comment.upvotes.pull(userId);
    }

    await comment.save();

    const populatedComment = await comment.populate("user", "name image");

    return Response.json(populatedComment, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Failed to upvote comment" },
      { status: 500 }
    );
  }
}
