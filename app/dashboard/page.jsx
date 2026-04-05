"use client";

import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Bot,
  Plus,
  ListChecks,
  Trophy,
  Zap,
  TrendingUp 
} from "lucide-react";

import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
  const { user } = useUser();
  const [interviewData, setInterviewData] = useState([]);
  const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);
  const [statsCards, setStatsCards] = useState([
    {
      icon: <ListChecks size={32} className="text-indigo-600" />,
      title: "Total Interviews",
      value: "0"
    },
    {
      icon: <Trophy size={32} className="text-green-600" />,
      title: "Best Score",
      value: "N/A"
    },
    {
      icon: <TrendingUp size={32} className="text-blue-600" />,
      title: "Improvement Rate",
      value: "0%"
    }
  ]);

  const fetchInterviews = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("User email not found");
      return;
    }

    try {
      const response = await fetch('/api/fetchUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: user.primaryEmailAddress.emailAddress
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch interview data');
      }
  
      const data = await response.json();
      
      // Filter interviews specific to the current user's email
      const userSpecificInterviews = data.userAnswers.filter(
        interview => interview.userEmail === user.primaryEmailAddress.emailAddress
      );

      setInterviewData(userSpecificInterviews);

      // Calculate and update stats
      const totalInterviews = userSpecificInterviews.length;
      const bestScore = totalInterviews > 0 
        ? Math.max(...userSpecificInterviews.map(item => parseInt(item.rating || '0')))
        : 0;
      const improvementRate = calculateImprovementRate(userSpecificInterviews);

      setStatsCards([
        {
          ...statsCards[0],
          value: totalInterviews.toString()
        },
        {
          ...statsCards[1],
          value: bestScore ? `${bestScore}/10` : 'N/A'
        },
        {
          ...statsCards[2],
          value: `${improvementRate}%`
        }
      ]);

      if (totalInterviews > 0) {
        toast.success(`Loaded ${totalInterviews} interview(s)`);
      }

    } catch (error) {
      console.error('Error fetching interviews:', error);
      toast.error(error.message || 'Failed to fetch interviews');
    }
  };

  const calculateImprovementRate = (interviews) => {
    if (interviews.length <= 1) return 0;
    
    const scores = interviews
      .map(interview => parseInt(interview.rating || '0'))
      .sort((a, b) => a - b);
    
    const improvement = ((scores[scores.length - 1] - scores[0]) / scores[0]) * 100;
    return Math.round(improvement);
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchInterviews();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* User Greeting Premium Banner */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-[2.5rem] p-8 sm:p-12 mb-12 overflow-hidden shadow-[0_20px_50px_rgba(99,102,241,0.2)] text-white flex flex-col sm:flex-row items-center justify-between">
        
        {/* Decorative Background Overlays */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent mix-blend-overlay"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/20 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-black/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* Left text content */}
        <div className="relative z-10 text-center sm:text-left mb-8 sm:mb-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold mb-6 border border-white/30 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></span>
            Dashboard Active
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black mb-3 flex items-center justify-center sm:justify-start gap-3 drop-shadow-sm animate-in fade-in slide-in-from-bottom-6">
             Welcome back, {user?.firstName || 'Interviewer'} 👋
          </h2>
          
          <p className="text-indigo-100 font-medium text-lg md:text-xl max-w-lg drop-shadow-sm animate-in fade-in slide-in-from-bottom-8">
            Ready to conquer your next interview? Review your stats, practice your pitch, and master your technical skills below!
          </p>
        </div>

        {/* Floating Animated UI Graphic on the Right */}
        <div className="relative z-10 w-48 h-48 hidden md:block mt-4">
           {/* Glow behind cube */}
           <div className="absolute inset-0 bg-fuchsia-400/40 rounded-full blur-[60px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }}></div>
           
           {/* Floating glass cube */}
           <div className="relative w-full h-full bg-white/10 backdrop-blur-2xl border border-white/40 rounded-[2rem] shadow-[-10px_10px_30px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center animate-[bounce_8s_infinite] group cursor-pointer hover:bg-white/20 transition-colors duration-500 transform rotate-[-8deg] hover:rotate-0 hover:scale-110">
             
             {/* Sparkle Decoration */}
             <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-white/50 animate-[bounce_3s_infinite]" style={{ animationDelay: '1s' }}>
               <Zap size={16} className="text-white fill-white" />
             </div>

             <Bot size={72} className="text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)] group-hover:-translate-y-2 transition-transform duration-500 mb-2" />
             <div className="bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10 shadow-inner">
               <span className="text-xs font-black tracking-wider text-white">AI COACH</span>
             </div>
           </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {statsCards.map((card, index) => (
          <div 
            key={card.title}
            className="bg-white/60 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:-translate-y-1 hover:bg-white/80 transition-all duration-500 flex items-center group"
          >
            <div className={`p-4 rounded-xl ${index === 0 ? 'bg-indigo-100/50' : index === 1 ? 'bg-green-100/50' : 'bg-blue-100/50'} group-hover:scale-110 transition-transform duration-500`}>
              {card.icon}
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-2xl font-extrabold text-gray-900 tracking-tight">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Interview Section */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 p-6 sm:p-8 rounded-3xl shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Zap size={24} className="text-yellow-600" />
            </div>
            Create AI Mock Interview
          </h2>
          <button 
            onClick={() => setIsNewInterviewModalOpen(true)}
            className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            <Plus size={20} className="mr-2" />
            New Interview
          </button>
        </div>

        {/* Add New Interview Component */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          <AddNewInterview 
            isOpen={isNewInterviewModalOpen} 
            onClose={() => setIsNewInterviewModalOpen(false)} 
          />
        </div>
      </div>

     {/* Interview History */}
     <div className="bg-white/40 backdrop-blur-sm border border-gray-100 p-6 sm:p-8 rounded-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
          Interview History
        </h2>
        <InterviewList interviews={interviewData} />
      </div>
    </div>
  );
}

export default Dashboard;