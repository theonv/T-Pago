const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Valida os dados de login antes de enviar para o servidor
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 * @returns {Object} - { valid: boolean, errors: Object }
 */
const validateLoginData = (email, senha) => {
    const errors = {};

    // Validação de email
    if (!email) {
        errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Email inválido';
    } else if (email.length > 100) {
        errors.email = 'Email deve ter no máximo 100 caracteres';
    }

    // Validação de senha
    if (!senha) {
        errors.senha = 'Senha é obrigatória';
    } else if (senha.length < 6) {
        errors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
};

/**
 * Realiza o login do usuário
 * @param {Object} credentials - { email, senha }
 * @returns {Promise<string>} - Token JWT
 * @throws {Error} - Erro com detalhes de validação ou do servidor
 */
export async function verify({ email, senha }) {
    // Validação no frontend
    const validation = validateLoginData(email, senha);
    if (!validation.valid) {
        const errorMessage = Object.values(validation.errors).join(', ');
        throw new Error(errorMessage);
    }

    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            // Se houver detalhes de validação do backend, formata a mensagem
            if (data.details && Array.isArray(data.details)) {
                const errorMessages = data.details.map(err => err.mensagem).join(', ');
                throw new Error(errorMessages);
            }
            throw new Error(data?.message || 'Erro ao fazer login');
        }

        const token = data.token || data.jwt;
        if (!token) {
            throw new Error('Token não recebido do servidor');
        }

        return token;
    } catch (er) {
        // Re-lança o erro para ser tratado pelo componente que chamou
        throw er;
    }
}