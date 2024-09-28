import { dbConnect } from "@/lib/db";
import { Idea } from "@/models/Idea";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const ideaId = params.id;
    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return Response.json({ message: "Idea not found" }, { status: 404 });
    }
    return Response.json(idea, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error fetching Idea" }, { status: 500 });
  }
}
