function checkbox(){
    const imagem = document.getElementById("checkbox");

    if (imagem.src.endsWith("checkbox1.png")) {
        imagem.src = "img/checkbox0.png";

    } else if (imagem.src.endsWith("checkbox0.png")) {
        imagem.src = "img/checkbox1.png";
    }
}
