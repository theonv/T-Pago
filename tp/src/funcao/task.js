export function createTask() {
    const novaDiv = document.createElement("div");
    const taskInput = document.getElementById("put").value;

    novaDiv.textContent = taskInput;
    novaDiv.className = "content-box";

    const elementoPai = document.getElementsByClassName('qdd').value;
    elementoPai.appendChild(novaDiv);

    return novaDiv;
}

//TÁ ERRADO - ONCLICK DO PAGE HOME NÃO ESTÁ FUNCIONANDO