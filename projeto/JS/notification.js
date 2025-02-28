// Funções para lidar com os estados dos toggles
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona event listeners para cada toggle
    document.getElementById('toggle1').addEventListener('change', function() {
        saveToggleState('toggle1', this.checked);
    });

    document.getElementById('toggle2').addEventListener('change', function() {
        saveToggleState('toggle2', this.checked);
    });

    document.getElementById('toggle3').addEventListener('change', function() {
        saveToggleState('toggle3', this.checked);
    });

    document.getElementById('toggle4').addEventListener('change', function() {
        saveToggleState('toggle4', this.checked);
    });

    // Carrega os estados salvos dos toggles
    loadToggleStates();
});

// Salva o estado do toggle no localStorage
function saveToggleState(toggleId, isChecked) {
    localStorage.setItem(toggleId, isChecked);
}

// Carrega os estados salvos dos toggles
function loadToggleStates() {
    const toggle1 = document.getElementById('toggle1');
    const toggle2 = document.getElementById('toggle2');
    const toggle3 = document.getElementById('toggle3');
    const toggle4 = document.getElementById('toggle4');

    // Obtém os estados salvos, ou define como true (ligado) se não existir
    toggle1.checked = localStorage.getItem('toggle1') !== 'false';
    toggle2.checked = localStorage.getItem('toggle2') !== 'false';
    toggle3.checked = localStorage.getItem('toggle3') !== 'false';
    toggle4.checked = localStorage.getItem('toggle4') !== 'false';
}

// Funções de navegação (mantidas do código original)
function home() {
    window.location.href = "home.html";
}

function listas() {
    window.location.href = "lista.html";
}

function config() {
    window.location.href = "config.html";
}