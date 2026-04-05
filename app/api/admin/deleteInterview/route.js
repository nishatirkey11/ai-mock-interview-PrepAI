import { db } from "@/utils/db";
import { AdminInterview, AdminInterviewQuestions, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const interviewId = searchParams.get("interviewId");

    if (!interviewId) {
      return NextResponse.json({ error: "Missing interviewId" }, { status: 400 });
    }

    // Delete associated answers first
    await db.delete(UserAnswer).where(eq(UserAnswer.mockIdRef, interviewId));

    // Delete associated questions
    await db.delete(AdminInterviewQuestions).where(eq(AdminInterviewQuestions.interviewId, interviewId));

    // Finally, delete the interview record
    await db.delete(AdminInterview).where(eq(AdminInterview.interviewId, interviewId));

    return NextResponse.json({ message: "Interview deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting mock interview:", error);
    return NextResponse.json({ error: "Failed to delete interview" }, { status: 500 });
  }
}
