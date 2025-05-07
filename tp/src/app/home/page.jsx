'use client';
import '../../estilos/home.css';
import Footer from '../../componentes/footer/footer.jsx';
import { useEffect, useState } from "react";

const dadosJson = require('../../funcao/dados.json');
const { email, senha, nome } = dadosJson;

const takos = require('../../funcao/tasks.json');

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleCreateTask = () => {
    if (inputValue.trim()) {
      // Adiciona como objeto padronizado
      setTasks([...tasks, { conteudo: inputValue.trim() }]);
      setInputValue('');
    }
  };

  useEffect(() => {
    setTasks(prev => [...prev, ...takos.tarefas]);
  }, []);

  return (
    <>
      <header>
        <div className="cliente">{nome}</div>
        <picture>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
          </svg>
        </picture>
      </header>

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
    </>
  );
}
