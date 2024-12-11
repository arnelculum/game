import { create } from 'zustand';
import { Employee, LeaderboardEntry } from '../types';
import { db } from '../utils/supabase';
import { employees as defaultEmployees } from '../data/employees';
import { initializeDatabase } from '../utils/initSupabase';

interface GameState {
  currentPlayer: string;
  score: number;
  currentQuestion: number;
  employees: Employee[];
  leaderboard: LeaderboardEntry[];
  gameStarted: boolean;
  gameEnded: boolean;
  isAdmin: boolean;
  showAdminLogin: boolean;
  initialized: boolean;
  setCurrentPlayer: (name: string) => void;
  startGame: () => void;
  endGame: () => void;
  incrementScore: () => void;
  nextQuestion: () => void;
  resetGame: () => void;
  toggleAdmin: () => void;
  setShowAdminLogin: (show: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  addEmployee: (employee: Omit<Employee, "id">) => Promise<void>;
  removeEmployee: (id: number) => Promise<void>;
  loadInitialData: () => Promise<void>;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentPlayer: '',
  score: 0,
  currentQuestion: 0,
  employees: defaultEmployees,
  leaderboard: [],
  gameStarted: false,
  gameEnded: false,
  isAdmin: false,
  showAdminLogin: false,
  initialized: false,
  
  loadInitialData: async () => {
    if (!get().initialized) {
      try {
        await initializeDatabase();
        
        const [employees, leaderboard] = await Promise.all([
          db.getEmployees(),
          db.getLeaderboard()
        ]);
        
        set({ 
          initialized: true,
          employees: employees.length > 0 ? employees : defaultEmployees,
          leaderboard: leaderboard.map(entry => ({
            playerName: entry.player_name,
            score: entry.score,
            timestamp: new Date(entry.timestamp).getTime()
          }))
        });
      } catch (error) {
        console.error('Failed to load initial data:', error);
        set({ initialized: true, employees: defaultEmployees });
      }
    }
  },
  
  setCurrentPlayer: (name) => set({ currentPlayer: name }),
  
  startGame: () => set({ 
    gameStarted: true,
    gameEnded: false,
    score: 0,
    currentQuestion: 0
  }),
  
  endGame: async () => {
    const state = get();
    try {
      await db.addScore(state.currentPlayer, state.score);
      const leaderboard = await db.getLeaderboard();
      
      set({
        gameEnded: true,
        leaderboard: leaderboard.map(entry => ({
          playerName: entry.player_name,
          score: entry.score,
          timestamp: new Date(entry.timestamp).getTime()
        }))
      });
    } catch (error) {
      console.error('Failed to save score:', error);
      set({ gameEnded: true });
    }
  },
  
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  
  nextQuestion: () => set((state) => ({
    currentQuestion: state.currentQuestion + 1
  })),
  
  resetGame: () => set({
    currentPlayer: '',
    score: 0,
    currentQuestion: 0,
    gameStarted: false,
    gameEnded: false
  }),

  toggleAdmin: () => set((state) => ({ showAdminLogin: !state.showAdminLogin })),
  
  setShowAdminLogin: (show) => set({ showAdminLogin: show }),
  
  setIsAdmin: (isAdmin) => set({ isAdmin, showAdminLogin: false }),

  addEmployee: async (employee) => {
    try {
      await db.addEmployee(employee);
      const employees = await db.getEmployees();
      set({ employees });
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  },

  removeEmployee: async (id) => {
    try {
      await db.removeEmployee(id);
      const employees = await db.getEmployees();
      set({ employees });
    } catch (error) {
      console.error('Failed to remove employee:', error);
    }
  }
}));

// Load initial data when the store is created
useGameStore.getState().loadInitialData();