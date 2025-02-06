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