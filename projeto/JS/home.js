document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('put');
    const createButton = document.getElementById('createButton'); // Botão de criação
    const contentContainer = document.getElementById('contentBox'); // Contêiner onde as tarefas serão exibidas

    createButton.addEventListener('click', function() {
        const text = textarea.value.trim(); // Pega o texto digitado

        if (text !== "") {
            // Cria uma nova div para o parágrafo e o checkbox
            const newDiv = document.createElement('div');
            

            // Cria o parágrafo e adiciona o texto
            const newParagraph = document.createElement('p');
            const textSpan = document.createElement('span');
            textSpan.textContent = text;
            newParagraph.appendChild(textSpan);

            // **Aqui você adiciona a classe ao parágrafo**:
            newParagraph.classList.add('content-box'); // Adicionando uma classe ao parágrafo

            // Cria o checkbox
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox"; // Define o tipo como "checkbox"
            
            // Adiciona evento para marcar ou desmarcar o parágrafo
            checkbox.addEventListener('change', function() {
                newParagraph.classList.toggle('completed', this.checked);
            });

            // Adiciona o parágrafo e o checkbox na mesma div
            newDiv.appendChild(newParagraph);  // Adiciona o parágrafo à div
            newDiv.appendChild(checkbox);     // Adiciona o checkbox à div

            // Adiciona a nova div ao contentBox
            contentContainer.appendChild(newDiv);

            // Limpa a textarea após criar o parágrafo
            textarea.value = "";
        } else {
            alert("Por favor, digite algo na textarea antes de criar um parágrafo.");
        }
    });
});
