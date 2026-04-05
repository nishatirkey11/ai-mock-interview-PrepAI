export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
import { db } from "@/utils/db";
import { AdminInterviewQuestions } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const interviewId = searchParams.get("interviewId");

    if (!interviewId) {
      return NextResponse.json({ error: "Missing interviewId" }, { status: 400 });
    }

    const questions = await db
      .select()
      .from(AdminInterviewQuestions)
      .where(eq(AdminInterviewQuestions.interviewId, interviewId));

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin questions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
