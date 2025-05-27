'use client';
import './home.css';
import Footer from '../../components/footer/footer.jsx';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/header/page';
const takos = require('../../functions/tasks.json');

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleCreateTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { conteudo: inputValue.trim() }]);
      fetch('http://localhost:3001/api/auth/createtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: inputValue.trim() }),
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

  useEffect(() => {
    fetch('http://localhost:3001/api/auth/gettasks')
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
    setTasks(prev => [...prev, ...takos.tarefas]);
  }, []);

  return (
    <>
      <Header />
      <h1 className="titulo">ROTINA</h1>
      <main className='flex flex-col items-center justify-center'>
        <div className="qdd">
          <ul>
            {tasks.map((task, index) => (
              <li className='task-item' key={index}>{task.conteudo}</li>
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
