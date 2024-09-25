import { dbConnect } from "@/lib/db";
import { Idea } from "@/models/Idea";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const { category, idea } = await req.json();

    const newIdea = new Idea({
      category,
      idea,
      createdBy: userId,
    });

    await newIdea.save();

    return Response.json(newIdea, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "Error while creating Idea" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const ideas = await Idea.find();

    return Response.json(ideas, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error while fetching Idea" },
      { status: 500 }
    );
  }
}
