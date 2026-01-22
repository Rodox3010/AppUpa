
import React, { useState } from 'react';
import { Player, PlayerPosition, UserRole } from '../types';
import { MONTHS } from '../constants';
import PlayerModal from '../components/PlayerModal';

interface HomeProps {
  players: Player[];
  role: UserRole;
  onAdd: (player: Player) => void;
  onUpdate: (player: Player) => void;
  onDelete: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ players, role, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const openAddModal = () => {
    setSelectedPlayer(null);
    setIsModalOpen(true);
  };

  const openEditModal = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {role === 'ADMIN' && (
        <div className="flex justify-end mb-6">
          <button 
            onClick={openAddModal}
            className="btn-primary flex items-center gap-2 px-6 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105"
          >
            <i className="fa-solid fa-plus"></i> Novo Jogador
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {players.map(player => (
          <div 
            key={player.id} 
            className="player-card flex flex-col items-center text-center cursor-pointer group"
            onClick={() => openEditModal(player)}
          >
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#00ff88]/30 group-hover:border-[#00ff88] transition-all">
                <img 
                  src={player.photoUrl || `https://picsum.photos/seed/${player.id}/200`} 
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#00ff88] text-black text-[10px] font-bold px-2 py-1 rounded-lg">
                {player.position}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-1">{player.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{player.position}</p>
            
            <div className="flex gap-4 text-sm font-semibold">
              <span className="flex items-center gap-1"><i className="fa-solid fa-soccer-ball text-[#00ff88]"></i> {player.stats.goals}</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-shoe-prints text-blue-400"></i> {player.stats.assists}</span>
              <span className="flex items-center gap-1"><i className="fa-solid fa-square text-yellow-400"></i> {player.stats.absences}</span>
            </div>
          </div>
        ))}
        {players.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500 italic">
            Nenhum jogador cadastrado.
          </div>
        )}
      </div>

      {isModalOpen && (
        <PlayerModal 
          player={selectedPlayer}
          role={role}
          onClose={() => setIsModalOpen(false)}
          onSave={(p) => {
            if (selectedPlayer) onUpdate(p);
            else onAdd(p);
            setIsModalOpen(false);
          }}
          onDelete={(id) => {
            onDelete(id);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
