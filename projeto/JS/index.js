function logar() {

    const ema = document.getElementById('email')
    const email = ema.value

    const sen = document.getElementById('senha')
    const senha = sen.value

    if (email == 'admin@gmail.com') {
        if (senha == 'admin') {
            window.location.href = "./home.html"
        }
        else if (senha != 'admin') {
            alert('senha errada ')
        }
    }
    else {
        alert('email errado')
    }
} 
function novasenha() {

    const ema = document.getElementById('email')
    const nsenha = ema.value

    const sen = document.getElementById('senha')
    const senha = sen.value
    
    if (nsenha == senha) {
        alert('Senha alterada mas não salva no banco de Dados')
        window.location.href = "./index.html"
    }
    else{
        alert('As senhas não são iguais')
    }
} 