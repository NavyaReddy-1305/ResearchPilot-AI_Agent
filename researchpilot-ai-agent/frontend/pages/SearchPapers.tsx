import React, { useState, useEffect } from "react";
import {
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import {
  searchArxiv,
  savePaper,
  getSavedPapers,
} from "../services/apiService";
import { Paper } from "../types";
import PaperCard from "../components/PaperCard";

const SearchPapers: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const saved = await getSavedPapers();
        setSavedIds(saved.map((p: any) => p._id));
      } catch (err) {
        console.error(err);
      }
    };

    fetchSaved();
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);

    try {
      const papers = await searchArxiv(query);
      setResults(papers);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBookmark = async (paper: Paper) => {
    try {
      const saved = await savePaper(paper);
      setSavedIds((prev) => [...prev, saved._id]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Discover Research
        </h1>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for papers..."
          className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-cyan-600 text-white px-4 py-2 rounded-xl"
        >
          Search
        </button>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-cyan-400" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((paper: any) => (
            <PaperCard
              key={paper.link}
              paper={paper}
              onBookmark={() => toggleBookmark(paper)}
              isBookmarked={savedIds.includes(paper._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPapers;
