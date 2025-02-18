document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('put');
    const createButton = document.getElementById('createButton'); // ← Corrigido aqui
    const contentContainer = document.getElementById('contentBox');

    createButton.addEventListener('click', function() {
        const text = textarea.value.trim();

        if (text !== "") {
            const newParagraph = document.createElement('p');
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            
            // Adiciona evento de clique na checkbox
            checkbox.addEventListener('change', function() {
                newParagraph.classList.toggle('completed', this.checked);
            });

            const textSpan = document.createElement('span');
            textSpan.textContent = text;

            newParagraph.appendChild(checkbox);
            newParagraph.appendChild(textSpan);
            contentContainer.appendChild(newParagraph);

            textarea.value = "";
        } else {
            alert("Por favor, digite algo na textarea antes de criar um parágrafo.");
        }
    });
});