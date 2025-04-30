export function verify(event) {
    event.preventDefault();
    const dadosJson = require('./dados.json');

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (dadosJson.email === email && dadosJson.senha === senha) {
        alert("Login bem-sucedido!");
        window.location.href = "./home"
        // Redirecionar ou realizar outra ação após o login bem-sucedido
    }

    else if (dadosJson.email !== email) {
        alert("Email incorreto. Tente novamente.");
    }
    else if (dadosJson.senha !== senha) {
        alert("Senha incorreta. Tente novamente.");
    }
}
