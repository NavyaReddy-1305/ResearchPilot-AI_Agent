import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Paper, ChatMessage } from "../types";
import { summarizeText, askQuestion } from "../services/apiService";

import {
  ArrowLeft,
  Download,
  Loader2,
  Brain,
  MessageCircle,
  Send,
} from "lucide-react";

const PaperDetail: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [paper] = useState<Paper | null>(state?.paper || null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paper) {
      generateSummary();
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateSummary = async () => {
    if (!paper) return;

    setIsSummarizing(true);
    try {
      const res = await summarizeText(
        paper.summary || paper.abstract || ""
      );
      setSummary(res.summary);
    } catch (err) {
      console.error(err);
      setSummary(null);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !paper || isAsking) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsAsking(true);

    try {
      const res = await askQuestion(
        paper.summary || paper.abstract || "",
        input
      );

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: res.answer || res.response || "No response received.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Q&A Error:", err);

      const errorMsg: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "Something went wrong while generating answer.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAsking(false);
    }
  };

  if (!paper)
    return <div className="p-10 text-center">Paper not found.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <a
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm"
        >
          <Download size={16} /> PDF
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/10 space-y-4">
            <h1 className="text-3xl font-bold text-white">
              {paper.title}
            </h1>

            <div className="text-slate-400 text-sm">
              {paper.authors.join(", ")}
            </div>

            <div className="text-slate-500 text-sm">
              Published{" "}
              {paper.publishedDate
                ? new Date(paper.publishedDate).toLocaleDateString()
                : "N/A"}
            </div>

            {/* AI Summary */}
            <div className="pt-6 border-t border-white/5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Brain size={20} className="text-cyan-400" />
                AI Summary
              </h3>

              {isSummarizing ? (
                <div className="py-10 flex justify-center">
                  <Loader2
                    className="animate-spin text-cyan-400"
                    size={32}
                  />
                </div>
              ) : summary ? (
                <div className="mt-4 text-slate-300 text-sm leading-relaxed">
                  {summary}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500">
                  Summary could not be generated.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - ASK THIS PAPER */}
        <div className="glass flex flex-col h-[650px] rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center gap-3">
            <MessageCircle size={18} className="text-cyan-400" />
            <h3 className="font-bold text-white">Ask this Paper</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 text-sm">
                Ask about methods, results, or findings.
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-white/5 text-slate-300 border border-white/10"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isAsking && (
              <Loader2
                className="animate-spin text-cyan-400"
                size={20}
              />
            )}

            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-white/5"
          >
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full bg-slate-800 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isAsking}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-400"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaperDetail;
