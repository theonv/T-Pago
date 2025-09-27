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
        console.log(data.jwt);
        if (response.ok) {
            return data.jwt; // Retorna o token JWT
        } else {
            throw new Error('Erro ao fazer login');
        }
    } catch (er) {
        throw er;
    }
}