'use client';

import Footer from '../../components/footer/footer.jsx';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/header/page';
import { useUser } from '@/context/usercontext.jsx';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const { user } = useUser(); 
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleCreateTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { conteudo: inputValue.trim() }]);
      fetch(`${API_URL}/api/auth/createtask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: inputValue.trim(),
          usuarioId: user.id
         }),
      })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao salvar tarefa');
        return response.json();
      })
      .catch(() => {
        toast.error('Erro ao salvar tarefa no banco!');
      });
      setInputValue('');
      toast.success('Tarefa adicionada com sucesso!');
    } else {
      toast.error('Por favor, digite uma tarefa válida!');
    }
  };

  const handleDeleteTask = (indexToRemove) => {
    const taskToDelete = tasks[indexToRemove];
    setTasks(tasks.filter((_, idx) => idx !== indexToRemove));
    fetch(`${API_URL}/api/auth/deletetask/${encodeURIComponent(taskToDelete.conteudo)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao deletar tarefa');
      toast.success('Tarefa removida com sucesso!');
    })
    .catch(() => {
      toast.error('Erro ao remover tarefa do banco!');
    });
  };

  useEffect(() => {
    if (!user) return; // Só executa quando o usuário estiver disponível
    fetch(`${API_URL}/api/auth/gettasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuarioId: user.id }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTasks(data.map(t => ({ conteudo: t })));
          toast.success('Tarefas carregadas com sucesso!');
        }
      })
      .catch(() => {
        toast.error('Erro ao carregar tarefas do banco!');
      });
  }, [user]);

  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold text-center text-[var(--foreground)] h-[10vh] flex items-center justify-center">
        ROTINA
      </h1>

      <main className="flex flex-col items-center justify-start px-4 py-8 min-h-[60vh] md:min-h-[auto]">

        <div className="w-full max-w-[600px] bg-transparent p-2 my-5 overflow-y-auto max-h-[40vh] md:max-h-[60vh]">
          <ul>
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-4 py-2 mb-3 bg-blue-700 text-white rounded cursor-pointer"
              >
                <span>{task.conteudo}</span>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  aria-label="Excluir tarefa"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-[600px] p-2">
          <textarea
            id="put"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua tarefa"
            className="w-full h-[100px] rounded shadow text-sm text-white bg-blue-700 p-2 resize-none focus:outline-none"
          />
        </div>

        <div className="flex justify-end w-full max-w-[600px] px-2 mt-3">
          <button
            onClick={handleCreateTask}
            className="px-5 py-2 bg-[var(--corPrimaria)] text-white rounded hover:bg-blue-800 transition-colors"
          >
            Adicionar Tarefa
          </button>
        </div>

      </main>

      <Footer />

      <ToastContainer
        position="top-center"
        toastStyle={{ backgroundColor: 'white' }}
      />
    </>
  );
}
