export async function verify(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        console.log(JSON.stringify({ email, senha }))
        const response = await fetch('https://organic-eureka-695w649q7gpxh56jw-3001.app.github.dev/api/auth/login', { //como o front ta rodando no live server porta 5500 (padrão) e o back na 3001 estava dando erro ao acessar a rota
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = "./home"
        }
        else {
            console.error('error ao fazer login nego')
        }
    } catch (er) {
        console.error('error ao fazer login negão', er)
    }
}