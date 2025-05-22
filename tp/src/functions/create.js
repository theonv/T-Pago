export async function create(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('https://scaling-robot-q7p4j4j46j9w344j4-3001.app.github.dev/api/auth/cru', {
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