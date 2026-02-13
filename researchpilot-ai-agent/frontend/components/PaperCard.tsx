import React from "react";
import { Paper } from "../types";
import {
  Bookmark,
  Clock,
  User,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaperCardProps {
  paper: Paper;
  onBookmark?: (paper: Paper) => void;
  isBookmarked?: boolean;
}

const PaperCard: React.FC<PaperCardProps> = ({
  paper,
  onBookmark,
  isBookmarked,
}) => {
  const navigate = useNavigate();

  const authors =
    paper.authors && paper.authors.length > 0
      ? paper.authors.slice(0, 2).join(", ") +
        (paper.authors.length > 2 ? " et al." : "")
      : "Unknown Authors";

  const year = paper.publishedDate
    ? new Date(paper.publishedDate).getFullYear()
    : "N/A";

  const abstractText = paper.abstract || paper.summary || "No abstract available.";

  const encodedId = paper.id ? btoa(String(paper.id)) : "";

  return (
    <div className="group glass p-5 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-white/10 flex flex-col h-full relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
          {paper.source || "Unknown Source"}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmark?.(paper);
          }}
          className={`p-1.5 rounded-lg transition-colors ${
            isBookmarked
              ? "bg-cyan-500 text-white"
              : "hover:bg-white/10 text-slate-400"
          }`}
        >
          <Bookmark
            size={18}
            fill={isBookmarked ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
        {paper.title || "Untitled Paper"}
      </h3>

      {/* Authors */}
      <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
        <User size={14} className="shrink-0" />
        <span className="truncate">{authors}</span>
      </div>

      {/* Abstract */}
      <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
        {abstractText}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock size={12} />
          {year}
        </div>

        <button
          onClick={() =>
            navigate(`/paper/${encodedId}`, {
              state: { paper },
            })
          }
          className="flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          Analyze <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default PaperCard;
