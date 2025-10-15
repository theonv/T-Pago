export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, message: 'Email é obrigatório' };
  }
  
  if (email.length > 100) {
    return { valid: false, message: 'Email deve ter no máximo 100 caracteres' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Email inválido' };
  }
  
  return { valid: true, message: '' };
};

// Validação de senha
export const validatePassword = (password, minLength = 6) => {
  if (!password) {
    return { valid: false, message: 'Senha é obrigatória' };
  }
  
  if (password.length < minLength) {
    return { valid: false, message: `Senha deve ter pelo menos ${minLength} caracteres` };
  }
  
  if (password.length > 100) {
    return { valid: false, message: 'Senha deve ter no máximo 100 caracteres' };
  }
  
  return { valid: true, message: '' };
};

// Validação de nome
export const validateName = (name, minLength = 2, maxLength = 40) => {
  if (!name) {
    return { valid: false, message: 'Nome é obrigatório' };
  }
  
  const trimmedName = name.trim();
  
  if (trimmedName.length < minLength) {
    return { valid: false, message: `Nome deve ter pelo menos ${minLength} caracteres` };
  }
  
  if (trimmedName.length > maxLength) {
    return { valid: false, message: `Nome deve ter no máximo ${maxLength} caracteres` };
  }
  
  return { valid: true, message: '' };
};

// Validação de descrição de tarefa
export const validateTaskDescription = (description) => {
  if (!description) {
    return { valid: false, message: 'Descrição é obrigatória' };
  }
  
  const trimmedDesc = description.trim();
  
  if (trimmedDesc.length === 0) {
    return { valid: false, message: 'Descrição não pode estar vazia' };
  }
  
  if (trimmedDesc.length > 255) {
    return { valid: false, message: 'Descrição deve ter no máximo 255 caracteres' };
  }
  
  return { valid: true, message: '' };
};

// Validação de nome de tarefa
export const validateTaskName = (name) => {
  if (!name) {
    return { valid: true, message: '' }; // Nome é opcional
  }
  
  if (name.trim().length > 100) {
    return { valid: false, message: 'Nome deve ter no máximo 100 caracteres' };
  }
  
  return { valid: true, message: '' };
};

// Validação de nome de lista
export const validateListName = (name) => {
  if (!name) {
    return { valid: false, message: 'Nome da lista é obrigatório' };
  }
  
  const trimmedName = name.trim();
  
  if (trimmedName.length === 0) {
    return { valid: false, message: 'Nome da lista não pode estar vazio' };
  }
  
  if (trimmedName.length > 40) {
    return { valid: false, message: 'Nome da lista deve ter no máximo 40 caracteres' };
  }
  
  return { valid: true, message: '' };
};

// Validação de data
export const validateDate = (date) => {
  if (!date) {
    return { valid: true, message: '' }; // Data é opcional
  }
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return { valid: false, message: 'Data inválida' };
  }
  
  return { valid: true, message: '' };
};

/**
 * Validadores de formulário completo
 */

// Validação de formulário de login
export const validateLoginForm = (formData) => {
  const errors = {};
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.message;
  }
  
  const passwordValidation = validatePassword(formData.senha);
  if (!passwordValidation.valid) {
    errors.senha = passwordValidation.message;
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

// Validação de formulário de registro
export const validateRegisterForm = (formData) => {
  const errors = {};
  
  // Nome (opcional, mas se fornecido deve ser válido)
  if (formData.nome) {
    const nameValidation = validateName(formData.nome);
    if (!nameValidation.valid) {
      errors.nome = nameValidation.message;
    }
  }
  
  // Email (obrigatório)
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.message;
  }
  
  // Senha (obrigatório)
  const passwordValidation = validatePassword(formData.senha);
  if (!passwordValidation.valid) {
    errors.senha = passwordValidation.message;
  }
  
  // Confirmar senha (se fornecido)
  if (formData.confirmarSenha !== undefined) {
    if (formData.senha !== formData.confirmarSenha) {
      errors.confirmarSenha = 'As senhas não coincidem';
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

// Validação de formulário de tarefa
export const validateTaskForm = (formData) => {
  const errors = {};
  
  // Descrição (obrigatório)
  const descValidation = validateTaskDescription(formData.descricao);
  if (!descValidation.valid) {
    errors.descricao = descValidation.message;
  }
  
  // Nome (opcional)
  if (formData.nome) {
    const nameValidation = validateTaskName(formData.nome);
    if (!nameValidation.valid) {
      errors.nome = nameValidation.message;
    }
  }
  
  // Data (opcional)
  if (formData.data) {
    const dateValidation = validateDate(formData.data);
    if (!dateValidation.valid) {
      errors.data = dateValidation.message;
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

// Validação de formulário de lista
export const validateListForm = (formData) => {
  const errors = {};
  
  // Nome (obrigatório)
  const nameValidation = validateListName(formData.nome);
  if (!nameValidation.valid) {
    errors.nome = nameValidation.message;
  }
  
  // Itens (opcional, mas se fornecido deve ter limite)
  if (formData.itens && formData.itens.length > 255) {
    errors.itens = 'Itens devem ter no máximo 255 caracteres';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Hook customizado para validação em tempo real
 */
export const useFormValidation = (initialValues, validationFunction) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  
  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Valida apenas se o campo já foi tocado
    if (touched[name]) {
      const validation = validationFunction({ ...values, [name]: value });
      setErrors(validation.errors);
    }
  };
  
  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Valida ao perder o foco
    const validation = validationFunction(values);
    setErrors(validation.errors);
  };
  
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    
    // Marca todos os campos como tocados
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    // Valida tudo
    const validation = validationFunction(values);
    setErrors(validation.errors);
    
    // Se válido, executa callback
    if (validation.valid) {
      callback(values);
    }
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    isValid: Object.keys(errors).length === 0
  };
};

/**
 * Função auxiliar para exibir mensagens de erro
 */
export const getErrorMessage = (fieldName, errors, touched) => {
  if (touched[fieldName] && errors[fieldName]) {
    return errors[fieldName];
  }
  return '';
};

/**
 * Função auxiliar para classes de estilo de erro
 */
export const getInputClassName = (baseClassName, fieldName, errors, touched) => {
  if (touched[fieldName] && errors[fieldName]) {
    return `${baseClassName} border-red-500 focus:ring-red-500`;
  }
  return baseClassName;
};
