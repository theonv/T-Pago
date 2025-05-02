'use client'
import { useState } from 'react';
import '../../estilos/home.css'
import Footer from '../../componentes/footer/footer.jsx'

const dadosJson = require('../../funcao/dados.json');
const email = dadosJson.email;
const senha = dadosJson.senha;
const nome = dadosJson.nome;

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleCreateTask = () => {
        if (inputValue.trim()) {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
    };
    return (
        <>
            <header>
                <div className="cliente">{nome}</div>
                <picture>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>
                </picture>
            </header>
            <div className="corpo">
                <h1 className="titulo">
                    ROTINA
                </h1>
            </div>
            <main>
                <div class="qdd">
                    {tasks.map((task, index) => (
                        <div key={index} className="content-box">
                            {task}
                        </div>
                    ))}
                    <div class="container">
                        <input
                            id="put"
                            type="text"
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