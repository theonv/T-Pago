import '../../estilos/home.css'

const dadosJson = require('../../funcao/dados.json');
const email = dadosJson.email;
const senha = dadosJson.senha;
const nome = dadosJson.nome;

export default function Home() {
  return (
    <>
        <header>
        <div class="cliente">{nome}</div>
        <picture>
            <img src="../img/icon.png" alt="símbolo de ícone de perfil"/>
        </picture>
    </header>
    <div class="corpo">
        <h1 class="titulo">
            ROTINA
        </h1>
    </div>
    <main>
        <div class="qdd">
            <div class="content-box" id="contentBox">
                <input type="checkbox" id="myCheckbox"></input>            
                <p id="displayText" class="p-style">Tarefa</p>
            </div>
            <div class="container">
                <textarea id="put" type="text" placeholder="Digite sua tarefa:"></textarea>
                <label id="criar-trf">
                    <button class="button" id="createButton">Criar</button>
                </label>
            </div>
        </div>
    </main>
    <footer>
        <picture class="options">
            <img src="../img/home.png" alt="" onclick="home()"/>
            <img src="../img/3s.png" alt="" onclick="listas()"/>
            <img src="../img/calendario.png" alt="" onclick="calendario()"/>
            <img src="../img/engrenagem.png" alt="" onclick="config()"/>
        </picture>
    </footer>
    </>
  );
}