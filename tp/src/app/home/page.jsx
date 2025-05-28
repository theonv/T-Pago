'use client';
import './home.css';
import Footer from '../../components/footer/footer.jsx';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/header/page';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleCreateTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { conteudo: inputValue.trim() }]);
      fetch('https://organic-eureka-695w649q7gpxh56jw-3001.app.github.dev/api/auth/createtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: inputValue.trim() }),
      })
      .then(response => {
        console.log('Response status:', response.status);
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
    console.log('Tarefa a ser deletada:', taskToDelete.conteudo);
    fetch(`https://organic-eureka-695w649q7gpxh56jw-3001.app.github.dev/api/auth/deletetask/${encodeURIComponent(taskToDelete.conteudo)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
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
    fetch('https://organic-eureka-695w649q7gpxh56jw-3001.app.github.dev/api/auth/gettasks')
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        return response.json();
      })
      .then(data => {
        console.log('Dados recebidos do servidor:', data);
        if (Array.isArray(data)) {
          setTasks(prev => [...prev, ...data.map(t => ({ conteudo: t }))]);
          toast.success('Tarefas carregadas com sucesso!');
        }
      })
      .catch(() => {
        toast.error('Erro ao carregar tarefas do banco!');
      });
  }, []);

  return (
    <>
      <Header />
      <h1 className="titulo">ROTINA</h1>
      <main className='flex flex-col items-center justify-center'>
        <div className="qdd">
          <ul>
            {tasks.map((task, index) => (
              <li
                className="task-item flex items-center justify-between px-4 py-2"
                key={index}
              >
                <span>{task.conteudo}</span>
                <button
                  className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  onClick={() => handleDeleteTask(index)}
                  aria-label="Excluir tarefa"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="container">
          <input
            id="put"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite sua tarefa"
          />
        </div>
        {/*Removido o uso do id redundante e reestruturada a div com apenas classes do Tailwind para simplificação e melhor consistência. */}
        <div className='flex justify-end w-[80vh] px-[10px]'>
          <button className="criar-tarefa" onClick={handleCreateTask}>Adicionar Tarefa</button>
        </div>
      </main>

      <Footer />
      <ToastContainer
        position='top-center'
        toastStyle={{
          backgroundColor: 'white',
        }}
      />
    </>
  );
}
