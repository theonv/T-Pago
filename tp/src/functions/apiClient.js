// ============================================
// API CLIENT - VERSÃO COM DEBUG
// ============================================
console.log('🚀 [ApiClient] Carregado!');

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth`
  : 'http://localhost:3001/api/auth';

console.log('🌐 [ApiClient] URL Base configurada:', API_BASE_URL);

class ApiClient {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken() {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  async request(endpoint, options = {}) {
    const token = this.getToken();
    console.log('🔍 [ApiClient Debug]');
    console.log('  URL Base:', API_BASE_URL);
    console.log('  Endpoint:', endpoint);
    console.log('  URL Completa:', `${API_BASE_URL}${endpoint}`);
    console.log('  Token existe?', !!token);
    if (token) {
      console.log('  Token (primeiros 20 chars):', token.substring(0, 20) + '...');
    }
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('  Header Authorization:', 'Bearer ' + token.substring(0, 20) + '...');
    } else {
      console.warn('  ⚠️ ATENÇÃO: Nenhum token encontrado!');
    }

    try {
      console.log('  Enviando requisição...');
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      console.log('  Status da resposta:', response.status);
      const data = await response.json();
      console.log('  Dados recebidos:', data);

      if (response.status === 401 && data.error === 'Token expirado') {
        console.log('  ❌ Token expirado - limpando e redirecionando');
        this.clearToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }

      if (!response.ok) {
        console.error('  ❌ Erro na resposta:', data);
        throw new Error(data.message || data.error || 'Erro na requisição');
      }

      console.log('  ✅ Requisição bem-sucedida');
      return data;
    } catch (error) {
      console.error('  ❌ Erro na requisição:', error);
      throw error;
    }
  }

  async login(email, senha) {
    console.log('🔐 [Login] Iniciando login...');
    const data = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });

    console.log('🔐 [Login] Resposta recebida:', data);
    if (data.token) {
      console.log('🔐 [Login] Token recebido, salvando...');
      this.setToken(data.token);
      console.log('🔐 [Login] Token salvo com sucesso!');
      console.log('🔐 [Login] Verificando localStorage:', localStorage.getItem('token') ? 'OK' : 'FALHOU');
    } else {
      console.warn('🔐 [Login] ⚠️ Nenhum token na resposta!');
    }

    return data;
  }

  async register(email, senha) {
    return await this.request('/cru', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
  }

  logout() {
    this.clearToken();
  }

  async createTask(taskData) {
    return await this.request('/createtask', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async getTasks() {
    return await this.request('/gettasks', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async toggleTask(id) {
    return await this.request(`/toggletask/${id}`, {
      method: 'PUT',
    });
  }

  async updateTask(taskData) {
    return await this.request('/updatetask', {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(texto) {
    return await this.request(`/deletetask/${texto}`, {
      method: 'DELETE',
    });
  }

  async createList(listData) {
    return await this.request('/createlist', {
      method: 'POST',
      body: JSON.stringify(listData),
    });
  }

  async getLists() {
    return await this.request('/getlists', {
      method: 'POST',
      body: JSON.stringify({}),
    });
  }

  async updateList(listData) {
    return await this.request('/updatelist', {
      method: 'PUT',
      body: JSON.stringify(listData),
    });
  }

  async deleteList(nome) {
    return await this.request(`/deletelist/${nome}`, {
      method: 'DELETE',
    });
  }

  async addItem(itemData) {
    return await this.request('/additem', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  }

  async toggleItem(itemData) {
    return await this.request('/toggleitem', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  }

  async removeItem(itemData) {
    return await this.request('/removeitem', {
      method: 'DELETE',
      body: JSON.stringify(itemData),
    });
  }

  async updateEmail(newEmail) {
    return await this.request('/updateemail', {
      method: 'PUT',
      body: JSON.stringify({ email: newEmail }),
    });
  }

  async refreshToken() {
    const data = await this.request('/refresh-token', {
      method: 'POST',
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async sendPasswordResetEmail(email) {
    return await this.request('/sendEmail', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(resetToken, newPassword) {
    return await this.request('/resetPassword', {
      method: 'POST',
      body: JSON.stringify({ resetToken, newPassword }),
    });
  }
}

// Exporta uma instância única do cliente
console.log('📦 [ApiClient] Criando instância...');
const apiClient = new ApiClient();
console.log('✅ [ApiClient] Instância criada com sucesso!');
console.log('🔍 [ApiClient] Testando getToken():', apiClient.getToken() ? 'Token encontrado' : 'Sem token');

export default apiClient;

// ============================================================================
// EXEMPLO DE USO
// ============================================================================

/**
 * Exemplo 1: Login e buscar tarefas
 */
async function exemploLogin() {
  try {
    // Faz login
    const loginData = await apiClient.login('usuario@exemplo.com', 'senha123');
    console.log('Login realizado:', loginData.user);

    // Busca tarefas (token é enviado automaticamente)
    const tasks = await apiClient.getTasks();
    console.log('Tarefas:', tasks);

  } catch (error) {
    console.error('Erro:', error.message);
  }
}

async function exemploCriarTarefa() {
  try {
    const newTask = await apiClient.createTask({
      texto: 'Estudar JWT',
      data: '2025-10-20',
      prioridade: 'alta'
    });
    console.log('Tarefa criada:', newTask);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

export function ExampleComponent() {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleLogin = async (email, senha) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiClient.login(email, senha);
      
      window.location.href = '/home';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiClient.getTasks();
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {tasks.map(task => (
        <div key={task.id}>{task.texto}</div>
      ))}
    </div>
  );
}
