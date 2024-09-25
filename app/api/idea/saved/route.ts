import { dbConnect } from "@/lib/db";
import { Idea } from "@/models/Idea";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const user = await User.findById(userId);

    if (!user) {
      return Response.json({ message: "User doesn't exist" }, { status: 401 });
    }

    const ideas = await Idea.find({ saves: userId });
    return Response.json(ideas, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error fetching saved ideas" },
      { status: 500 }
    );
  }
}
