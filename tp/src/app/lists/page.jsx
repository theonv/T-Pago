'use client'
import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/header/page';
import Footer from '@/components/footer/footer.jsx';
import { useUser } from '@/context/usercontext.jsx';
import { IconEdit, IconCheck, IconClose } from '@/components/actionbuttons/actionbuttons.jsx';
import { Dashboard } from '@/components/dashboard/dashboard.jsx';
import { TaskDetailsModal } from '@/components/taskdetailsmodal.jsx/taskdetailsmodal';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Listas() {
  const { user } = useUser()
  const [lists, setListas] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedList, setSelectedList] = useState(null);

  // Para edição inline: track de qual tarefa está sendo editada e seu valor temporário
  const [editingListId, setEditingListId] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const inputEditRef = useRef(null);


  // Adiciona nova lista
  const handleCreateList = () => {
    if (inputValue.trim()) {
      fetch(`${API_URL}/api/auth/createlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
          console.log(data.id);
          setListas([...lists, { conteudo: inputValue.trim(), id: data.id }]);
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
    fetch(`${API_URL}/api/auth/deletelist/${listId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
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

  useEffect(() => {
    if (!user) return;
    fetch(`${API_URL}/api/auth/getlists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
            id: list.id
          })));
          toast.success('Listas carregadas com sucesso!');
        }
      })
      .catch(() => {
        toast.error('Erro ao carregar listas do banco!');
      });
  }, [user]);


    // Iniciar edição inline
    const startEditing = (List) => {
      setEditingListId(List.id);
      setEditingValue(List.conteudo);
      setSelectedList(null);
    };
  
    // Salvar edição
    const saveEdit = (ListId) => {
      if (!editingValue.trim()) {
        toast.error('Lista não pode ficar vazia!');
        return;
      }
  
      fetch(`${API_URL}/api/auth/updatelista`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descricao: editingValue.trim(), id: ListId }),
      })
        .then((response) => {
          if (!response.ok) throw new Error('Erro ao editar lista');
          setListas(
            tasks.map((t) =>
              l.id === ListId ? { ...t, conteudo: editingValue.trim() } : l
            )
          );
          toast.success('Lista editada com sucesso!');
          setEditingListId(null);
          setEditingValue('');
        })
        .catch(() => {
          toast.error('Erro ao Lista tarefa no banco!');
        });
    };
  
    // Cancelar edição
    const cancelEdit = () => {
      setEditingListId(null);
      setEditingValue('');
    };
  
    // Focus automático no input ao iniciar edição
    useEffect(() => {
      if (editingListId !== null && inputEditRef.current) {
        inputEditRef.current.focus();
      }
    }, [editingListId]);
  


  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold text-[var(--foreground)] h-[10vh] flex justify-center items-center">
        LISTAS
      </h1>

      <main className="flex flex-col items-center justify-start px-4 py-8 min-h-[60vh] md:min-h-[auto]">
        {/* min-h-[60vh] em mobile para manter boa altura, e no desktop deixa automático */}

        <div className="w-full max-w-[600px] bg-transparent p-2 my-5 overflow-y-auto max-h-[40vh] md:max-h-[60vh]">
          <ul className="w-full">

            {lists.map((list, index) => (
              <li
                key={list.id || index}
                className="flex items-center justify-between px-4 py-2 mb-3 bg-blue-700 text-white rounded cursor-pointer"
                onClick={() => alert(`Lista: ${list.conteudo}`)}
              >
                <span id={list.id} >{list.conteudo}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      const newName = prompt('Editar nome da lista:', list.conteudo);
                      if (newName && newName.trim() && newName.trim() !== list.conteudo) {
                        fetch(`${API_URL}/api/auth/updatelist`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ nome: newName.trim(), id: list.id }),
                        })
                          .then(response => {
                            if (!response.ok) throw new Error('Erro ao editar lista');
                            setListas(lists.map(l => l.id === list.id ? { ...l, conteudo: newName.trim() } : l));
                            toast.success('Lista editada com sucesso!');
                          })
                          .catch(() => {
                            toast.error('Erro ao editar lista no banco!');
                          });
                      }
                    }}
                    className="mr-1 p-1 rounded hover:bg-blue-600 transition-colors"
                    aria-label="Editar lista"
                  >
                    <IconEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteList(list.id)}
                    className="ml-1 w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 border border-red-400"
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
          <textarea
            className="dark:text-gray-400 flex-1 resize-none rounded border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder="Digite sua nova lista aqui... (máx. 54 caracteres)"
            value={inputValue}
            maxLength={54}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleCreateList}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
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
