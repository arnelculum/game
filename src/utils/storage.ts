import { LeaderboardEntry, Employee } from '../types';

const LEADERBOARD_KEY = 'employee-quiz-leaderboard';
const EMPLOYEES_KEY = 'employee-quiz-employees';

export const storage = {
  getLeaderboard: (): LeaderboardEntry[] => {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveLeaderboard: (leaderboard: LeaderboardEntry[]) => {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
  },

  getEmployees: (): Employee[] => {
    const data = localStorage.getItem(EMPLOYEES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveEmployees: (employees: Employee[]) => {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  }
};