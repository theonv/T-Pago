'use client'
import './lists.css'
import Footer from '@/components/footer/footer.jsx'
import Header from '@/components/header/page'

import { useEffect, useState } from 'react'
const listos = require('@/functions/lists.json')

export default function Listas() {
    const [lists, setList] = useState([]);



    useEffect(() => {
        setList(prev => [...prev, ...listos.listas])
    }, []);
    
    return (
        <>
            <Header />
                <h1 className="titulo">
                    LISTAS
                </h1>
            <main>
                <div className="box-list">
                    <ul className="task">
                        {lists.map((list, index) => (
                            <li className="list-item flex items-center justify-between px-4 py-2" key={index}>
                                {list.liste}
                                <button
                                    className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                                    aria-label="Excluir tarefa"
                                >
                                    <span className="text-white text-lg font-bold leading-none">×</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="criarLista">
                    <button className="button">CRIAR LISTA</button>
                </div>
                <div className="icon plus-icon"></div>
            </main>
            <Footer />
        </>
    )
}