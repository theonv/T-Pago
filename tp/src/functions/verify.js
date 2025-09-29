const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Faz login e salva token no localStorage (implementação simples, sem cookies)
export async function verify({ email, senha }) {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || 'Erro ao fazer login');

        // backend pode retornar { token, user } ou { jwt }
        const token = data.token || data.jwt;
        if (!token) throw new Error('Token não recebido do servidor');

        // Salva token no localStorage (simples, conforme solicitado)
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
            // opcional: salvar usuário decodificado se quiser
        }

        return token;
    } catch (er) {
        throw er;
    }
}