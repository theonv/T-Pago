# 📝 Guia de Validação de Inputs no Front-end

## 🎯 Componentes Criados

### 1. **Validadores** (`src/functions/validation.js`)
- Validação de email
- Validação de senha
- Validação de nome
- Validação de descrição de tarefa
- Validação de nome de lista
- Validação de data
- Validadores de formulário completo

### 2. **Componentes de Input** (`src/components/ValidatedInput.jsx`)
- `ValidatedInput` - Input de texto com validação
- `ValidatedTextarea` - Textarea com validação
- `ValidatedSelect` - Select com validação
- `PasswordInput` - Input de senha com mostrar/ocultar

---

## 🚀 Como Usar

### Exemplo 1: Formulário de Login

```jsx
'use client';
import { useState } from 'react';
import { ValidatedInput, PasswordInput } from '@/components/ValidatedInput';
import { validateLoginForm } from '@/functions/validation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Remove erro quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Valida o formulário inteiro
    const validation = validateLoginForm(formData);
    setErrors(validation.errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marca todos como tocados
    setTouched({ email: true, senha: true });
    
    // Valida
    const validation = validateLoginForm(formData);
    setErrors(validation.errors);
    
    if (!validation.valid) {
      return; // Para se tiver erros
    }
    
    // Processa o login
    setLoading(true);
    try {
      // Sua lógica de login aqui
      console.log('Login:', formData);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ValidatedInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        placeholder="seuemail@exemplo.com"
        required
        maxLength={100}
        autoComplete="username"
      />

      <PasswordInput
        label="Senha"
        name="senha"
        value={formData.senha}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.senha}
        touched={touched.senha}
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
```

### Exemplo 2: Formulário de Criar Tarefa

```jsx
'use client';
import { useState } from 'react';
import { ValidatedInput, ValidatedTextarea } from '@/components/ValidatedInput';
import { validateTaskForm } from '@/functions/validation';

export default function CreateTaskForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    data: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const validation = validateTaskForm(formData);
    setErrors(validation.errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({ nome: true, descricao: true, data: true });
    
    const validation = validateTaskForm(formData);
    setErrors(validation.errors);
    
    if (!validation.valid) {
      return;
    }
    
    setLoading(true);
    try {
      // Chama a API para criar a tarefa
      const response = await fetch('/api/createtask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        onSuccess && onSuccess();
        // Limpa o formulário
        setFormData({ nome: '', descricao: '', data: '' });
        setTouched({});
        setErrors({});
      }
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ValidatedInput
        label="Nome da Tarefa"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.nome}
        touched={touched.nome}
        placeholder="Ex: Comprar material"
        maxLength={100}
      />

      <ValidatedTextarea
        label="Descrição"
        name="descricao"
        value={formData.descricao}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.descricao}
        touched={touched.descricao}
        placeholder="Descreva a tarefa..."
        required
        maxLength={255}
        rows={4}
      />

      <ValidatedInput
        label="Data"
        name="data"
        type="datetime-local"
        value={formData.data}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.data}
        touched={touched.data}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Criando...' : 'Criar Tarefa'}
      </button>
    </form>
  );
}
```

### Exemplo 3: Formulário de Registro

```jsx
'use client';
import { useState } from 'react';
import { ValidatedInput, PasswordInput } from '@/components/ValidatedInput';
import { validateRegisterForm } from '@/functions/validation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const validation = validateRegisterForm(formData);
    setErrors(validation.errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({
      nome: true,
      email: true,
      senha: true,
      confirmarSenha: true
    });
    
    const validation = validateRegisterForm(formData);
    setErrors(validation.errors);
    
    if (!validation.valid) {
      return;
    }
    
    setLoading(true);
    try {
      // Sua lógica de registro aqui
      console.log('Registro:', formData);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ValidatedInput
        label="Nome"
        name="nome"
        value={formData.nome}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.nome}
        touched={touched.nome}
        placeholder="Seu nome completo"
        maxLength={40}
      />

      <ValidatedInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        placeholder="seuemail@exemplo.com"
        required
        maxLength={100}
        autoComplete="username"
      />

      <PasswordInput
        label="Senha"
        name="senha"
        value={formData.senha}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.senha}
        touched={touched.senha}
        placeholder="Mínimo 6 caracteres"
        required
        autoComplete="new-password"
      />

      <PasswordInput
        label="Confirmar Senha"
        name="confirmarSenha"
        value={formData.confirmarSenha}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.confirmarSenha}
        touched={touched.confirmarSenha}
        placeholder="Digite a senha novamente"
        required
        autoComplete="new-password"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
}
```

---

## 📋 Regras de Validação

### Email
- ✅ Obrigatório
- ✅ Formato válido (usuario@dominio.com)
- ✅ Máximo 100 caracteres

### Senha
- ✅ Obrigatório
- ✅ Mínimo 6 caracteres
- ✅ Máximo 100 caracteres

### Nome
- ✅ Opcional (mas se fornecido)
- ✅ Mínimo 2 caracteres
- ✅ Máximo 40 caracteres

### Descrição de Tarefa
- ✅ Obrigatório
- ✅ Não pode estar vazio
- ✅ Máximo 255 caracteres

### Nome de Lista
- ✅ Obrigatório
- ✅ Não pode estar vazio
- ✅ Máximo 40 caracteres

---

## 🎨 Features dos Componentes

### ValidatedInput
- ✅ Label com indicador de obrigatório (*)
- ✅ Ícone opcional à esquerda
- ✅ Contador de caracteres
- ✅ Mensagem de erro com ícone
- ✅ Indicador visual de sucesso (✓)
- ✅ Estados de foco e erro

### PasswordInput
- ✅ Botão para mostrar/ocultar senha
- ✅ Ícone de cadeado
- ✅ Todas as features do ValidatedInput

### ValidatedTextarea
- ✅ Contador de caracteres
- ✅ Redimensionamento controlado
- ✅ Todas as features do ValidatedInput

---

## 🔄 Fluxo de Validação

```
Usuário digita → onChange → Remove erro
                     ↓
Usuário sai do campo → onBlur → Valida campo
                     ↓
Usuário submete → onSubmit → Valida tudo
                     ↓
                 Válido? → Envia para API
                     ↓
                 Inválido? → Mostra erros
```

---

## 💡 Boas Práticas

1. **Validação em tempo real:**
   - Valida no `onBlur` (quando sai do campo)
   - Não valida a cada tecla (evita frustração)

2. **Feedback visual:**
   - Borda vermelha para erro
   - Ícone e mensagem clara
   - Checkmark verde para sucesso

3. **Acessibilidade:**
   - Labels adequados
   - Mensagens de erro descritivas
   - Estados visuais claros

4. **UX:**
   - Contador de caracteres
   - Placeholder informativo
   - Desabilita botão durante carregamento

---

## 🆘 Troubleshooting

### Erro não aparece
- Verifique se o campo está marcado como `touched`
- Chame `handleBlur` no evento `onBlur`

### Validação não funciona
- Importe a função de validação correta
- Verifique se está passando os dados corretos

### Componente não renderiza
- Verifique se importou corretamente
- Adicione `'use client'` se for client component

---

**Data:** 15 de outubro de 2025  
**Status:** ✅ Pronto para uso
