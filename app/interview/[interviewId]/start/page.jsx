"use client";
import React, { useEffect, useState } from "react";
import QuestionsSection from "@/app/dashboard/interview/[interviewId]/start/_components/QuestionsSection";
import RecordAnswerSection from "@/app/dashboard/interview/[interviewId]/start/_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const StartAdminInterview = ({ params }) => {
  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      setIsLoading(true);
      
      const res = await fetch(`/api/admin/getQuestions?interviewId=${params.interviewId}`, { cache: "no-store" });
      const data = await res.json();

      if (res.ok && data.questions) {
        // Map the admin questions to the format expected by the existing UI components
        // Existing expects: [{ Question: "...", Answer: "..." }]
        const mappedQuestions = data.questions.map((q) => ({
          Question: q.question,
          Answer: "", // Admin questions don't necessarily have predefined "correct" answers
        }));
        
        setMockInterviewQuestion(mappedQuestions);
        
        // Mock the interviewData format enough to satisfy RecordAnswerSection
        // It uses interviewData?.mockId to set mockIdRef in UserAnswer table
        setInterviewData({
          mockId: params.interviewId,
          title: "Admin Interview",
          isAdmin: true,
        });
      } else {
        toast.error("Failed to load interview questions");
      }
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
      toast.error("Error loading interview");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSave = (answerRecord) => {
    if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
          <p className="mt-4 text-gray-600">Loading interview details...</p>
        </div>
      </div>
    );
  }

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">No interview questions found.</p>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* video or audio recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interViewData}
          onAnswerSave={handleAnswerSave}
        />
      </div>
      <div className="flex justify-end gap-6 mt-10">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={`/interview/${params.interviewId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartAdminInterview;
