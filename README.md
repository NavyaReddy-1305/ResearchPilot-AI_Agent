# 🧠 ResearchHub – Agentic AI Powered Research Intelligence Platform

> A premium, AI-driven academic research intelligence system designed to transform how researchers discover, analyze, and synthesize scientific literature.

---

## 🚀 Overview

**ResearchHub** is a full-stack, production-ready research intelligence platform that leverages **Agentic AI**, **Retrieval-Augmented Generation (RAG)**, and **Knowledge Graph generation** to help researchers efficiently explore, analyze, and generate insights from academic papers.

Unlike traditional research tools, ResearchHub provides:

- Context-aware AI conversations grounded in uploaded research papers
- Automated knowledge graph generation from extracted research entities
- Multi-paper literature review generation
- Workspace-level memory retention
- Intelligent research comparison tools
- Interactive scientific visualization

The system is built end-to-end with a modular architecture and a modern, research-centric UI design.

---

# ✨ Key Features

## 🔐 Authentication & Personalization
- JWT-based secure authentication
- User-specific research workspaces
- Persistent workspace-level AI memory

## 🔎 Intelligent Paper Discovery
- Keyword + semantic search
- Rich preview cards with metadata
- Paper import and metadata extraction

## 📄 PDF Upload & Processing
- Upload research PDFs
- Automatic text extraction
- Embedding generation using Sentence Transformers
- Vector-based semantic retrieval

## 🤖 Context-Aware AI Chat (RAG-Based)
- Grounded responses from uploaded papers
- Citation-supported answers
- Conversation history tracking
- Workspace-specific contextual memory

## 📊 Research Knowledge Graph Generator
- Automatic entity extraction:
  - Authors
  - Concepts
  - Methods
  - Datasets
  - Findings
  - Applications
- Relationship mapping between papers
- Stored graph data in MySQL
- Interactive graph visualization (React Flow / D3.js)
- Zoom, pan, focus, and hover-based exploration

## 📝 AI-Powered Literature Review Builder
- Multi-paper selection
- Structured review generation:
  - Introduction
  - Methodologies
  - Findings
  - Research Gaps
  - Future Scope
- Editable review interface
- Regeneration support
- Export-ready formatting

## 📚 Cross-Paper Comparison
- Insight comparison between selected research documents
- AI-highlighted similarities and differences
- Structured comparison outputs

---

# 🖥 UI / UX Design Philosophy

### 🎨 Design Theme: "Knowledge Exploration & Scientific Intelligence"

The interface is designed to feel:

- Modern
- Premium
- Research-focused
- Minimal yet information-rich

### Visual Language
- Dark-first theme (with optional light mode)
- Deep blues, violets, and cyan accents
- Glassmorphism & soft shadows
- Subtle gradients
- Smooth micro-interactions using Framer Motion
- Clean academic typography
- Dashboard-style layout prioritizing insights

Inspired by:
- Notion
- Semantic Scholar
- Modern AI SaaS tools

---

# 🏗 System Architecture

## Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- React Flow / D3.js (Knowledge Graph)

### Architecture Principles
- Component-based design
- Authentication-aware routing
- Responsive layouts
- AI feedback animations
- Modular state management

---

## Backend

- FastAPI
- MySQL
- SQLAlchemy ORM
- JWT Authentication
- Groq API (Llama 3.3 70B)
- Sentence Transformers (Embeddings)

### Backend Capabilities

- Modular FastAPI structure
- Secure authentication middleware
- Workspace isolation
- Vector embedding storage
- RAG-based AI endpoints:
  - Chat
  - Summarization
  - Knowledge graph extraction
  - Literature review generation
- Error handling & logging

---

# 🧠 AI Agent Design

ResearchHub implements an **Agentic RAG Pipeline**:

1. PDF → Text Extraction
2. Text → Embedding Generation
3. Embeddings stored in database
4. Query → Semantic Retrieval
5. Retrieved context → LLM (Groq Llama 3.3 70B)
6. Structured output generation

### AI Capabilities

- Context-aware reasoning
- Citation-grounded responses
- Structured outputs for:
  - Graph relationships
  - Literature review sections
- Prompt-engineered workflows for academic rigor

---

# 🗄 Database Schema (High-Level)

Core Entities:

- Users
- Workspaces
- Papers
- Conversations
- Messages
- Embeddings
- Graph Nodes
- Graph Relationships
- Literature Reviews

Designed for scalability and research isolation.

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/ResearchHub.git
cd ResearchHub
```

---

## 2️⃣ Backend Setup

```bash
cd researchhub-backend
pip install -r requirements.txt
```

Create `.env` file:

```
DATABASE_URL=mysql+pymysql://user:password@localhost/researchhub
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
HF_TOKEN=your_huggingface_token
```

Run server:

```bash
uvicorn main:app --reload
```

---

## 3️⃣ Frontend Setup

```bash
cd researchhub-frontend
npm install
npm run dev
```

---

# 🚀 Deployment Ready

- Environment-based configuration
- CORS-enabled backend
- Production-ready FastAPI setup
- Optimized frontend build support
- Easily deployable to:
  - Vercel (Frontend)
  - Render / Railway (Backend)
  - Cloud MySQL

---

# 📈 Impact

ResearchHub significantly improves:

- Research productivity
- Literature review speed
- Cross-paper analysis efficiency
- Academic insight discovery
- Research workflow automation

It reduces manual reading effort while maintaining academic grounding and transparency.

---

# 🔮 Future Enhancements

- Real-time collaborative workspaces
- Citation export (BibTeX / APA)
- Research trend analytics dashboard
- Graph neural network-based insight scoring
- Multi-modal research understanding (tables, figures)

---

# 👩‍💻 Author

Navya Reddy  
B.Tech Computer Science Engineering  
AI & Intelligent Systems Enthusiast  

---

# 📌 Project Highlights for Resume

- Built full-stack production-ready AI research platform
- Implemented RAG pipeline with Llama 3.3 70B
- Designed interactive knowledge graph visualization
- Developed AI-powered literature review generator
- Created secure JWT-authenticated multi-user system
- Engineered scalable FastAPI + MySQL architecture
- Designed premium research-centric UI with animations

---

> ResearchHub represents a next-generation academic intelligence platform combining full-stack engineering, AI systems design, and modern UX principles.
