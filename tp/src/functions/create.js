const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function create(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Validação no frontend
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    if (senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres');
        return;
    }

    // Validação de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/auth/cru`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = "/";
            console.log('Usuário criado com sucesso:', data);
        } else {
            // Mostra os erros de validação detalhados se disponíveis
            if (data.details && Array.isArray(data.details)) {
                const errorMessages = data.details.map(err => 
                    `${err.campo}: ${err.mensagem}`
                ).join('\n');
                alert(`Erro ao criar usuário:\n${errorMessages}`);
            } else {
                alert(`Erro ao criar usuário: ${data.message || 'Erro desconhecido'}`);
            }
            console.error('Erro ao criar usuário:', data);
        }
    } catch (er) {
        console.error('Erro ao criar usuário:', er);
        alert('Erro ao conectar com o servidor. Tente novamente.');
    }
}