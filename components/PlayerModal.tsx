
import React, { useState, useEffect } from 'react';
import { Player, PlayerPosition, UserRole } from '../types';
import { MONTHS } from '../constants';

interface PlayerModalProps {
  player: Player | null;
  role: UserRole;
  onClose: () => void;
  onSave: (player: Player) => void;
  onDelete: (id: string) => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ player, role, onClose, onSave, onDelete }) => {
  const isAdmin = role === 'ADMIN';
  const currentMonth = new Date().getMonth();

  const [formData, setFormData] = useState<Player>(() => {
    if (player) return { ...player };
    return {
      id: crypto.randomUUID(),
      name: '',
      position: PlayerPosition.ALA,
      photoUrl: '',
      stats: { matches: 0, goals: 0, assists: 0, absences: 0 },
      payments: new Array(12).fill(false)
    };
  });

  const handleStatChange = (key: keyof Player['stats'], amount: number) => {
    setFormData({
      ...formData,
      stats: {
        ...formData.stats,
        [key]: Math.max(0, formData.stats[key] + amount)
      }
    });
  };

  const togglePayment = (index: number) => {
    if (!isAdmin) return;
    const newPayments = [...formData.payments];
    newPayments[index] = !newPayments[index];
    setFormData({ ...formData, payments: newPayments });
  };

  const getPaymentColor = (index: number) => {
    const isPaid = formData.payments[index];
    if (isPaid) return 'bg-[#00ff88] text-black shadow-[0_0_10px_rgba(0,255,136,0.3)]';
    if (index < currentMonth) return 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]';
    return 'bg-[#2c2f32] text-gray-500';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#1c1f22] w-full max-w-lg rounded-[30px] p-8 relative shadow-2xl animate-scaleIn border border-white/5">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>

        <h2 className="text-3xl font-black text-[#00ff88] mb-8">
          {isAdmin ? (player ? 'Editar Jogador' : 'Novo Jogador') : 'Perfil do Atleta'}
        </h2>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Nome do Jogador</label>
              {isAdmin ? (
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#2c2f32] border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-[#00ff88] outline-none transition-all"
                  placeholder="Ex: Yan"
                />
              ) : (
                <div className="w-full bg-[#2c2f32] rounded-xl p-3 text-white font-bold">{formData.name || '---'}</div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Posição</label>
              {isAdmin ? (
                <select 
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value as PlayerPosition})}
                  className="w-full bg-[#2c2f32] border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-[#00ff88] outline-none transition-all appearance-none"
                >
                  {Object.values(PlayerPosition).map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              ) : (
                <div className="w-full bg-[#2c2f32] rounded-xl p-3 text-white font-bold">{formData.position}</div>
              )}
            </div>

            {isAdmin && (
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">URL da Foto</label>
                <input 
                  type="text"
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({...formData, photoUrl: e.target.value})}
                  className="w-full bg-[#2c2f32] border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-[#00ff88] outline-none transition-all"
                  placeholder="img/jogadores/foto.jpg"
                />
              </div>
            )}
          </div>

          {/* Stats Controls */}
          <div className="space-y-3">
            {[
              { label: 'Jogos', key: 'matches' },
              { label: 'Gols', key: 'goals' },
              { label: 'Assistências', key: 'assists' },
              { label: 'Faltas', key: 'absences' },
            ].map((stat) => (
              <div key={stat.key} className="flex items-center justify-between bg-[#2c2f32] p-4 rounded-2xl">
                <span className="font-bold text-gray-300">{stat.label}</span>
                <div className="flex items-center gap-4">
                  {isAdmin && (
                    <button 
                      onClick={() => handleStatChange(stat.key as any, -1)}
                      className="w-8 h-8 rounded-full bg-[#00ff88] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                    >
                      <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                  )}
                  <span className="text-xl font-black text-[#00ff88] min-w-[30px] text-center">
                    {formData.stats[stat.key as keyof Player['stats']]}
                  </span>
                  {isAdmin && (
                    <button 
                      onClick={() => handleStatChange(stat.key as any, 1)}
                      className="w-8 h-8 rounded-full bg-[#00ff88] text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Payments */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">Controle de Pagamentos (Anual)</label>
            <div className="grid grid-cols-4 gap-2">
              {MONTHS.map((month, idx) => (
                <button
                  key={month}
                  disabled={!isAdmin}
                  onClick={() => togglePayment(idx)}
                  className={`py-2 text-[10px] font-bold rounded-lg transition-all ${getPaymentColor(idx)} ${isAdmin ? 'hover:scale-105 active:scale-95' : 'cursor-default'}`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          {isAdmin && (
            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => onSave(formData)}
                className="flex-1 btn-primary py-4 rounded-2xl text-lg shadow-xl shadow-[#00ff88]/20 transition-all hover:scale-[1.02]"
              >
                Salvar
              </button>
              {player && (
                <button 
                  onClick={() => onDelete(player.id)}
                  className="px-8 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-colors shadow-xl shadow-red-500/20"
                >
                  Excluir
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
