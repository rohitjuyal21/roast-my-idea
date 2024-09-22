import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { Comment } from "@/models/Comment";
import { Idea } from "@/models/Idea";
import { User } from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const ideaId = params.id;

    const session = await auth();
    const userId = session?.user?.id;
    const user = await User.findById(userId);

    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const { comment } = await req.json();

    const newComment = new Comment({
      comment,
      user: userId,
      upvotes: [],
      downvotes: [],
    });

    const savedComment = await newComment.save();
    const idea = await Idea.findById(ideaId);
    if (!user) {
      return Response.json({ message: "Idea not found" }, { status: 404 });
    }

    idea.comments.push(savedComment._id);
    await idea.save();
    return Response.json({ comment: savedComment, idea }, { status: 201 });
  } catch (error) {
    return Response.json({ message: "Failed to add comment" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const ideaId = params.id;

    const session = await auth();
    const userId = session?.user?.id;
    const user = await User.findById(userId);

    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const idea = await Idea.findById(ideaId).populate({
      path: "comments",
      populate: { path: "user", select: "name image" },
    });

    if (!idea) {
      return Response.json({ message: "Idea not found" }, { status: 404 });
    }

    return Response.json(idea.comments, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
