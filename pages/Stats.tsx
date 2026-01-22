
import React from 'react';
import { Player } from '../types';

interface StatsProps {
  players: Player[];
}

const Stats: React.FC<StatsProps> = ({ players }) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-black text-white mb-8 border-l-4 border-[#00ff88] pl-4">Estatística Geral</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {players.map(player => (
          <div key={player.id} className="player-card bg-[#1c1f22] p-6 rounded-[25px] flex flex-col items-center">
            <div className="flex items-center gap-4 w-full mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#00ff88]">
                <img 
                  src={player.photoUrl || `https://picsum.photos/seed/${player.id}/200`} 
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-xl">{player.name}</h4>
                <p className="text-sm text-[#00ff88] uppercase tracking-tighter font-bold">{player.position}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 w-full">
              {[
                { label: 'Jogos', value: player.stats.matches, color: 'text-blue-400' },
                { label: 'Gols', value: player.stats.goals, color: 'text-orange-400' },
                { label: 'Assists', value: player.stats.assists, color: 'text-purple-400' },
                { label: 'Faltas', value: player.stats.absences, color: 'text-yellow-400' }
              ].map(item => (
                <div key={item.label} className="bg-[#2c2f32] p-3 rounded-2xl flex flex-col items-center justify-center">
                  <span className={`text-2xl font-black ${item.color}`}>{item.value}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {players.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500 italic">
            Adicione jogadores para ver as estatísticas.
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
