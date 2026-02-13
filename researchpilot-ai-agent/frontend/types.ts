
export interface Paper {
  id?: string;          // for arXiv results
  _id?: string;         // for MongoDB saved papers
  title: string;
  abstract: string; 
  summary: string;
  authors: string[];
  publishedDate?: string;
  link: string;
  source?: string;  
}


export interface PaperSummary {
  shortSummary: string;
  keyContributions: string[];
  methodology: string;
  results: string;
  conclusion: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export enum ViewMode {
  GRID = 'GRID',
  LIST = 'LIST'
}
