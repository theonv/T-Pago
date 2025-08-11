import React, { useState } from 'react';
import { IconClose } from '@/components/actionbuttons/actionbuttons';

export function Dashboard({ tasks }) {
  const [modalType, setModalType] = useState(null);
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const completedCount = safeTasks.filter(t => t.concluida).length;

  // Dados para cada modal
  const MODAL_DATA = {
    total: {
      title: "Todas as Tarefas",
      tasks: safeTasks,
      colorClass: "text-blue-700"
    },
    completed: {
      title: "Tarefas Concluídas",
      tasks: safeTasks.filter(t => t.concluida),
      colorClass: "text-green-600"
    },
    pending: {
      title: "Tarefas Pendentes",
      tasks: safeTasks.filter(t => !t.concluida),
      colorClass: "text-yellow-600"
    },
    percentage: {
      title: "Progresso Geral",
      tasks: safeTasks,
      colorClass: "text-blue-500"
    }
  };

  // Calcula porcentagem corretamente (0% quando não há tarefas)
  const completionPercentage = safeTasks.length > 0 
    ? Math.round((completedCount / safeTasks.length) * 100)
    : 0;

  const closeModal = () => setModalType(null);

  return (
    <>
      {/* Dashboard com área clicável ajustada */}
      <div className="mt-7 mb-2 w-full flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-200 p-2 max-w-2xl w-full flex flex-col md:flex-row justify-around gap-2">
          {/* Item - Total */}
          <ClickableItem 
            value={safeTasks.length}
            label="Total de tarefas"
            colorClass="text-blue-700"
            onClick={() => setModalType('total')}
          />

          {/* Item - Concluídas */}
          <ClickableItem
            value={completedCount}
            label="Concluídas"
            colorClass="text-green-600"
            onClick={() => setModalType('completed')}
          />

          {/* Item - Pendentes */}
          <ClickableItem
            value={safeTasks.length - completedCount}
            label="Pendentes"
            colorClass="text-yellow-600"
            onClick={() => setModalType('pending')}
          />

          {/* Item - Percentual */}
          <ClickableItem
            value={`${completionPercentage}%`}
            label="% Concluído"
            colorClass="text-blue-500"
            onClick={() => setModalType('percentage')}
          />
        </div>
      </div>

      {/* Modal dinâmico */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-blue-200 p-6 w-full max-w-md max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold ${MODAL_DATA[modalType].colorClass}`}>
                {MODAL_DATA[modalType].title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Fechar"
              >
                <IconClose />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {MODAL_DATA[modalType].tasks.length > 0 ? (
                <ul className="space-y-2">
                  {MODAL_DATA[modalType].tasks.map(task => (
                    <li 
                      key={task.id}
                      className={`p-3 rounded-lg ${task.concluida ? 'opacity-75' : ''}`}
                    >
                      {task.conteudo}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  Nenhuma tarefa encontrada
                </p>
              )}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
              <p className="text-sm font-medium">
                Total: {MODAL_DATA[modalType].tasks.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Componente para cada item clicável (área ajustada)
function ClickableItem({ value, label, colorClass, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer w-full`}
      aria-label={`Ver ${label.toLowerCase()}`}
    >
      <span className={`text-2xl font-bold ${colorClass}`}>{value}</span>
      <span className="text-gray-700 dark:text-gray-200 text-sm">{label}</span>
    </button>
  );
}