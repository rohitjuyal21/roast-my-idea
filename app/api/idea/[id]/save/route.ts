import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { Idea } from "@/models/Idea";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const ideaId = params.id;

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return Response.json({ message: "Idea not found" }, { status: 404 });
    }

    const isSaved = idea.saves.includes(userId);

    if (isSaved) {
      idea.saves.pull(userId);
    } else {
      idea.saves.push(userId);
    }

    await idea.save();

    return Response.json(idea, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error handling save post" },
      { status: 500 }
    );
  }
}
