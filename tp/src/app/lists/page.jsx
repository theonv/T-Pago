'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/header/page'
import Footer from '@/components/footer/footer.jsx'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Listas() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')

  // Carrega tarefas do banco na primeira renderização
  useEffect(() => {
    fetch('https://organic-eureka-695w649q7gpxh56jw-3001.app.github.dev/api/auth/gettasks')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTasks(data.map(t => ({ conteudo: t })))
        }
      })
      .catch(() => toast.error('Erro ao carregar tarefas!'))
  }, [])

  // Adiciona nova tarefa
  const handleCreateTask = () => {
    if (!inputValue.trim()) {
      return toast.error('Digite uma tarefa válida!')
    }

    const nova = { conteudo: inputValue.trim() }

    setTasks(prev => [...prev, nova])
    setInputValue('')

    fetch('https://organic-eureka-695w649q7gpxh56jw-3001.app.github.dev/api/auth/createtask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: nova.conteudo })
    })
      .then(res => {
        if (!res.ok) throw new Error()
        toast.success('Tarefa adicionada com sucesso!')
      })
      .catch(() => toast.error('Erro ao salvar tarefa!'))
  }

  // Exclui tarefa
  const handleDeleteTask = (index) => {
    const taskToDelete = tasks[index]

    setTasks(tasks.filter((_, i) => i !== index))

    fetch(`https://organic-eureka-695w649q7gpxh56jw-3001.app.github.dev/api/auth/deletetask/${encodeURIComponent(taskToDelete.conteudo)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (!res.ok) throw new Error()
        toast.success('Tarefa removida com sucesso!')
      })
      .catch(() => toast.error('Erro ao deletar tarefa!'))
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
      {tasks.map((task, index) => (
        <li
          key={index}
          className="flex items-center justify-between px-4 py-2 mb-3 bg-blue-700 text-white rounded cursor-pointer"
        >
          {task.conteudo}
          <button
            onClick={() => handleDeleteTask(index)}
            className="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
          >
          x
          </button>
        </li>
      ))}
    </ul>
  </div>

  <div className="w-full max-w-[600px] p-2">
    <textarea
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Digite sua tarefa"
      className="w-full h-[100px] rounded shadow text-sm text-white bg-blue-700 p-2 resize-none focus:outline-none"
    />
  </div>

  <div className="flex justify-end w-full max-w-[600px] px-2 mt-3">
    {/* mt-3 para dar um espaçamento pequeno e natural entre textarea e botão */}
    <button
      onClick={handleCreateTask}
      className="px-5 py-2 bg-[var(--corPrimaria)] text-white rounded hover:bg-blue-800 transition-colors"
    >
      Adicionar Tarefa
    </button>
  </div>
</main>


      <Footer />

      {/* Notificações */}
      <ToastContainer position="top-center" toastStyle={{ backgroundColor: 'white' }} />
    </>
  )
}
