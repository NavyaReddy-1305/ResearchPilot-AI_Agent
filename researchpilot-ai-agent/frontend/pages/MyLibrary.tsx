import React, { useEffect, useState } from "react";
import { getSavedPapers, removePaper } from "../services/apiService";
import { Paper, ViewMode } from "../types";
import PaperCard from "../components/PaperCard";
import {
  Library,
  Search,
  Grid,
  List,
  Trash2,
  ArrowRight,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyLibrary: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const data = await getSavedPapers();
        setPapers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPapers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await removePaper(id);
      setPapers((prev) => prev.filter((p: any) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPapers = papers.filter(
    (p: any) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authors.some((a: string) =>
        a.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Library className="text-cyan-400" /> My Library
          </h1>
          <p className="text-slate-500">
            Manage your collection of {papers.length} analyzed papers.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-white/10 p-1 rounded-xl">
          <button
            onClick={() => setViewMode(ViewMode.GRID)}
            className={`p-2 rounded-lg transition-all ${
              viewMode === ViewMode.GRID
                ? "bg-cyan-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode(ViewMode.LIST)}
            className={`p-2 rounded-lg transition-all ${
              viewMode === ViewMode.LIST
                ? "bg-cyan-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Search your library..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
        />
      </div>

      {filteredPapers.length > 0 ? (
        <div
          className={
            viewMode === ViewMode.GRID
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-3"
          }
        >
          {filteredPapers.map((paper: any) => (
            <PaperCard
              key={paper._id}
              paper={paper}
              isBookmarked
              onBookmark={() => handleDelete(paper._id)}
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center space-y-4">
          <Library size={40} className="mx-auto text-slate-600" />
          <h2 className="text-2xl font-bold text-white">
            Your library is empty
          </h2>
          <button
            onClick={() => navigate("/search")}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-medium"
          >
            Start Discovering
          </button>
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
