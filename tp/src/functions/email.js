const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Valida o email antes de enviar
 * @param {string} email - Email a ser validado
 * @returns {Object} - { valid: boolean, message: string }
 */
const validateEmail = (email) => {
  if (!email) {
    return { valid: false, message: 'Email é obrigatório' };
  }

  const trimmedEmail = email.trim();
  
  if (trimmedEmail.length === 0) {
    return { valid: false, message: 'Email não pode estar vazio' };
  }

  if (trimmedEmail.length > 100) {
    return { valid: false, message: 'Email deve ter no máximo 100 caracteres' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, message: 'Email inválido. Use o formato: exemplo@email.com' };
  }

  return { valid: true, message: '' };
};

/**
 * Envia email de redefinição de senha
 * @param {Event} event - Evento do formulário
 */
export async function e_mail(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const email = emailInput?.value?.trim();

  // Validação do email
  const validation = validateEmail(email);
  if (!validation.valid) {
    alert(validation.message);
    console.error(validation.message);
    if (emailInput) emailInput.focus();
    return;
  }

  try {
    console.log('Enviando email de redefinição para:', email);
    const response = await fetch(`${API_URL}/api/auth/sendEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('E-mail enviado com sucesso:', data);
      alert('Email de redefinição enviado com sucesso! Verifique sua caixa de entrada.');
      window.location.href = "/";
    } else {
      const errorMessage = data.message || 'Erro ao enviar e-mail';
      alert(`Erro: ${errorMessage}`);
      console.error('Erro ao enviar e-mail:', errorMessage);
    }
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
  }
}