export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
import { db } from "@/utils/db";
import { UserAnswer, AdminInterview } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // We want to fetch UserAnswers but we may want to only get them for AdminInterviews.
    // So we can fetch all AdminInterviews and join or just fetch all UserAnswers and filter in memory,
    // or return all UserAnswers and let the client filter. Let's do an explicit join or query.

    const adminInterviews = await db.select().from(AdminInterview);
    const adminInterviewIds = adminInterviews.map(ai => ai.interviewId);

    const allResults = await db.select().from(UserAnswer).orderBy(desc(UserAnswer.createdAt));

    // Filter results that belong to admin interviews
    const results = allResults.filter(ans => adminInterviewIds.includes(ans.mockIdRef));

    return NextResponse.json({ results, adminInterviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin results:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
