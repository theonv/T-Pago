
const checkbox = document.getElementsByClassName("checkbox");

checkbox.addEventListener("change", () => {
    alert("cahca")
    if (checkbox.checked) {
        console.log("Status: Marcado") 
    } else {
        console.log("Status: Não Marcado") 
    }
});
function criar() {
    const novaDiv = document.createElement('div');
    novaDiv.classList.add('nova-div');
    document.getElementById('container').appendChild(novaDiv);
}
document.getElementById('cria').addEventListener('click', criarNovaDiv);