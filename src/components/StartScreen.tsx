import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const StartScreen: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const { leaderboard, setCurrentPlayer, startGame } = useGameStore();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    
    setCurrentPlayer(playerName);
    startGame();
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6">
      <div className="text-center mb-6 sm:mb-8">
        <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-yellow-500 mb-3 sm:mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Employee Quiz Game</h1>
        <p className="text-gray-600 text-sm sm:text-base">Test your knowledge of your colleagues!</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Leaderboard</h2>
        {leaderboard.length > 0 ? (
          <div className="space-y-2">
            {leaderboard.map((entry, index) => (
              <div 
                key={`${entry.playerName}-${entry.timestamp}`}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm sm:text-base"
              >
                <span className="font-medium truncate mr-2">{entry.playerName}</span>
                <span className="text-green-600 whitespace-nowrap">{entry.score} points</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-sm sm:text-base">No scores yet. Be the first!</p>
        )}
      </div>

      <form onSubmit={handleStart} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Your Name
          </label>
          <input
            type="text"
            id="name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-base font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};