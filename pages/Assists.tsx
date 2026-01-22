
import React from 'react';
import { Player } from '../types';

interface AssistsProps {
  players: Player[];
}

const Assists: React.FC<AssistsProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.stats.assists - a.stats.assists);

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      <h2 className="text-3xl font-black text-white mb-8 border-l-4 border-blue-400 pl-4 flex items-center gap-3">
        <i className="fa-solid fa-shoe-prints text-blue-400"></i> Líderes de Assistências
      </h2>
      
      <div className="bg-[#1c1f22] rounded-[30px] overflow-hidden shadow-2xl border border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#2c2f32] text-xs uppercase tracking-widest text-gray-400">
              <th className="px-8 py-6">Rank</th>
              <th className="px-8 py-6">Jogador</th>
              <th className="px-8 py-6 text-right">Total de Assistências</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedPlayers.map((player, idx) => (
              <tr key={player.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-4 font-black text-2xl text-gray-500 italic group-hover:text-blue-400">
                  #{idx + 1}
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={player.photoUrl || `https://picsum.photos/seed/${player.id}/200`} 
                      className="w-12 h-12 rounded-full border-2 border-blue-400/30 group-hover:border-blue-400 transition-all object-cover" 
                      alt={player.name} 
                    />
                    <div>
                      <div className="font-bold text-white text-lg">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.position}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4 text-right">
                  <span className="bg-blue-400 text-black font-black px-4 py-2 rounded-xl shadow-lg shadow-blue-400/20">
                    {player.stats.assists}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {players.length === 0 && (
          <div className="p-20 text-center text-gray-500 italic">
            Aguardando passes decisivos...
          </div>
        )}
      </div>
    </div>
  );
};

export default Assists;
