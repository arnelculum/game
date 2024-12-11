import { Employee } from '../types';

export const generateAnswerOptions = (
  currentEmployee: Employee,
  allEmployees: Employee[]
): Employee[] => {
  // Get all employees except the current one
  const otherEmployees = allEmployees.filter(emp => emp.id !== currentEmployee.id);
  
  // If we don't have enough employees for 3 wrong answers, duplicate some
  let wrongAnswers: Employee[] = [];
  if (otherEmployees.length < 3) {
    // Duplicate employees until we have enough
    while (wrongAnswers.length < 3) {
      wrongAnswers = [
        ...wrongAnswers,
        ...otherEmployees.map(emp => ({
          ...emp,
          id: emp.id + wrongAnswers.length * allEmployees.length // Ensure unique IDs
        }))
      ];
    }
    wrongAnswers = wrongAnswers.slice(0, 3);
  } else {
    // Randomly select exactly 3 wrong answers
    wrongAnswers = otherEmployees
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  // Combine correct answer with wrong answers and shuffle
  return [...wrongAnswers, currentEmployee]
    .sort(() => Math.random() - 0.5);
};