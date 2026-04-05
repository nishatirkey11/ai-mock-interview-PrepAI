"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, Copy } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreateAdminInterview() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const router = useRouter();

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || questions.some((q) => !q.question.trim())) {
      toast.error("Please fill in the title and all questions.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/createInterview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, questions }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Interview created successfully!");
        setGeneratedLink(`${window.location.origin}/interview/${data.interviewId}`);
      } else {
        toast.error("Failed to create interview.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copied!");
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Create New Interview</h1>

      {generatedLink ? (
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Interview Ready!</h2>
          <p className="mb-2">Share this link with students:</p>
          <div className="flex items-center gap-2 justify-center mb-6">
            <Input value={generatedLink} readOnly className="max-w-md bg-white border-green-300" />
            <Button onClick={copyLink} variant="outline" className="border-green-300">
              <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
          </div>
          <Button onClick={() => router.push("/dashboard/admin")}>Go to Admin Dashboard</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Interview Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Frontend Developer - React Basics"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium">Questions</label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddQuestion}>
                <Plus className="h-4 w-4 mr-1" /> Add Question
              </Button>
            </div>

            {questions.map((q, index) => (
              <div key={index} className="flex gap-2 items-start bg-gray-50 p-4 rounded-lg border">
                <span className="mt-2 font-semibold min-w-8">#{index + 1}</span>
                <Textarea
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder="Enter your question here..."
                  className="flex-1 min-h-[80px]"
                  required
                />
                {questions.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemoveQuestion(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Interview & Generate Link"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default CreateAdminInterview;
