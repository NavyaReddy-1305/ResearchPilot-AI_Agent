
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Search, Brain, Library, ArrowRight, Shield, Globe, Star } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap size={24} fill="white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Research<span className="text-cyan-400">Pilot</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Academic Plan</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/auth')} className="text-sm font-medium hover:text-cyan-400 transition-colors">Sign In</button>
          <button onClick={() => navigate('/auth')} className="bg-cyan-600 hover:bg-cyan-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-cyan-500/20">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-8 animate-bounce">
          <Star size={14} fill="currentColor" /> v2.5 Autonomous Intelligence Now Live
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          The Future of Research is <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Autonomous</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Navigate millions of academic papers with an AI co-pilot that reads, summarizes, and answers deep contextual questions about any field of study.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => navigate('/auth')} className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/30 group">
            Start Your First Mission <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 glass rounded-2xl font-bold text-lg hover:bg-white/5 transition-all">
            View Live Demo
          </button>
        </div>

        {/* Hero Dashboard Preview */}
        <div className="mt-20 relative">
          <div className="glass rounded-[2.5rem] p-4 border border-white/10 shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" 
              alt="Dashboard Preview" 
              className="rounded-[2rem] opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass p-8 rounded-3xl border border-white/20 shadow-2xl max-w-md backdrop-blur-xl">
                <Brain className="text-cyan-400 mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-2">Analyzing 4.2M Papers</h3>
                <p className="text-slate-400 text-sm">Our agent is currently mapping cross-domain relationships in Quantum Computing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Precision Research Tools</h2>
          <p className="text-slate-500">Engineered for accuracy, speed, and academic integrity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Search className="text-cyan-400" />, title: 'Global Discovery', desc: 'Instant access to arXiv, Semantic Scholar, and localized vector databases.' },
            { icon: <Brain className="text-purple-400" />, title: 'AI Summarization', desc: 'Deconstruct complex abstracts into methodology, results, and key takeaways.' },
            { icon: <Library className="text-emerald-400" />, title: 'Smart Library', desc: 'Organize your research with AI-powered tagging and semantic grouping.' },
            { icon: <Shield className="text-blue-400" />, title: 'Grounding', desc: 'Every answer is cited and verified against original source text.' },
            { icon: <Globe className="text-orange-400" />, title: 'Collaboration', desc: 'Share annotated insights and summaries with your research lab.' },
            { icon: <Zap className="text-yellow-400" />, title: 'Real-time Chat', desc: 'Interact with your papers using our autonomous conversational agent.' },
          ].map((f, i) => (
            <div key={i} className="glass p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="text-cyan-600" size={20} fill="currentColor" />
            <span className="font-bold">ResearchPilot AI</span>
          </div>
          <p className="text-slate-600 text-sm">© 2025 Autonomous Research Hub. For academic use only.</p>
          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
