import React, { useState } from 'react';
import { UserPlus, Save, X, LogOut } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { Employee } from '../types';

export const AdminPanel: React.FC = () => {
  const { employees, addEmployee, removeEmployee, setIsAdmin } = useGameStore();
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmployee.name && newEmployee.imageUrl) {
      addEmployee({
        id: Date.now(),
        name: newEmployee.name,
        imageUrl: newEmployee.imageUrl
      });
      setNewEmployee({});
      setIsAdding(false);
    }
  };

  const handleExit = () => {
    setIsAdmin(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <div className="flex gap-2">
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Employee
            </button>
          )}
          <button
            onClick={handleExit}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            title="Exit Admin Panel"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Exit
          </button>
        </div>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newEmployee.name || ''}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={newEmployee.imageUrl || ''}
                onChange={(e) => setNewEmployee({ ...newEmployee, imageUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="w-5 h-5 mr-2" />
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={employee.imageUrl}
              alt={employee.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{employee.name}</h3>
                <button
                  onClick={() => removeEmployee(employee.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};