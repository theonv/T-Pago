'use client';
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

export default function Home() {
  const { user } = useUser();

  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);

  // Para edição inline: track de qual tarefa está sendo editada e seu valor temporário
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const inputEditRef = useRef(null);

  const [inputValue, setInputValue] = useState('');

  // Carregar tarefas
  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/api/auth/gettasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ FK_USUARIO_id: user.id }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(
            data.map((task) => ({
              id: task.id,
              conteudo: task.descricao,
              concluida: task.concluida || false,
              createdAt: task.createdAt || null,
            }))
          );
          toast.success('Tarefas carregadas com sucesso!');
        } else {
          toast.error('Resposta inesperada da API');
        }
      })
      .catch(() => {
        toast.error('Erro ao carregar tarefas do banco!');
      });
  }, [user]);

  // Atualizar progresso
  useEffect(() => {
    const total = tasks.length;
    const concluidas = tasks.filter((t) => t.concluida).length;
    const percent = total > 0 ? Math.round((concluidas / total) * 100) : 0;
    setProgress(percent);
  }, [tasks]);

  // Criar tarefa
  const handleCreateTask = () => {
    if (inputValue.trim()) {
      fetch(`${API_URL}/api/auth/createtask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          descricao: inputValue.trim(),
          FK_USUARIO_id: user.id,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error('Erro ao salvar tarefa');
          return response.json();
        })
        .then((data) => {
          setTasks([...tasks, { conteudo: inputValue.trim(), id: data.id, concluida: false }]);
          setInputValue('');
          toast.success('Tarefa adicionada com sucesso!');
        })
        .catch(() => {
          toast.error('Erro ao salvar tarefa no banco!');
        });
    } else {
      toast.error('Por favor, digite uma tarefa válida!');
    }
  };

  // Deletar tarefa
  const handleDeleteTask = (taskId) => {
    fetch(`${API_URL}/api/auth/deletetask/${taskId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao deletar tarefa');
        setTasks(tasks.filter((task) => task.id !== taskId));
        toast.success('Tarefa removida com sucesso!');
      })
      .catch(() => {
        toast.error('Erro ao remover tarefa do banco!');
      });
  };

  // Alternar conclusão da tarefa
  const toggleTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    fetch(`${API_URL}/api/auth/toggletask/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId, concluida: !task.concluida }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao atualizar tarefa');
        setTasks(
          tasks.map((t) =>
            t.id === taskId ? { ...t, concluida: !t.concluida } : t
          )
        );
        toast.success('Status da tarefa atualizado!');
      })
      .catch(() => {
        toast.error('Erro ao atualizar status da tarefa!');
      });
  };

  // Iniciar edição inline
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingValue(task.conteudo);
    setSelectedTask(null);
  };

  // Salvar edição
  const saveEdit = (taskId) => {
    if (!editingValue.trim()) {
      toast.error('Tarefa não pode ficar vazia!');
      return;
    }

    fetch(`${API_URL}/api/auth/updatetask`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao: editingValue.trim(), id: taskId }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao editar tarefa');
        setTasks(
          tasks.map((t) =>
            t.id === taskId ? { ...t, conteudo: editingValue.trim() } : t
          )
        );
        toast.success('Tarefa editada com sucesso!');
        setEditingTaskId(null);
        setEditingValue('');
      })
      .catch(() => {
        toast.error('Erro ao editar tarefa no banco!');
      });
  };

  // Cancelar edição
  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingValue('');
  };

  // Focus automático no input ao iniciar edição
  useEffect(() => {
    if (editingTaskId !== null && inputEditRef.current) {
      inputEditRef.current.focus();
    }
  }, [editingTaskId]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
        {/* Título com emoji */}
        <h1 className="900 text-4xl font-extrabold mb-8 text-center text-gray-900 select-none">
          📝 <span className= "dark:text-gray-400">Minhas Tarefas</span>
        </h1>

        {/* Barra de progresso */}
        <div className="relative bg-gray-300 rounded-full h-6 mb-2 overflow-hidden shadow-inner">
          <div
            className="bg-green-500 h-6 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-semibold text-white select-none pointer-events-none">
            {progress}%
          </div>
        </div>
        {/* Texto explicativo da barra de progresso */}
        <p className="text-center text-gray-700 mb-6 text-sm">
          Esta barra representa sua progressão diária e é reiniciada a cada dia.
        </p>

        {/* Lista de tarefas com fundo azul escuro suave */}
        <div
          className="space-y-5 max-h-[30vh] overflow-y-auto rounded-md p-3 border"
          style={{
            background: '#b6c7e6', // azul médio claro
            borderColor: 'transparent',
            borderWidth: '0.1px',
          }}
        >
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`rounded-lg p-4 flex justify-between items-center transition-all duration-300 bg-blue-100 ${
                  task.concluida ? 'opacity-60 line-through' : 'opacity-100'
                }`}
              >
                <div className="flex-1 flex flex-col gap-2">
                  {editingTaskId === task.id ? (
                    <div className="flex gap-2">
                      <input
                        ref={inputEditRef}
                        type="text"
                        className="flex-1 border border-blue-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        maxLength={45}
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(task.id);
                          if (e.key === 'Escape') cancelEdit();
                        }}
                      />
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 rounded transition"
                        aria-label="Salvar edição"
                        title="Salvar edição"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-blue-200 hover:bg-blue-300 text-blue-900 px-3 rounded transition"
                        aria-label="Cancelar edição"
                        title="Cancelar edição"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-lg font-medium text-gray-900 select-text">
                        {task.conteudo}
                      </span>
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="text-blue-700 hover:underline w-max self-start"
                      >
                        Ver detalhes
                      </button>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => startEditing(task)}
                    className="text-blue-900 hover:text-blue-700 transition transform hover:scale-110 cursor-pointer"
                    aria-label="Editar tarefa"
                    title="Editar tarefa"
                  >
                    <IconEdit />
                  </button>

                  <button
                    onClick={() => toggleTask(task.id)}
                    className="text-green-600 hover:text-green-800 transition transform hover:scale-125 cursor-pointer"
                    aria-label="Marcar tarefa como concluída"
                    title="Marcar tarefa como concluída"
                  >
                    <IconCheck />
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-600 hover:text-red-800 transition transform hover:scale-110 cursor-pointer"
                    aria-label="Excluir tarefa"
                    title="Excluir tarefa"
                  >
                    <IconClose />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">Nenhuma tarefa criada</p>
          )}
        </div>

        {/* Input para nova tarefa */}
        <div className="mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
          <textarea
            className="dark:text-gray-400 flex-1 resize-none rounded border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder="Digite sua nova tarefa aqui... (máx. 54 caracteres)"
            value={inputValue}
            maxLength={54}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleCreateTask}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        </div>

        {/* Dashboard de estatísticas */}
        <Dashboard tasks={tasks} />

        {/* Modal detalhes tarefa */}
        <TaskDetailsModal
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          IconClose={IconClose}
        />
      </main>

      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
}