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
                <div className="box">
                    <ul className="task">
                        {lists.map((list, index)=> (
                            <li className="list-item" key={index}>{list.liste}</li>
                        ))}
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    )
}