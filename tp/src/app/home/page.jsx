'use client';
import '../../estilos/home.css';
import Footer from '../../componentes/footer/footer.jsx';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/componentes/header/page';
const takos = require('../../funcao/tasks.json');

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

      <div className="corpo">
        <h1 className="titulo">ROTINA</h1>
      </div>

      <main>
        <div className="qdd">
          <ul>
            {tasks.map((task, index) => (
              <li className='task-item' key={index}>{task.conteudo}</li>
            ))}
          </ul>

          <div className="container">
            <textarea
              id="put"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua tarefa"
            />
            <button className="criar-tarefa" onClick={handleCreateTask}>Adicionar Tarefa</button>
          </div>
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
