import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://amxxxthlqbihtvilikhx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteHh4dGhscWJpaHR2aWxpa2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NzM0OTYsImV4cCI6MjA0OTQ0OTQ5Nn0.GanK3E-O5WmKGj79PSeHkk-uAE568W085VxIQ3cucPA';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const db = {
  async getLeaderboard() {
    console.log('Fetching leaderboard...');
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .order('timestamp', { ascending: false });
    
    if (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }

    console.log('Leaderboard data:', data);

    // Filter to keep only the highest score per player
    const uniqueScores = data?.reduce((acc, current) => {
      const existingEntry = acc.find(entry => entry.player_name === current.player_name);
      if (!existingEntry || existingEntry.score < current.score) {
        // Remove existing entry if any
        const filtered = acc.filter(entry => entry.player_name !== current.player_name);
        return [...filtered, current];
      }
      return acc;
    }, [] as typeof data)
    .sort((a, b) => b.score - a.score) || [];

    console.log('Filtered leaderboard:', uniqueScores);
    return uniqueScores;
  },

  async addScore(playerName: string, score: number) {
    console.log('Adding score:', { playerName, score });
    const { data, error } = await supabase
      .from('leaderboard')
      .insert([{ 
        player_name: playerName, 
        score, 
        timestamp: new Date().toISOString() 
      }])
      .select();
    
    if (error) {
      console.error('Error adding score:', error);
      throw error;
    }
    console.log('Score added successfully:', data);
  },

  async getEmployees() {
    console.log('Fetching employees...');
    const { data, error } = await supabase
      .from('employees')
      .select('*');
    
    if (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }

    console.log('Employees data:', data);
    return data?.map(emp => ({
      id: emp.id,
      name: emp.name,
      imageUrl: emp.image_url
    })) || [];
  },

  async addEmployee(employee: { name: string; imageUrl: string }) {
    console.log('Adding employee:', employee);
    const { data, error } = await supabase
      .from('employees')
      .insert([{ 
        name: employee.name, 
        image_url: employee.imageUrl 
      }])
      .select();
    
    if (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
    console.log('Employee added successfully:', data);
  },

  async removeEmployee(id: number) {
    console.log('Removing employee:', id);
    const { data, error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error removing employee:', error);
      throw error;
    }
    console.log('Employee removed successfully:', data);
  }
};