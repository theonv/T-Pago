const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Cookies from 'js-cookie';

export async function verify({ email, senha }) {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.message || 'Erro ao fazer login');
        }

        const token = data.token || data.jwt;
        if (!token) {
            throw new Error('Token não recebido do servidor');
        }

        return token;
    } catch (er) {
        throw er;
    }
}