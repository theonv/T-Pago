document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('put');
    const createButton = document.getElementById('createButton');
    const contentContainer = document.getElementById('contentBox');
    
    // Limpa os elementos iniciais de placeholder
    contentContainer.innerHTML = '';
    
    // Posiciona o botão corretamente
    positionCreateButton();
    
    // Função para posicionar o botão criar fora da textarea
    function positionCreateButton() {
        const buttonContainer = document.getElementById('criar-trf');
        
        // Certifica-se de que o botão está completamente fora da textarea
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.right = '10px';
        buttonContainer.style.bottom = '-40px'; // Posiciona abaixo da textarea
    }
    
    createButton.addEventListener('click', function() {
        createNewTask();
    });
    
    // Permite pressionar Enter na textarea para criar uma tarefa
    textarea.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            createNewTask();
        }
    });
    
    function createNewTask() {
        const text = textarea.value.trim();
        
        if (text !== "") {
            // Cria um novo contêiner de item de tarefa
            const newTaskDiv = document.createElement('div');
            newTaskDiv.classList.add('task-item');
            
            // Cria checkbox
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            
            // Cria parágrafo para exibir o texto da tarefa
            const taskText = document.createElement('p');
            taskText.textContent = text;
            taskText.classList.add('p-style');
            
            // Cria botão de excluir
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "X";
            deleteBtn.classList.add('delete-btn');
            
            // Adiciona listener de evento ao checkbox
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    taskText.style.textDecoration = 'line-through';
                    taskText.style.opacity = '0.7';
                } else {
                    taskText.style.textDecoration = 'none';
                    taskText.style.opacity = '1';
                }
            });
            
            // Adiciona listener de evento ao botão de excluir
            deleteBtn.addEventListener('click', function() {
                contentContainer.removeChild(newTaskDiv);
            });
            
            // Anexa elementos ao contêiner de tarefas
            newTaskDiv.appendChild(checkbox);
            newTaskDiv.appendChild(taskText);
            newTaskDiv.appendChild(deleteBtn);
            
            // Adiciona a nova tarefa ao topo da lista
            contentContainer.insertBefore(newTaskDiv, contentContainer.firstChild);
            
            // Limpa a textarea
            textarea.value = "";
        } else {
            alert("Por favor, digite algo na textarea antes de criar uma tarefa.");
        }
    }
});