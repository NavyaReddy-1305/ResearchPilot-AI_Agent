
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SearchPapers from './pages/SearchPapers';
import MyLibrary from './pages/MyLibrary';
import AIChat from './pages/AIChat';
import PaperDetail from './pages/PaperDetail';
import Auth from './pages/Auth';
import Landing from './pages/Landing';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('research_pilot_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoaded(true);
  }, []);

  const handleLogin = (userData: any) => {
    localStorage.setItem('research_pilot_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('research_pilot_user');
    setUser(null);
  };

  if (!isLoaded) return null;

  const isAuthenticated = !!user;

  return (
    <HashRouter>
      <Routes>
        {/* Landing Page for non-authenticated users */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} />
        
        {/* Auth Route */}
        <Route path="/auth" element={!isAuthenticated ? <Auth onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        
        {/* Authenticated Routes */}
        <Route path="/dashboard" element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/auth" />} />
        <Route path="/search" element={isAuthenticated ? <Layout><SearchPapers /></Layout> : <Navigate to="/auth" />} />
        <Route path="/library" element={isAuthenticated ? <Layout><MyLibrary /></Layout> : <Navigate to="/auth" />} />
        <Route path="/chat" element={isAuthenticated ? <Layout><AIChat /></Layout> : <Navigate to="/auth" />} />
        <Route path="/paper/:id" element={isAuthenticated ? <Layout><PaperDetail /></Layout> : <Navigate to="/auth" />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
