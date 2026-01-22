
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ADMIN_CREDENTIALS } from '../constants';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: () => void;
  role: UserRole;
}

const Login: React.FC<LoginProps> = ({ onLogin, role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (role === 'ADMIN') return <Navigate to="/" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      onLogin();
    } else {
      setError('Credenciais incorretas!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-10 bg-[#1c1f22] rounded-[40px] shadow-2xl border border-white/5 animate-scaleIn">
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-[#00ff88]/10 text-[#00ff88] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-[#00ff88]/20">
          <i className="fa-solid fa-shield-halved text-4xl"></i>
        </div>
        <h2 className="text-3xl font-black text-white">Área Restrita</h2>
        <p className="text-gray-500 mt-2">Apenas administradores autorizados</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#2c2f32] border-none rounded-2xl p-4 text-white focus:ring-2 focus:ring-[#00ff88] outline-none transition-all"
            placeholder="Digite seu e-mail"
            required
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Senha</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#2c2f32] border-none rounded-2xl p-4 text-white focus:ring-2 focus:ring-[#00ff88] outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        
        {error && <p className="text-red-500 text-sm font-bold text-center animate-shake">{error}</p>}

        <button 
          type="submit"
          className="w-full btn-primary py-4 rounded-2xl font-black text-lg shadow-xl shadow-[#00ff88]/20 transition-all hover:scale-[1.02]"
        >
          Entrar como Admin
        </button>
      </form>
    </div>
  );
};

export default Login;
