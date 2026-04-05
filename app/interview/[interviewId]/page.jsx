"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AdminInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { toast } from "sonner";

function AdminInterviewLanding({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(AdminInterview)
        .where(eq(AdminInterview.interviewId, params.interviewId));

      if (result.length > 0) {
        setInterviewData(result[0]);
      } else {
        toast.error("Interview details not found");
      }
    } catch (error) {
      toast.error("Error fetching interview details");
      console.error("Interview details fetch error:", error);
    }
  };

  const handleWebcamToggle = () => {
    setWebCamEnabled(true);
    toast.success("Webcam and microphone enabled");
  };

  if (!interviewData) {
    return <div>Loading interview details...</div>;
  }

  return (
    <div className="my-10 p-10 max-w-5xl mx-auto">
      <h2 className="font-bold text-2xl">Let's get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Interview Title: </strong>
              {interviewData.title}
            </h2>
            <h2 className="text-lg text-gray-500">
              Admin-created Interview
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <span>Information</span>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Enable Video Web Cam and Microphone to Start your Mock Interview. 
              You will be asked custom questions provided by your administrator.
              NOTE: We never record your video. Web cam access can be disabled at any time.
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              mirrored={true}
              audio={true}
              className="rounded-lg w-full h-[300px] object-cover"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user"
              }}
              onUserMedia={() => console.log("Camera started")}
              onUserMediaError={(err) => console.error("Camera error:", err)}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 mb-7 border rounded-lg w-full p-20 bg-secondary" />
              <Button
                className="w-full"
                variant="ghost"
                onClick={handleWebcamToggle}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end mt-10">
        <Link href={`/interview/${params.interviewId}/start`}>
          <Button disabled={!webCamEnabled ? false : false /* allowed to start even if no webcam optionally, but let's keep it same as original */}>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default AdminInterviewLanding;
