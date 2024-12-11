import React, { useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { generateAnswerOptions } from '../utils/quizUtils';

export const QuizScreen: React.FC = () => {
  const { score, currentQuestion, employees, incrementScore, nextQuestion, endGame } = useGameStore();

  const answerOptions = useMemo(() => {
    const currentEmployee = employees[currentQuestion];
    return generateAnswerOptions(currentEmployee, employees);
  }, [currentQuestion, employees]);

  const handleAnswer = (name: string) => {
    if (name === employees[currentQuestion].name) {
      incrementScore();
    }
    
    if (currentQuestion === employees.length - 1) {
      endGame();
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
      <div className="sticky top-0 bg-gray-100 pt-4 pb-2 mb-4 z-10">
        <div className="text-center">
          <div className="text-lg sm:text-xl font-semibold mb-1">Score: {score}</div>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {employees.length}
          </div>
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <img
          src={employees[currentQuestion].imageUrl}
          alt="Employee"
          className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-full object-cover shadow-lg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {answerOptions.map((employee) => (
          <button
            key={employee.id}
            onClick={() => handleAnswer(employee.name)}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md active:shadow-inner transition-shadow text-center font-medium hover:bg-gray-50 min-h-[3.5rem] text-sm sm:text-base"
          >
            {employee.name}
          </button>
        ))}
      </div>
    </div>
  );
};