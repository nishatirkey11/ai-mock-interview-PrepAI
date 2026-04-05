"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  CheckCircle2, 
  XCircle, 
  ChevronsUpDown, 
  Activity, 
  Target 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AdminInterviewFeedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setLoading(true);
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
    setLoading(false);

    const validRatings = result
      .map((item) => parseFloat(item.rating))
      .filter((rating) => !isNaN(rating));

    const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
    const avgRating = validRatings.length > 0 
      ? (totalRating / validRatings.length).toFixed(1) 
      : "N/A";

    setAverageRating(avgRating);
  };

  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return "text-green-600";
    if (numRating >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-indigo-600 animate-pulse" />
          <p className="mt-4 text-gray-600">Loading your interview feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
            <div>
              <h2 className="text-3xl font-bold text-green-600">Great Job!</h2>
              <p className="text-gray-600">You've successfully completed the interview.</p>
            </div>
          </CardHeader>
          <CardContent>
             <p className="text-md text-gray-700">Your answers have been securely submitted to your supervisor for manual review. No automated feedback runs on administrative mock sessions.</p>
          </CardContent>
        </Card>
      </div>
      <div className="text-center mt-8">
        <Button 
          onClick={() => router.replace('/')}
          className="w-full md:w-auto"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default AdminInterviewFeedback;
