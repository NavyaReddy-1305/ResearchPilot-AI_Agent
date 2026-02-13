const API = "http://localhost:5000/api";

// ---------------- AUTH ----------------

export const register = async (data: any) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data: any) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ---------------- SEARCH ----------------

export const searchArxiv = async (query: string) => {
  const res = await fetch(`${API}/papers/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return res.json();
};

// ---------------- AI SUMMARY ----------------

export const summarizeText = async (text: string) => {
  const res = await fetch(`${API}/ai/summarize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.json();
};

// ---------------- SAVE PAPER ----------------

export const savePaper = async (paper: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/papers/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify(paper),
  });

  return res.json();
};

// ---------------- GET SAVED PAPERS ----------------

export const getSavedPapers = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/papers/saved`, {
    method: "GET",
    headers: {
      Authorization: token || "",
    },
  });

  return res.json();
};

// ---------------- REMOVE PAPER ----------------

export const removePaper = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/papers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token || "",
    },
  });

  return res.json();
};

export const askQuestion = async (paperContent: string, question: string) => {
  const res = await fetch("http://localhost:5000/api/ai/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paperContent, question }),
  });

  return res.json();
};


export const askAgent = async (message: string) => {
  const res = await fetch("http://localhost:5000/api/ai/agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return res.json();
};

export const askPaperQuestion = async (
  paperText: string,
  question: string
) => {
  const res = await fetch("http://localhost:5000/api/ai/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paperText, question }),
  });

  return res.json();
};

