import React from 'react';

export function TaskDetailsModal({ selectedTask, setSelectedTask, IconClose }) {
  if (!selectedTask) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 w-full h-full backdrop-blur-md" />
      <div className="z-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={() => setSelectedTask(null)}
          className="absolute top-6 right-6 text-gray-600 hover:text-red-600 transition transform hover:scale-110 cursor-pointer"
          aria-label="Fechar detalhes"
          title="Fechar detalhes"
        >
          <IconClose />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-700 select-none">
          Detalhes da Tarefa
        </h2>
        <p className="mb-4">
          <strong>Status:</strong>{' '}
          <span
            className={`inline-block px-3 py-1 rounded-full font-semibold ${
              selectedTask.concluida
                ? 'bg-green-200 text-green-800'
                : 'bg-yellow-200 text-yellow-800'
            } select-none`}
          >
            {selectedTask.concluida ? 'Concluída' : 'Pendente'}
          </span>
        </p>
        <p className="whitespace-pre-wrap text-gray-800">{selectedTask.conteudo}</p>
      </div>
    </div>
  );
}