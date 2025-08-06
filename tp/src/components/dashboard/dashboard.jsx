import React from 'react';

export function Dashboard({ tasks }) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  return (
    <div className="mt-7 mb-2 w-full flex flex-col items-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-200 p-2 max-w-2xl w-full flex flex-col md:flex-row justify-around gap-2">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-700">{safeTasks.length}</span>
          <span className="text-gray-700 dark:text-gray-200">Total de tarefas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-green-600">{safeTasks.filter(t => t.concluida).length}</span>
          <span className="text-gray-700 dark:text-gray-200">Concluídas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-yellow-600">{safeTasks.filter(t => !t.concluida).length}</span>
          <span className="text-gray-700 dark:text-gray-200">Pendentes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-500">
            {safeTasks.length > 0 ? Math.round((safeTasks.filter(t => t.concluida).length / safeTasks.length) * 100) : 0}%
          </span>
          <span className="text-gray-700 dark:text-gray-200">% Concluído</span>
        </div>
      </div>
    </div>
  );
}