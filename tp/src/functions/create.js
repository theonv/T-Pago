export async function create(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3001/api/auth/cru', {
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
            console.error('Erro ao criar usuário:', data.message);
        }
    } catch (er) {
        console.error('Erro ao criar usuário:', er);
    }
}