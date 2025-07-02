const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Esta função apenas faz a requisição e retorna o usuário, não manipula contexto!
export async function verify({ email, senha }) {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Usuário logado:', data);
            return data; // Retorna o usuário para ser salvo no contexto pelo componente React
        } else {
            throw new Error('Erro ao fazer login');
        }
    } catch (er) {
        throw er;
    }
}