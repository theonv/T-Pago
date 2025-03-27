document.addEventListener(
    'DOMContentLoaded',() =>{
        const lf = document.getElementById('formLogin')

        if (lf) {
            lf.addEventListener('submit',async(e) =>{
                e.preventDefault();

                const senha = document.getElementById('senha').value
                const senha1 = document.getElementById('senha2').value
                if (senha != senha1) {
                    throw "senhas diferentes"
                    
                }
                console.debug("very goog")
                try {
                    console.log(JSON.stringify({senha}))
                    //https://www.wpoven.com/tools/free-smtp-server-for-testing
                    const response = await fetch('http://127.0.0.1:3001/api/auth/nvsh',{ //como o front ta rodando no live server porta 5500 (padrão) e o back na 3001 estava dando erro ao acessar a rota
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify({senha}),
                    });

                    if (response.ok) {
                        window.location.href = "./index.html"
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