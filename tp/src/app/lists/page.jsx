'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/header/page'
import Footer from '@/components/footer/footer.jsx'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LapisBranco from '@/components/lapis/page.jsx'

export default function Listas() {
  const [listas, setListas] = useState([])
  const [inputValue, setInputValue] = useState('')

  // Carrega listas do banco na primeira renderização
  useEffect(() => {
    fetch('https://organic-eureka-695w649q7gpxh56jw-3001.app.github.dev/api/auth/getlists')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setListas(data.map(t => ({ conteudo: t })))
        }
      })
      .catch(() => toast.error('Erro ao carregar listas!'))
  }, [])

  // Adiciona nova lista
  const handleCreateList = () => {
    if (!inputValue.trim()) {
      return toast.error('Digite uma lista válida!')
    }

    const nova = { conteudo: inputValue.trim() }

    setListas(prev => [...prev, nova])
    setInputValue('')

    fetch('https://organic-eureka-695w649q7gpxh56jw-3001.app.github.dev/api/auth/createlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: nova.conteudo })
    })
      .then(res => {
        if (!res.ok) throw new Error()
        toast.success('Lista adicionada com sucesso!')
      })
      .catch(() => toast.error('Erro ao salvar lista!'))
  }

  // Exclui lista
  const handleDeleteList = (indexToRemove) => {
    const listToDelete = listas[indexToRemove]

    setListas(listas.filter((_, idx) => idx !== indexToRemove))

    fetch(`https://organic-eureka-695w649q7gpxh56jw-3001.app.github.dev/api/auth/deletelist/${encodeURIComponent(listToDelete.conteudo)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (!res.ok) throw new Error()
        toast.success('Lista removida com sucesso!')
      })
      .catch(() => toast.error('Erro ao deletar lista!'))
  }

  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold text-[var(--foreground)] h-[10vh] flex justify-center items-center">
        LISTAS
      </h1>

      <main className="flex flex-col items-center justify-start px-4 py-8 min-h-[60vh] md:min-h-[auto]">
  {/* min-h-[60vh] em mobile para manter boa altura, e no desktop deixa automático */}

  <div className="w-full max-w-[600px] bg-transparent p-2 my-5 
                  overflow-y-auto max-h-[40vh] md:max-h-[60vh]">
    {/* max-height maior no desktop para diminuir scrollbar */}
    <ul className="w-full">
      {listas.map((list, index) => (
        <li
          key={index}
          className="flex items-center justify-between px-4 py-2 mb-3 bg-blue-700 text-white rounded cursor-pointer"
        >
          {list.conteudo}
          <div className="flex items-center">
          <button
            onClick={() => {
                toast.info('Função de editar ainda não implementada!');
              }}
              className="mr-1 p-1 rounded hover:bg-blue-600 transition-colors"
              aria-label="Editar lista"
            >
              <LapisBranco />
          </button>
          <button
            onClick={() => handleDeleteList(index)}
            className="ml-1 w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 border border-red-400"
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
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Digite sua lista"
      className="w-full h-[100px] rounded shadow text-sm text-white bg-blue-700 p-2 resize-none focus:outline-none"
    />
  </div>

  <div className="flex justify-end w-full max-w-[600px] px-2 mt-3">
    {/* mt-3 para dar um espaçamento pequeno e natural entre textarea e botão */}
    <button
      onClick={handleCreateList}
      className="px-5 py-2 bg-[var(--corPrimaria)] text-white rounded hover:bg-blue-800 transition-colors"
    >
      Adicionar lista
    </button>
  </div>
</main>


      <Footer />

      {/* Notificações */}
      <ToastContainer position="top-center" toastStyle={{ backgroundColor: 'white' }} />
    </>
  )
}
