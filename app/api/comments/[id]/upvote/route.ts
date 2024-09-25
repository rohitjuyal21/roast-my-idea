import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib/db";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const commentId = params.id;

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const user = await User.findById(userId);

    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return Response.json({ message: "Comment not found" }, { status: 404 });
    }

    if (comment.upvotes.includes(userId)) {
      comment.upvotes.pull(userId);
    } else {
      comment.upvotes.push(userId);
      comment.downvotes.pull(userId);
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
