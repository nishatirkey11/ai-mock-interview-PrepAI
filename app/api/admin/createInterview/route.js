import { db } from "@/utils/db";
import { AdminInterview, AdminInterviewQuestions } from "@/utils/schema";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export async function POST(req) {
  try {
    const { title, questions, createdBy = "Admin" } = await req.json();

    if (!title || !questions || questions.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const interviewId = uuidv4();

    // Insert AdminInterview
    await db.insert(AdminInterview).values({
      interviewId,
      title,
      createdBy,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    // Insert AdminInterviewQuestions
    const questionsToInsert = questions.map((q) => ({
      interviewId,
      question: q.question,
    }));

    await db.insert(AdminInterviewQuestions).values(questionsToInsert);

    return NextResponse.json({ interviewId }, { status: 201 });
  } catch (error) {
    console.error("Error creating admin interview:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
