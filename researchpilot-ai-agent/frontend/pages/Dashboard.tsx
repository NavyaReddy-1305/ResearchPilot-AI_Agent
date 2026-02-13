import React, { useEffect, useState } from "react";
import { Paper } from "../types";
import { getSavedPapers } from "../services/apiService";
import PaperCard from "../components/PaperCard";
import {
  Search,
  BookOpen,
  Activity,
  ArrowRight,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [recentPapers, setRecentPapers] = useState<Paper[]>([]);
  const [allPapers, setAllPapers] = useState<Paper[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const papers = await getSavedPapers();
        setAllPapers(papers);
        setRecentPapers(papers.slice(-2).reverse());
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };

    fetchPapers();
  }, []);

  const stats = [
    {
      label: "Saved Papers",
      value: allPapers.length,
      icon: <BookOpen className="text-cyan-400" />,
    },
    {
      label: "AI Summaries",
      value: allPapers.length,
      icon: <Activity className="text-emerald-400" />,
    },
    {
      label: "Queries Run",
      value: "24",
      icon: <Search className="text-blue-400" />,
    },
    {
      label: "Success Rate",
      value: "98%",
      icon: <TrendingUp className="text-purple-400" />,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Researcher Hub
          </h1>
          <p className="text-slate-400">
            Your autonomous intelligence workspace is optimized and ready.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/chat")}
            className="px-5 py-2.5 glass text-white rounded-xl font-medium transition-all hover:bg-white/10 flex items-center justify-center gap-2"
          >
            <Zap size={18} className="text-yellow-400" />
            Chat Agent
          </button>
          <button
            onClick={() => navigate("/search")}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <Search size={18} />
            Search Library
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="glass p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                {stat.icon}
              </div>
              <span className="text-slate-400 text-sm font-medium">
                {stat.label}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">
              Latest Research Activities
            </h3>
            <button
              onClick={() => navigate("/library")}
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1"
            >
              Full Library <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentPapers.length > 0 ? (
              recentPapers.map((paper: any) => (
                <PaperCard
                  key={paper._id}
                  paper={paper}
                  isBookmarked
                />
              ))
            ) : (
              <div className="col-span-2 glass border-dashed border-white/10 p-12 rounded-3xl flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-500 mb-4">
                  <BookOpen size={32} />
                </div>
                <h4 className="text-white font-medium mb-1">
                  Your bookshelf is empty
                </h4>
                <p className="text-slate-500 text-sm max-w-xs">
                  Start searching to populate your personal research library.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass p-6 rounded-3xl border border-white/10 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Pilot AI Agent
                </h3>
                <p className="text-slate-500 text-xs">
                  Status: Online & Ready
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/chat")}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            >
              Open Research Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
