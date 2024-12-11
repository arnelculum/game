import React from 'react';
import { useGameStore } from './store/gameStore';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { EndScreen } from './components/EndScreen';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { Settings } from 'lucide-react';

function App() {
  const { 
    gameStarted, 
    gameEnded, 
    isAdmin, 
    showAdminLogin, 
    toggleAdmin, 
    setShowAdminLogin,
    setIsAdmin 
  } = useGameStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-4 right-4">
        <button
          onClick={toggleAdmin}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
          title="Admin Panel"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {showAdminLogin && (
        <AdminLogin
          onLogin={(success) => setIsAdmin(success)}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {isAdmin ? (
        <AdminPanel />
      ) : (
        <div className="py-6 sm:py-8">
          {!gameStarted && <StartScreen />}
          {gameStarted && !gameEnded && <QuizScreen />}
          {gameEnded && <EndScreen />}
        </div>
      )}
    </div>
  );
}

export default App;