import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { chatWithAgent } from "../services/geminiService";
import {
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Search,
  BookOpen,
  Terminal,
  Paperclip,
} from "lucide-react";

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "Hello! I'm your ResearchPilot AI Agent. I can help you find papers, compare research methodologies, or explain scientific concepts. What are we researching today?",
      timestamp: Date.now(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ===============================
  // SEND MESSAGE
  // ===============================
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await chatWithAgent(input);

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  // ===============================
  // UPLOAD PDF
  // ===============================
const handleUpload = async () => {
  if (!file) {
    alert("Please select a PDF file");
    return;
  }

  const formData = new FormData();
  formData.append("pdf", file);

  try {
    const response = await axios.post(
      "http://localhost:5000/api/papers/upload",
      formData
    );

    const preview =
      (response.data as any)?.textPreview ||
      "File uploaded successfully.";

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "assistant",
        content: `📄 PDF uploaded successfully!\n\nPreview:\n${preview}`,
        timestamp: Date.now(),
      },
    ]);

    setFile(null);
  } catch (error) {
    console.error(error);
    alert("Upload failed");
  }
};


  const suggestedQuestions = [
    "Explain the latest trends in Multimodal LLMs.",
    "Compare CNN vs Vision Transformers for medical imaging.",
    "What are the ethical implications of autonomous AI agents?",
    "Summarize the main breakthroughs of the AlphaFold papers.",
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Pilot Intelligence Agent
            </h1>
            <div className="text-xs text-cyan-400">
              Autonomous Reasoning Engine Active
            </div>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="text-slate-500 hover:text-white"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 space-y-6 pb-6">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-4 ${
              m.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center border bg-white/5">
              {m.role === "user" ? <User size={20} /> : <Bot size={20} />}
            </div>

            <div className="max-w-[80%]">
              <div className="p-4 rounded-2xl bg-white/5 text-slate-300 whitespace-pre-wrap">
                {m.content}
              </div>
            </div>
          </div>
        ))}

        {isTyping && <div className="text-cyan-400">AI is typing...</div>}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT SECTION */}
      <div className="p-4 bg-slate-900 rounded-3xl border border-white/10 m-4">
        {/* FILE UPLOAD */}
        <div className="flex items-center gap-3 mb-2">
          <label className="cursor-pointer text-slate-400 hover:text-white">
            <Paperclip size={18} />
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => {
                if (e.target.files) setFile(e.target.files[0]);
              }}
            />
          </label>

          {file && (
            <>
              <span className="text-xs text-cyan-400">{file.name}</span>
              <button
                onClick={handleUpload}
                className="text-xs bg-cyan-600 px-3 py-1 rounded-lg text-white"
              >
                Upload
              </button>
            </>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your research query..."
            className="w-full bg-transparent text-white resize-none"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 bottom-2 p-2 bg-cyan-600 text-white rounded-xl"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
