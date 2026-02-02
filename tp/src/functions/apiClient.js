// ============================================
// API CLIENT
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth`
  : 'http://localhost:3001/api/auth';

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

    const headers = {
      ...options.headers,
    };

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (response.status === 401 && data.error === 'Token expirado') {
        this.clearToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        throw new Error('Sessão expirada. Por favor, faça login novamente.');
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async login(email, senha) {
    const data = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });

    if (data.token) {
      this.setToken(data.token);
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

  async getUserImages() {
    return await this.request('/user/images', {
      method: 'GET',
    });
  }

  async uploadAvatar(formData) {
    return await this.request('/update/avatar', {
      method: 'PUT',
      body: formData,
    });
  }

  async uploadBackground(formData) {
    return await this.request('/update/background', {
      method: 'PUT',
      body: formData,
    });
  }
}

// Exporta uma instância única do cliente
const apiClient = new ApiClient();

export default apiClient;
