import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { register, login } from "../services/apiService";

interface AuthProps {
  onLogin: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await login({
          email,
          password,
        });
      } else {
        response = await register({
          name,
          email,
          password,
        });
      }

      if (response.token) {
        // Store JWT
        localStorage.setItem("token", response.token);

        // Create user object
        const user = {
          email,
          name: name || "Researcher",
        };

        onLogin(user);
        navigate("/dashboard");
      } else {
        alert(response.msg || "Authentication failed");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("Server error. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[150px] -z-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex w-12 h-12 bg-cyan-600 rounded-2xl items-center justify-center text-white mb-4 shadow-xl shadow-cyan-500/20 hover:scale-110 transition-transform"
          >
            <Zap size={28} fill="white" />
          </button>
          <h1 className="text-3xl font-bold text-white">
            Research<span className="text-cyan-400">Pilot</span>
          </h1>
          <p className="text-slate-400 mt-2">
            Autonomous Research Intelligence Hub
          </p>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all ${
                isLogin
                  ? "text-cyan-400 border-cyan-500"
                  : "text-slate-500 border-transparent"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all ${
                !isLogin
                  ? "text-cyan-400 border-cyan-500"
                  : "text-slate-500 border-transparent"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all mt-4 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              {isLogin
                ? "New to ResearchPilot?"
                : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cyan-400 hover:text-cyan-300 ml-2 font-semibold"
              >
                {isLogin ? "Register now" : "Sign in instead"}
              </button>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-600 text-xs">
          By continuing, you agree to ResearchPilot's Terms of Service and
          Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Auth;
