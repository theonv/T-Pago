'use client';

import Footer from '../../components/footer/footer.jsx';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/header/page';
import { useUser } from '@/context/usercontext.jsx';
import LapisBranco from '@/components/lapis/page.jsx';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const { user } = useUser(); 
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleCreateTask = () => {
    if (inputValue.trim()) {
      fetch(`${API_URL}/api/auth/createtask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        descricao: inputValue.trim(),
        FK_USUARIO_id: user.id
      }),
      })
      .then(response => {
      if (!response.ok) throw new Error('Erro ao salvar tarefa');
      return response.json();
      })
      .then(data => {
      console.log(data.id);
      setTasks([...tasks, { conteudo: inputValue.trim(), id: data.id }]);
      setInputValue('');
      toast.success('Tarefa adicionada com sucesso!');
      })
      .catch(() => {
      toast.error('Erro ao salvar tarefa no banco!');
      });
    } else {
      toast.error('Por favor, digite uma tarefa válida!');
    }
  };

  const handleDeleteTask = (taskId) => {
    fetch(`${API_URL}/api/auth/deletetask/${taskId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao deletar tarefa');
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast.success('Tarefa removida com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao remover tarefa do banco!');
      });
  };
  useEffect(() => {
  if (!user) return; 
  fetch(`${API_URL}/api/auth/gettasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ FK_USUARIO_id: user.id }),
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao buscar tarefas');
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {

        setTasks(data.map(task => ({ 
          conteudo: task.descricao, 
          id: task.id 
        })));
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
                key={task.id || index}
                className="flex items-center justify-between px-4 py-2 mb-3 bg-blue-700 text-white rounded cursor-pointer"
              >
                <span id={task.id}>{task.conteudo}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      const newName = prompt('Editar nome da tarefa:', task.conteudo);
                        if (newName && newName.trim() && newName.trim() !== task.conteudo) {
                          fetch(`${API_URL}/api/auth/updatetask`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ descricao: newName.trim(), id: task.id }),
                          })
                          .then(response => {
                            if (!response.ok) throw new Error('Erro ao editar lista');
                            setTasks(tasks.map(t => t.id === task.id ? { ...t, conteudo: newName.trim() } : t));
                            toast.success('Tarefa editada com sucesso!');
                          })
                          .catch(() => {
                            toast.error('Erro ao editar tarefa no banco!');
                          });
                        }}}
                    className="mr-2 p-1 rounded hover:bg-blue-600 transition-colors"
                    aria-label="Editar tarefa"
                  >
                  <LapisBranco />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="ml-2 w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 border border-red-400"
                    aria-label="Excluir tarefa"
                  >
                    &times;
                  </button>
                </div>
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
          <input 
          type="time" 
          className="px-5 py-2 bg-[var(--corPrimaria)] text-white rounded hover:bg-blue-800 transition-colors"/>
        </div>

        <div className="flex justify-end w-full max-w-[600px] px-2 mt-3">
          <button
            onClick={handleCreateTask}
            className="px-5 py-2 bg-[var(--corPrimaria)] text-white rounded hover:bg-blue-800 transition-colors"
          >
            Adicionar tarefa
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
