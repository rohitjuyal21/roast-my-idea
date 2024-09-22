import { dbConnect } from "@/lib/db";

export async function GET(req: Request) {
  await dbConnect();
  return Response.json("WHATTTTTTTTT!!!!");
}
