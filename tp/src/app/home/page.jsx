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
      setInputValue('');
      toast.success('Tarefa adicionada com sucesso!');
    } else {
      toast.error('Por favor, digite uma tarefa válida!');
    }
  };

  useEffect(() => {
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
