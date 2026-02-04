'use client'

import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from '@/components/header/page'
import Footer from '@/components/footer/footer.jsx'
import { useUser } from '@/context/usercontext.jsx'

import {
  IconEdit,
  IconCheck,
  IconClose,
  IconAdd,
  IconDelete,
  IconItems
} from '@/components/actionbuttons/actionbuttons.jsx'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Listas() {
  const { user } = useUser()

  const [lists, setLists] = useState([])
  const [inputValue, setInputValue] = useState('')

  const [selectedList, setSelectedList] = useState(null)
  const [showItemsModal, setShowItemsModal] = useState(false)

  const [newItemText, setNewItemText] = useState('')

  const [editingListId, setEditingListId] = useState(null)
  const [editingListValue, setEditingListValue] = useState('')

  const [editingItemId, setEditingItemId] = useState(null)
  const [editingItemValue, setEditingItemValue] = useState('')

  // ===============================
  // 🔄 CARREGAR LISTAS
  // ===============================
  useEffect(() => {
    if (!user) return

    const token = localStorage.getItem('token')

    fetch(`${API_URL}/api/auth/getlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ FK_USUARIO_id: user.id })
    })
      .then(res => res.json())
      .then(data => {
        setLists(
          data.map(list => ({
            id: list.id,
            conteudo: list.nome,
            itens: Array.isArray(list.itens) ? list.itens : []
          }))
        )
      })
      .catch(() => toast.error('Erro ao carregar listas'))
  }, [user])

  // ===============================
  // ➕ CRIAR LISTA
  // ===============================
  const handleCreateList = () => {
    if (!inputValue.trim()) return

    const token = localStorage.getItem('token')

    fetch(`${API_URL}/api/auth/createlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        nome: inputValue.trim(),
        FK_USUARIO_id: user.id
      })
    })
      .then(res => res.json())
      .then(data => {
        setLists(prev => [
          ...prev,
          { id: data.id, conteudo: inputValue.trim(), itens: [] }
        ])
        setInputValue('')
        toast.success('Lista criada')
      })
      .catch(() => toast.error('Erro ao criar lista'))
  }

  // ===============================
  // ❌ EXCLUIR LISTA
  // ===============================
  const handleDeleteList = id => {
    if (!confirm('Deseja excluir esta lista?')) return

    const token = localStorage.getItem('token')

    fetch(`${API_URL}/api/auth/deletelist/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setLists(prev => prev.filter(l => l.id !== id))
        toast.success('Lista removida')
      })
      .catch(() => toast.error('Erro ao excluir lista'))
  }

  // ===============================
  // ✏️ EDITAR LISTA
  // ===============================
  const confirmEditList = id => {
    if (!editingListValue.trim()) return

    const token = localStorage.getItem('token')

    fetch(`${API_URL}/api/auth/updatelist`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id, nome: editingListValue })
    })
      .then(() => {
        setLists(prev =>
          prev.map(l =>
            l.id === id ? { ...l, conteudo: editingListValue } : l
          )
        )
        setEditingListId(null)
        toast.success('Nome da lista atualizado')
      })
      .catch(() => toast.error('Erro ao editar lista'))
  }

  // ===============================
  // 📂 ABRIR LISTA
  // ===============================
  const handleOpenList = list => {
    setSelectedList(list)
    setShowItemsModal(true)
  }

  // ===============================
  // ➕ CRIAR TAREFA
  // ===============================
  const handleCreateItem = () => {
    if (!newItemText.trim()) return

    const newItem = {
      id: Date.now(),
      texto: newItemText,
      concluido: false
    }

    const updatedItems = [...selectedList.itens, newItem]

    setLists(prev =>
      prev.map(list =>
        list.id === selectedList.id ? { ...list, itens: updatedItems } : list
      )
    )

    setSelectedList(prev => ({ ...prev, itens: updatedItems }))
    setNewItemText('')
  }

  // ===============================
  // 🔄 ATUALIZAR ITENS
  // ===============================
  const updateItems = itens => {
    setLists(prev =>
      prev.map(list =>
        list.id === selectedList.id ? { ...list, itens } : list
      )
    )
    setSelectedList(prev => ({ ...prev, itens }))
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center mb-10 text-blue-600">
            Minhas Listas
          </h1>

          {/* Criar lista */}
          <div className="mb-10 flex gap-3 bg-white shadow-xl rounded-2xl p-4 border border-blue-100 transition-all focus-within:ring-2 focus-within:ring-blue-400">
            <input
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none transition-all"
              placeholder="Digite o nome da nova lista..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreateList()}
            />
            <button
              onClick={handleCreateList}
              className="bg-blue-600 text-white px-4 rounded-xl hover:scale-105 transition-all"
            >
              <IconAdd />
            </button>
          </div>

          {/* Listas */}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lists.map(list => (
              <li
                key={list.id}
                className="bg-white rounded-2xl shadow-md p-5 flex flex-col hover:shadow-xl transition-all"
              >
                {editingListId === list.id ? (
                  <div className="flex gap-2 mb-4">
                    <input
                      value={editingListValue}
                      onChange={e => setEditingListValue(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 transition-all"
                      autoFocus
                    />
                    <button
                      onClick={() => confirmEditList(list.id)}
                      className="text-green-600 hover:scale-110 transition"
                    >
                      <IconCheck />
                    </button>
                    <button
                      onClick={() => setEditingListId(null)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <IconClose />
                    </button>
                  </div>
                ) : (
                  <h2 className="text-base font-semibold mb-4">
                    {list.conteudo}
                  </h2>
                )}

                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => handleOpenList(list)}
                    className="text-blue-600 hover:scale-110 transition"
                  >
                    <IconItems />
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditingListId(list.id)
                        setEditingListValue(list.conteudo)
                      }}
                      className="text-yellow-500 hover:scale-110 transition"
                    >
                      <IconEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteList(list.id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <IconDelete />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* MODAL DE TAREFAS */}
      {showItemsModal && selectedList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 animate-fade-in">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">{selectedList.conteudo}</h2>
              <button onClick={() => setShowItemsModal(false)}>
                <IconClose />
              </button>
            </div>

            {/* Criar tarefa */}
            <div className="flex gap-2 mb-4 border border-blue-100 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all">
              <input
                value={newItemText}
                onChange={e => setNewItemText(e.target.value)}
                placeholder="Nova tarefa..."
                className="flex-1 px-3 py-2 outline-none rounded-lg transition-all"
              />
              <button
                onClick={handleCreateItem}
                className="bg-blue-600 text-white px-3 rounded-lg hover:scale-105 transition-all"
              >
                <IconAdd />
              </button>
            </div>

            {/* Tarefas */}
            <ul className="space-y-3">
              {selectedList.itens.map(item => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-xl transition-all"
                >
                  {editingItemId === item.id ? (
                    <div className="flex flex-1 gap-2">
                      <input
                        value={editingItemValue}
                        onChange={e =>
                          setEditingItemValue(e.target.value)
                        }
                        className="flex-1 px-2 py-1 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          updateItems(
                            selectedList.itens.map(i =>
                              i.id === item.id
                                ? { ...i, texto: editingItemValue }
                                : i
                            )
                          )
                          setEditingItemId(null)
                        }}
                        className="text-green-600 hover:scale-110 transition"
                      >
                        <IconCheck />
                      </button>
                      <button
                        onClick={() => setEditingItemId(null)}
                        className="text-red-500 hover:scale-110 transition"
                      >
                        <IconClose />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span
                        className={`flex-1 ${
                          item.concluido
                            ? 'line-through text-gray-400'
                            : ''
                        }`}
                      >
                        {item.texto}
                      </span>

                      <div className="flex gap-2 ml-2">
                        <button
                          onClick={() =>
                            updateItems(
                              selectedList.itens.map(i =>
                                i.id === item.id
                                  ? { ...i, concluido: !i.concluido }
                                  : i
                              )
                            )
                          }
                          className="text-green-600 hover:scale-110 transition"
                        >
                          <IconCheck />
                        </button>
                        <button
                          onClick={() => {
                            setEditingItemId(item.id)
                            setEditingItemValue(item.texto)
                          }}
                          className="text-yellow-500 hover:scale-110 transition"
                        >
                          <IconEdit />
                        </button>
                        <button
                          onClick={() =>
                            updateItems(
                              selectedList.itens.filter(
                                i => i.id !== item.id
                              )
                            )
                          }
                          className="text-red-500 hover:scale-110 transition"
                        >
                          <IconDelete />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer position="top-center" />
    </>
  )
}