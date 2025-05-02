'use client'

import { useState } from 'react';

export function CreateTask() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleCreateTask = () => {
        if (inputValue.trim()) {
            setTasks([...tasks, inputValue]);
            setInputValue('');
        }
    };

    return (
        <div>
            <div className="qdd">
                {tasks.map((task, index) => (
                    <div key={index} className="content-box">
                        {task}
                    </div>
                ))}
            </div>
            <input
                id="put"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleCreateTask}>Adicionar Tarefa</button>
        </div>
    );
}
//TÁ ERRADO - ONCLICK DO PAGE HOME NÃO ESTÁ FUNCIONANDO