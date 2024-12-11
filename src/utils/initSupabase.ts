import { supabase } from './supabase';
import { employees as defaultEmployees } from '../data/employees';

export const initializeDatabase = async () => {
  try {
    console.log('Initializing database...');

    // Check if tables exist
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .in('table_name', ['leaderboard', 'employees']);

    if (tablesError) {
      console.error('Error checking tables:', tablesError);
      return;
    }

    console.log('Existing tables:', tables);

    // Check if employees table has data
    const { data: existingEmployees, error: checkError } = await supabase
      .from('employees')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking employees:', checkError);
      return;
    }

    console.log('Existing employees:', existingEmployees);

    // If empty, insert default employees
    if (!existingEmployees?.length) {
      console.log('Inserting default employees...');
      const { data: insertedData, error: insertError } = await supabase
        .from('employees')
        .insert(
          defaultEmployees.map(emp => ({
            name: emp.name,
            image_url: emp.imageUrl
          }))
        )
        .select();
      
      if (insertError) {
        console.error('Error inserting default employees:', insertError);
      } else {
        console.log('Default employees inserted successfully:', insertedData);
      }
    }

  } catch (error) {
    console.error('Database initialization error:', error);
  }
};