import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/util";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET: List team members (admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isAdmin(session?.user?.role)) {
      return NextResponse.json(
        { error: "Only admins can view team directory" },
        { status: 403 },
      );
    }

    const teamMembers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Get team error:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 },
    );
  }
}
