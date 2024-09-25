import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import { User } from "@/models/User";
import { Comment } from "@/models/Comment";
import { Idea } from "@/models/Idea";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return Response.json({ error: "User doesn't exist" }, { status: 401 });
    }

    const userComments = await Comment.find({ user: userId });
    const userCommentIds = userComments.map((comment) => comment._id);

    await Idea.updateMany(
      {},
      {
        $pull: {
          upvotes: userId,
          downvotes: userId,
          saves: userId,
          comments: { $in: userCommentIds },
        },
      }
    );

    await Comment.updateMany(
      {},
      { $pull: { upvotes: userId, downvotes: userId } }
    );

    await Comment.deleteMany({ user: userId });

    await Idea.deleteMany({ createdBy: userId });

    await User.findByIdAndDelete(userId);

    return Response.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete account:", error);
    return Response.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
