
const ERROR_MESSAGES = {
  // Erros de autenticação
  'usuario não encontrado': 'Email não cadastrado. Verifique se digitou corretamente.',
  'senha errada papai': 'Senha incorreta. Tente novamente.',
  'Token não fornecido': 'Sessão expirada. Por favor, faça login novamente.',
  'Token inválido': 'Sessão inválida. Por favor, faça login novamente.',
  'Token expirado': 'Sessão expirada. Por favor, faça login novamente.',
  'Token de reset não fornecido': 'Token de recuperação não encontrado.',
  'Token de reset inválido ou expirado': 'Link de recuperação expirado. Solicite um novo.',
  
  // Erros de cadastro
  'Erro ao criar usuário': 'Não foi possível criar sua conta. Tente novamente.',
  'email já está em uso': 'Este email já está cadastrado. Tente fazer login.',
  
  // Erros de validação
  'Email inválido': 'Digite um email válido (exemplo: usuario@email.com).',
  'Senha é obrigatória': 'Por favor, digite sua senha.',
  'Senha deve ter pelo menos 6 caracteres': 'A senha deve ter no mínimo 6 caracteres.',
  'Nome deve ter pelo menos 2 caracteres': 'O nome deve ter pelo menos 2 caracteres.',
  
  // Erros de tarefas
  'Tarefa não encontrada': 'Esta tarefa não existe ou foi excluída.',
  'Erro ao criar tarefa': 'Não foi possível criar a tarefa. Tente novamente.',
  'Erro ao atualizar tarefa': 'Não foi possível atualizar a tarefa.',
  'Erro ao deletar tarefa': 'Não foi possível excluir a tarefa.',
  
  // Erros de listas
  'Lista não encontrada': 'Esta lista não existe ou foi excluída.',
  'Erro ao criar lista': 'Não foi possível criar a lista. Tente novamente.',
  'Erro ao atualizar lista': 'Não foi possível atualizar a lista.',
  'Erro ao deletar lista': 'Não foi possível excluir a lista.',
  
  // Erros genéricos
  'Erro interno do servidor': 'Algo deu errado. Tente novamente em alguns instantes.',
  'Erro de conexão': 'Não foi possível conectar ao servidor. Verifique sua internet.',
};

/**
 * Traduz mensagens de erro do back-end para mensagens amigáveis
 * @param {string} errorMessage - Mensagem de erro original do back-end
 * @returns {string} - Mensagem amigável para o usuário
 */
export const translateErrorMessage = (errorMessage) => {
  if (!errorMessage) {
    return 'Ocorreu um erro inesperado. Tente novamente.';
  }
  
  // Procura por correspondência exata
  if (ERROR_MESSAGES[errorMessage]) {
    return ERROR_MESSAGES[errorMessage];
  }
  
  // Procura por correspondência parcial
  for (const [key, value] of Object.entries(ERROR_MESSAGES)) {
    if (errorMessage.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // Se não encontrar, retorna a mensagem original (pode ser do Zod)
  return errorMessage;
};

/**
 * Extrai erros de resposta da API e os formata
 * @param {Object} error - Objeto de erro capturado no catch
 * @param {Response} response - Resposta da API (opcional)
 * @returns {Object} - Objeto com informações do erro formatadas
 */
export const parseApiError = async (error, response = null) => {
  const errorInfo = {
    type: 'unknown',
    message: 'Ocorreu um erro inesperado',
    fields: {},
    originalError: error
  };

  try {
    // Se temos uma resposta HTTP
    if (response) {
      const data = await response.json().catch(() => ({}));
      
      // Erro de validação do Zod (campos específicos)
      if (data.details && Array.isArray(data.details)) {
        errorInfo.type = 'validation';
        errorInfo.message = data.message || 'Dados inválidos. Verifique os campos.';
        
        // Mapeia erros para campos específicos
        data.details.forEach(detail => {
          const fieldName = detail.campo || detail.path;
          const fieldMessage = translateErrorMessage(detail.mensagem || detail.message);
          errorInfo.fields[fieldName] = fieldMessage;
        });
        
        return errorInfo;
      }
      
      // Erro de autenticação
      if (response.status === 401) {
        errorInfo.type = 'auth';
        errorInfo.message = translateErrorMessage(
          data.message || 'Sessão expirada. Por favor, faça login novamente.'
        );
        return errorInfo;
      }
      
      // Erro de permissão
      if (response.status === 403) {
        errorInfo.type = 'permission';
        errorInfo.message = 'Você não tem permissão para realizar esta ação.';
        return errorInfo;
      }
      
      // Erro 404
      if (response.status === 404) {
        errorInfo.type = 'notfound';
        errorInfo.message = translateErrorMessage(
          data.message || 'Recurso não encontrado.'
        );
        return errorInfo;
      }
      
      // Erro 400 (Bad Request)
      if (response.status === 400) {
        errorInfo.type = 'badrequest';
        errorInfo.message = translateErrorMessage(
          data.message || data.error || 'Dados inválidos. Verifique as informações.'
        );
        return errorInfo;
      }
      
      // Erro 500 (Server Error)
      if (response.status >= 500) {
        errorInfo.type = 'server';
        errorInfo.message = translateErrorMessage(
          data.message || 'Erro no servidor. Tente novamente em alguns instantes.'
        );
        return errorInfo;
      }
      
      // Outros erros HTTP
      errorInfo.message = translateErrorMessage(
        data.message || data.error || `Erro: ${response.status}`
      );
      return errorInfo;
    }
    
    // Erro de rede (sem resposta)
    if (error.message === 'Failed to fetch' || error.name === 'NetworkError') {
      errorInfo.type = 'network';
      errorInfo.message = 'Erro de conexão. Verifique sua internet e tente novamente.';
      return errorInfo;
    }
    
    // Timeout
    if (error.name === 'AbortError') {
      errorInfo.type = 'timeout';
      errorInfo.message = 'A requisição demorou muito. Tente novamente.';
      return errorInfo;
    }
    
    // Erro genérico
    errorInfo.message = translateErrorMessage(error.message);
    return errorInfo;
    
  } catch (parseError) {
    console.error('Erro ao parsear resposta:', parseError);
    return errorInfo;
  }
};

/**
 * Classe para gerenciar erros da API (sem usar hooks)
 * Útil para componentes de classe ou lógica fora de componentes React
 */
export class ApiErrorManager {
  constructor() {
    this.error = null;
    this.fieldErrors = {};
    this.listeners = [];
  }
  
  /**
   * Registra um listener para mudanças de estado
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  /**
   * Notifica todos os listeners
   */
  notify() {
    this.listeners.forEach(listener => listener({
      error: this.error,
      fieldErrors: this.fieldErrors
    }));
  }
  
  /**
   * Define um erro da API
   */
  async handleError(err, response = null) {
    const errorInfo = await parseApiError(err, response);
    
    this.error = errorInfo.message;
    this.fieldErrors = errorInfo.fields;
    this.notify();
    
    // Auto-limpa após 5 segundos (apenas mensagem geral)
    setTimeout(() => {
      if (this.error === errorInfo.message) {
        this.error = null;
        this.notify();
      }
    }, 5000);
    
    return errorInfo;
  }
  
  /**
   * Limpa todos os erros
   */
  clearErrors() {
    this.error = null;
    this.fieldErrors = {};
    this.notify();
  }
  
  /**
   * Limpa erro de um campo específico
   */
  clearFieldError(fieldName) {
    delete this.fieldErrors[fieldName];
    this.notify();
  }
  
  /**
   * Verifica se há erros
   */
  hasError() {
    return !!this.error || Object.keys(this.fieldErrors).length > 0;
  }
}

/**
 * Função auxiliar para fazer requisições com tratamento de erro integrado
 * @param {string} url - URL da API
 * @param {Object} options - Opções do fetch
 * @returns {Promise<Object>} - Dados ou erro parseado
 */
export const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}`);
      const errorInfo = await parseApiError(error, response);
      throw errorInfo;
    }
    
    return await response.json();
  } catch (error) {
    if (error.type) {
      // Já é um erro parseado
      throw error;
    }
    
    // Parseia erro de rede/desconhecido
    const errorInfo = await parseApiError(error);
    throw errorInfo;
  }
};

/**
 * Verifica se um erro é de autenticação (para redirecionar ao login)
 * @param {Object} errorInfo - Informações do erro parseado
 * @returns {boolean}
 */
export const isAuthError = (errorInfo) => {
  return errorInfo?.type === 'auth' || 
         errorInfo?.message?.includes('login') ||
         errorInfo?.message?.includes('Sessão');
};

/**
 * Verifica se um erro é de validação de campos
 * @param {Object} errorInfo - Informações do erro parseado
 * @returns {boolean}
 */
export const isValidationError = (errorInfo) => {
  return errorInfo?.type === 'validation' && 
         Object.keys(errorInfo?.fields || {}).length > 0;
};

export default {
  translateErrorMessage,
  parseApiError,
  ApiErrorManager,
  fetchWithErrorHandling,
  isAuthError,
  isValidationError
};
