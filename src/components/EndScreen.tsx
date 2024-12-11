import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { employees } from '../data/employees';

export const EndScreen: React.FC = () => {
  const { score, currentPlayer, resetGame, leaderboard } = useGameStore();
  const percentage = Math.round((score / employees.length) * 100);

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 text-center">
      <Trophy className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-yellow-500 mb-3 sm:mb-4" />
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Quiz Complete!</h2>
      <p className="text-base sm:text-lg mb-4">Great job, {currentPlayer}!</p>
      
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{score}</div>
        <div className="text-gray-600">Correct Answers</div>
        <div className="text-sm text-gray-500 mt-1">{percentage}% Accuracy</div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">All Scores</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
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
      </div>

      <button
        onClick={resetGame}
        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg text-base font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Play Again
      </button>
    </div>
  );
};