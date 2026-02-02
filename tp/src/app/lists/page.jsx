'use client'
import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/header/page';
import Footer from '@/components/footer/footer.jsx';
import { useUser } from '@/context/usercontext.jsx';
import { IconEdit, IconCheck, IconClose, IconAdd, IconDelete, IconItems } from '@/components/actionbuttons/actionbuttons.jsx';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Listas() {
  const { user } = useUser();
  const [lists, setListas] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const [showItemsModal, setShowItemsModal] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [editingListId, setEditingListId] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const inputEditRef = useRef(null);

  // Carregar listas do usuário
  // Carregar listas do usuário
  useEffect(() => {
    if (!user) return;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    fetch(`${API_URL}/api/auth/getlists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ FK_USUARIO_id: user.id }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar listas');
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setListas(data.map(list => ({
            conteudo: list.nome,
            id: list.id,
            itens: Array.isArray(list.itens) ? list.itens.join(',') : list.itens || '' // CONVERTE ARRAY PARA STRING
          })));
        }
      })
      .catch(() => {
        toast.error('Erro ao carregar listas do banco!');
      });
  }, [user]);

  // Adiciona nova lista
  const handleCreateList = () => {
    if (inputValue.trim()) {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      fetch(`${API_URL}/api/auth/createlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          nome: inputValue.trim(),
          FK_USUARIO_id: user.id
        }),
      })
        .then(response => {
          if (!response.ok) throw new Error('Erro ao salvar lista');
          return response.json();
        })
        .then(data => {
          setListas([...lists, { conteudo: inputValue.trim(), id: data.id, itens: [] }]);
          setInputValue('');
          toast.success('Lista adicionada com sucesso!');
        })
        .catch(() => {
          toast.error('Erro ao salvar lista no banco!');
        });
    } else {
      toast.error('Por favor, digite uma lista válida!');
    }
  };

  // Exclui lista
  const handleDeleteList = (listId) => {
    if (!confirm('Tem certeza que deseja excluir esta lista?')) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    fetch(`${API_URL}/api/auth/deletelist/${listId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ id: listId }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao deletar lista');
        setListas(lists.filter((list) => list.id !== listId));
        toast.success('Lista removida com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao remover lista do banco!');
      });
  };

  // Editar nome da lista
  const handleEditList = (listId, newName) => {
    if (!newName || !newName.trim() || newName === lists.find(l => l.id === listId).conteudo) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    fetch(`${API_URL}/api/auth/updatelist`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ nome: newName.trim(), id: listId }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao editar lista');
        setListas(lists.map(l => l.id === listId ? { ...l, conteudo: newName.trim() } : l));
        setEditingListId(null);
        toast.success('Lista editada com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao editar lista no banco!');
      });
  };

  // Adicionar item a uma lista
  // Adicionar item a uma lista
  // Adicionar item a uma lista
const handleAddItem = (listId) => {
  if (!newItemText.trim()) {
    toast.error('Por favor, digite um item válido!');
    return;
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  fetch(`${API_URL}/api/auth/additem`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({
      nomeItem: newItemText.trim(),
      listaRecebe: listId
    }),
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao adicionar item');
      return response.json();
    })
    .then(data => {
      // ATUALIZAR A LISTA SELECIONADA TAMBÉM
      const novoItemTexto = newItemText.trim();
      
      setListas(prevLists => prevLists.map(list =>
        list.id === listId
          ? {
              ...list,
              itens: list.itens ? `${list.itens},${novoItemTexto}` : novoItemTexto
            }
          : list
      ));
      
      // ATUALIZAR O selectedList PARA MOSTRAR NO MODAL
      setSelectedList(prevSelected => 
        prevSelected && prevSelected.id === listId
          ? {
              ...prevSelected,
              itens: prevSelected.itens ? `${prevSelected.itens},${novoItemTexto}` : novoItemTexto
            }
          : prevSelected
      );
      
      setNewItemText('');
      toast.success('Item adicionado com sucesso!');
    })
    .catch(() => {
      toast.error('Erro ao adicionar item!');
    });
};

  // Remover item de uma lista
  const handleRemoveItem = (listId, itemId) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    fetch(`${API_URL}/api/auth/removeitem/${itemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao remover item');
        setListas(lists.map(list =>
          list.id === listId
            ? { ...list, itens: list.itens.filter(item => item.id !== itemId) }
            : list
        ));
        toast.success('Item removido com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao remover item!');
      });
  };

  // Alternar conclusão de item
  const handleToggleItem = (listId, itemId, completed) => {
    fetch(`${API_URL}/api/auth/toggleitem/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concluido: !completed }),
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro ao atualizar item');
        setListas(lists.map(list =>
          list.id === listId
            ? {
              ...list,
              itens: list.itens.map(item =>
                item.id === itemId ? { ...item, concluido: !completed } : item
              )
            }
            : list
        ));
      })
      .catch(() => {
        toast.error('Erro ao atualizar item!');
      });
  };

  // Abrir modal de itens
  const openItemsModal = (list) => {
    setSelectedList(list);
    setShowItemsModal(true);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-3xl font-bold text-center py-8 text-gray-800 dark:text-white">
          MINHAS LISTAS
        </h1>

        <main className="container mx-auto px-4 pb-16 max-w-4xl">
          {/* Formulário para adicionar nova lista */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Criar Nova Lista</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Digite o nome da nova lista..."
                value={inputValue}
                maxLength={54}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
              />
              <button
                onClick={handleCreateList}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition flex items-center justify-center"
              >
                <IconAdd className="mr-2" /> Criar Lista
              </button>
            </div>
          </div>

          {/* Lista de listas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Suas Listas</h2>

            {lists.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>Você ainda não tem listas criadas.</p>
                <p className="mt-2">Comece adicionando uma nova lista acima!</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {lists.map((list) => (
                  <li key={list.id} className="flex items-center justify-between bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-100 dark:border-gray-600">
                    <div className="flex-1">
                      {editingListId === list.id ? (
                        <div className="flex items-center">
                          <input
                            ref={inputEditRef}
                            className="flex-1 px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleEditList(list.id, editingValue)}
                          />
                          <button
                            onClick={() => handleEditList(list.id, editingValue)}
                            className="ml-2 p-2 text-green-600 hover:bg-green-100 rounded-full dark:hover:bg-green-900"
                          >
                            <IconCheck />
                          </button>
                          <button
                            onClick={() => setEditingListId(null)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full dark:hover:bg-red-900"
                          >
                            <IconClose />
                          </button>
                        </div>
                      ) : (
                        <span className="text-lg font-medium text-gray-800 dark:text-white">{list.conteudo}</span>
                      )}
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {Array.isArray(list.itens)
                          ? list.itens.length
                          : (list.itens ? list.itens.split(',').length : 0)
                        } itens
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openItemsModal(list)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full dark:hover:bg-blue-900"
                        title="Gerenciar itens"
                      >
                        <IconItems />
                      </button>
                      <button
                        onClick={() => {
                          setEditingListId(list.id);
                          setEditingValue(list.conteudo);
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full dark:text-gray-400 dark:hover:bg-gray-600"
                        title="Editar lista"
                      >
                        <IconEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteList(list.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full dark:hover:bg-red-900"
                        title="Excluir lista"
                      >
                        <IconDelete />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>

      {/* Modal para gerenciar itens de uma lista */}
      {showItemsModal && selectedList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Itens da lista: {selectedList.conteudo}
                </h3>
                <button
                  onClick={() => setShowItemsModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <IconClose size={24} />
                </button>
              </div>

              {/* Formulário para adicionar novo item */}
              <div className="mt-4 flex">
                <input
                  className="flex-1 px-3 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Digite um novo item..."
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddItem(selectedList.id)}
                />
                <button
                  onClick={() => handleAddItem(selectedList.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg"
                >
                  <IconAdd />
                </button>
              </div>
            </div>

            {/* Lista de itens */}
            <div className="p-6 overflow-y-auto max-h-96">
              {selectedList.itens?.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">Nenhum item nesta lista ainda.</p>
              ) : (
                <ul className="space-y-3">
                  {selectedList.itens?.split(',').map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={false} // Não temos estado de concluído no seu modelo atual
                          onChange={() => { }} // Função vazia pois não temos toggle
                          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-800 dark:text-white">
                          {item.trim()}
                        </span>
                      </div>
                      <button
                        onClick={() => { }} // Função vazia pois não temos remoção individual
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                        title="Remover item"
                      >
                        <IconDelete size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
      <ToastContainer
        position="top-center"
        toastStyle={{ backgroundColor: 'white', color: 'black' }}
        progressStyle={{ background: 'blue' }}
      />
    </>
  );
}