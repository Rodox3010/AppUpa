
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { Player, UserRole } from './types';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Scorers from './pages/Scorers';
import Assists from './pages/Assists';
import Login from './pages/Login';

const Navbar: React.FC<{ role: UserRole; onLogout: () => void }> = ({ role, onLogout }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex flex-wrap justify-center gap-4 p-6 sticky top-0 z-50 bg-[#0f1113]/80 backdrop-blur-md">
      <Link 
        to="/" 
        className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${isActive('/') ? 'btn-primary' : 'bg-[#1c1f22] text-white hover:bg-[#2c2f32]'}`}
      >
        <i className="fa-solid fa-house"></i> Home
      </Link>
      <Link 
        to="/estatisticas" 
        className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${isActive('/estatisticas') ? 'btn-primary' : 'bg-[#1c1f22] text-white hover:bg-[#2c2f32]'}`}
      >
        <i className="fa-solid fa-chart-line"></i> Estatística Geral
      </Link>
      <Link 
        to="/artilharia" 
        className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${isActive('/artilharia') ? 'btn-primary' : 'bg-[#1c1f22] text-white hover:bg-[#2c2f32]'}`}
      >
        <i className="fa-solid fa-soccer-ball"></i> Geral Gols
      </Link>
      <Link 
        to="/assistencias" 
        className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-all ${isActive('/assistencias') ? 'btn-primary' : 'bg-[#1c1f22] text-white hover:bg-[#2c2f32]'}`}
      >
        <i className="fa-solid fa-bullseye"></i> Geral Assistências
      </Link>
      
      {role === 'ADMIN' ? (
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all ml-auto"
        >
          <i className="fa-solid fa-right-from-bracket"></i> Sair ADM
        </button>
      ) : (
        <Link 
          to="/login" 
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-[#1c1f22] text-[#00ff88] hover:bg-[#2c2f32] transition-all ml-auto"
        >
          <i className="fa-solid fa-user-shield"></i> ADM
        </Link>
      )}
    </nav>
  );
};

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(() => {
    const saved = localStorage.getItem('upa_futsal_players');
    return saved ? JSON.parse(saved) : [];
  });
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('upa_futsal_role');
    return (saved as UserRole) || 'VIEWER';
  });

  useEffect(() => {
    localStorage.setItem('upa_futsal_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('upa_futsal_role', role);
  }, [role]);

  const handleAddPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  const handleUpdatePlayer = (updatedPlayer: Player) => {
    setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
  };

  const handleDeletePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const logout = () => {
    setRole('VIEWER');
    window.location.hash = '/';
  };

  return (
    <Router>
      <div className="min-h-screen pb-20">
        <Navbar role={role} onLogout={logout} />
        
        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={
              <Home 
                players={players} 
                role={role} 
                onAdd={handleAddPlayer} 
                onUpdate={handleUpdatePlayer} 
                onDelete={handleDeletePlayer}
              />
            } />
            <Route path="/estatisticas" element={<Stats players={players} />} />
            <Route path="/artilharia" element={<Scorers players={players} />} />
            <Route path="/assistencias" element={<Assists players={players} />} />
            <Route path="/login" element={<Login onLogin={() => setRole('ADMIN')} role={role} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
