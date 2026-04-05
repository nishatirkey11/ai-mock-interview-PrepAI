"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronsUpDown, Copy, Trash, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

function AdminDashboard() {
  const [results, setResults] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await fetch(`/api/admin/getResults?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setResults(data.results || []);
        setInterviews(data.adminInterviews || []);
      } else {
        toast.error("Failed to fetch results");
      }
    } catch (err) {
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = (interviewId) => {
    const url = `${window.location.origin}/interview/${interviewId}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const deleteInterview = async (interviewId) => {
    if (!window.confirm("Are you sure you want to delete this interview and all its student attempts?")) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/deleteInterview?interviewId=${interviewId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Interview deleted successfully.");
        // Optimistically remove from state instantly for a snappy UI
        setInterviews((prev) => prev.filter((i) => i.interviewId !== interviewId));
        fetchResults(); // Refresh list automatically in background
      } else {
        toast.error("Failed to delete interview.");
      }
    } catch (err) {
      toast.error("An error occurred while deleting.");
    }
  };

  // Group attempts by interviewId
  const groupedResults = results.reduce((acc, curr) => {
    if (!acc[curr.mockIdRef]) {
      acc[curr.mockIdRef] = [];
    }
    acc[curr.mockIdRef].push(curr);
    return acc;
  }, {});

  if (loading) {
    return <div className="p-10">Loading admin data...</div>;
  }

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto">
      {/* Admin Greeting Premium Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 sm:p-12 mb-12 overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.3)] text-white flex flex-col sm:flex-row items-center justify-between">
        
        {/* Decorative Background Overlays */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent mix-blend-overlay"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>
        
        {/* Left text content */}
        <div className="relative z-10 text-center sm:text-left mb-8 sm:mb-0 w-full sm:w-2/3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold mb-6 border border-white/20 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse shadow-[0_0_10px_rgba(248,113,113,0.8)]"></span>
            Admin Access Verified
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black mb-4 flex items-center justify-center sm:justify-start gap-3 drop-shadow-sm animate-in fade-in slide-in-from-bottom-6 leading-tight">
             Central Control Node
          </h1>
          
          <p className="text-slate-300 font-medium text-lg md:text-xl max-w-lg drop-shadow-sm animate-in fade-in slide-in-from-bottom-8 mb-8">
            Create ultra-specific custom interviews, seamlessly track student attempts, and monitor overall performance analytics.
          </p>

          <Link href="/dashboard/admin/create">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-full px-8 py-6 text-lg tracking-wide font-bold shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300 border border-white/10">
              Create Custom Interview
            </Button>
          </Link>
        </div>

        {/* Floating Animated Graphic on the Right */}
        <div className="relative z-10 w-48 h-48 hidden md:block">
           <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-[60px] animate-pulse pointer-events-none"></div>
           
           <div className="relative w-full h-full bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center animate-[bounce_6s_infinite] group hover:bg-white/10 transition-colors duration-500 hover:scale-110">
             
             <div className="absolute -top-4 -right-4 bg-red-500 rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-slate-800 animate-[bounce_3s_infinite]" style={{ animationDelay: '1s' }}>
               <Zap size={16} className="text-white fill-white" />
             </div>

             <ShieldCheck size={72} className="text-indigo-400 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 transition-transform duration-500 mb-2" />
             <div className="bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-inner mt-2">
               <span className="text-xs font-black tracking-widest text-slate-300 uppercase">SysAdmin</span>
             </div>
           </div>
        </div>
      </div>

      <div className="space-y-8">
        {interviews.length === 0 && (
          <p className="text-gray-500 text-center text-lg bg-white/50 backdrop-blur-sm py-12 rounded-3xl border border-white/60 shadow-sm">No admin interviews created yet.</p>
        )}
        
        {interviews.map((interview) => {
          const attemptsForInterview = groupedResults[interview.interviewId] || [];
          
          // Group attempts by student email for this specific interview
          const groupedByStudent = attemptsForInterview.reduce((acc, curr) => {
            const email = curr.userEmail || "Anonymous User";
            if (!acc[email]) acc[email] = [];
            acc[email].push(curr);
            return acc;
          }, {});

          const studentCount = Object.keys(groupedByStudent).length;

          return (
            <div key={interview.id} className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] transition-all duration-500 overflow-hidden group/card">
              <div className="p-6 sm:p-8 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover/card:text-indigo-700 transition-colors">{interview.title}</h2>
                  <p className="text-sm text-gray-500 mt-2">ID: <span className="font-mono text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-100">{interview.interviewId}</span></p>
                  <p className="text-sm text-gray-500 mb-4 mt-2">Created At: {interview.createdAt}</p>
                  {studentCount > 0 && (
                    <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200 shadow-sm">
                      {studentCount} {studentCount === 1 ? "Student" : "Students"} Attempted
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 rounded-full px-4 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
                    onClick={() => copyLink(interview.interviewId)}
                  >
                    <Copy className="h-4 w-4" /> Copy Link
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2 rounded-full px-4 hover:scale-105 transition-transform"
                    onClick={() => deleteInterview(interview.interviewId)}
                  >
                    <Trash className="h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>

              {studentCount > 0 ? (
                <Collapsible>
                  <CollapsibleTrigger className="bg-indigo-50/50 backdrop-blur-sm px-6 py-4 border-y border-indigo-100/50 flex items-center justify-between w-full hover:bg-indigo-100/50 transition-colors group/trigger">
                    <span className="text-sm font-bold text-indigo-900 flex items-center gap-3">
                      <div className="p-1.5 bg-indigo-200/50 rounded-lg group-hover/trigger:bg-indigo-200 transition-colors">
                        <ChevronsUpDown className="h-4 w-4 text-indigo-700" />
                      </div>
                      View Student Responses
                    </span>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="p-6 bg-white/40 backdrop-blur-md space-y-6">
                    {Object.entries(groupedByStudent).map(([email, studentAttempts]) => {
                      const overallScore = Math.round(
                        studentAttempts.reduce((sum, curr) => sum + (parseFloat(curr.rating) || 0), 0) / studentAttempts.length * 10
                      ) / 10;

                      return (
                        <div key={email} className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                          <div className="bg-gray-50/80 px-5 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">{email}</h4>
                              <p className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mt-1">
                                Overall Score: {overallScore}/10
                              </p>
                            </div>
                            <span className="text-xs font-bold text-gray-600 bg-white shadow-sm border border-gray-100 px-3 py-1.5 rounded-full">
                              {studentAttempts.length} Questions Answered
                            </span>
                          </div>

                          <Collapsible>
                            <CollapsibleTrigger className="bg-white px-5 py-3.5 w-full text-left flex justify-between items-center text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
                              View Detailed Answers & AI Feedback
                              <ChevronDown className="h-4 w-4" />
                            </CollapsibleTrigger>
                            
                            <CollapsibleContent className="divide-y divide-gray-100 p-5 flex flex-col gap-8 bg-gray-50/30 border-t border-gray-100">
                              {studentAttempts.map((attempt, index) => (
                                <div key={attempt.id} className="pt-6 first:pt-0">
                                   <p className="font-bold text-gray-900 mb-4 text-lg">Q{index + 1}: {attempt.question}</p>
                                   <div className="grid md:grid-cols-2 gap-6">
                                     <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-[0_2px_10px_rgba(59,130,246,0.05)] h-full relative overflow-hidden">
                                       <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                                       <strong className="text-sm text-blue-900 block mb-3 flex items-center gap-2">
                                         Student Answer
                                       </strong>
                                       <p className="text-sm text-gray-700 leading-relaxed">{attempt.userAns || "No answer recorded"}</p>
                                     </div>
                                     <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-[0_2px_10px_rgba(34,197,94,0.05)] h-full flex flex-col justify-between relative overflow-hidden">
                                       <div className="absolute top-0 left-0 w-1 h-full bg-green-400"></div>
                                       <div>
                                         <strong className="text-sm text-green-900 block mb-3 flex items-center gap-2">
                                           AI Feedback
                                         </strong>
                                         <p className="text-sm text-gray-700 leading-relaxed">{attempt.feedback}</p>
                                       </div>
                                       <div className="mt-5 text-right">
                                         <span className="bg-green-50 px-4 py-2 rounded-lg text-sm font-black text-green-700 border border-green-200">
                                           Score: {attempt.rating}/10
                                         </span>
                                       </div>
                                     </div>
                                   </div>
                                   <p className="text-xs text-gray-400 mt-4 text-right font-medium">Attempted At: {attempt.createdAt}</p>
                                </div>
                              ))}
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <div className="bg-indigo-50/30 px-6 py-4 border-t border-indigo-100/50">
                  <p className="text-indigo-400 text-sm font-medium text-center">No students have taken this interview yet.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;
