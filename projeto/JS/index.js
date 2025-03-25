document.addEventListener(
    'DOMContentLoaded',() =>{
        const lf = document.getElementById('formLogin')

        if (lf) {
            lf.addEventListener('submit',async(e) =>{
                e.preventDefault();

                const email = document.getElementById('email').value
                const senha = document.getElementById('senha').value

                try {
                    console.log(JSON.stringify({email,senha}))
                    const response = await fetch('http://127.0.0.1:3001/api/auth/login',{ //como o front ta rodando no live server porta 5500 (padrão) e o back na 3001 estava dando erro ao acessar a rota
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify({email,senha}),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        localStorage.setItem('user',data.user)
                        window.location.href = "./home.html"
                    }
                    else{
                        console.error('error ao fazer login nego')
                    }
                } catch (er) {
                    console.error('error ao fazer login negão',er)
                }
            })
        }
    }
)