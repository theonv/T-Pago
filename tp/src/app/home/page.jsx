import '../../estilos/home.css'
import Footer from '../../componentes/footer/footer.jsx'
import { createTask } from '@/funcao/task';

const dadosJson = require('../../funcao/dados.json');
const email = dadosJson.email;
const senha = dadosJson.senha;
const nome = dadosJson.nome;

export default function Home() {
  return (
    <>
        <header>
        <div className="cliente">{nome}</div>
        <picture>
            <img src="../img/icon.png" alt="símbolo de ícone de perfil"/>
        </picture>
    </header>
    <div className="corpo">
        <h1 className="titulo">
            ROTINA
        </h1>
    </div>
    <main>
        <div class="qdd">
            <div className="content-box" id="contentBox">
                <input type="checkbox" id="myCheckbox"></input>            
                <p id="displayText" className="p-style">Tarefa</p>
            </div>
            <div class="container">
                <textarea id="put" type="text" placeholder="Digite sua tarefa:"></textarea>
                <label id="criar-trf">
                    <button className="button" id="createButton" onClick={createTask}>Criar</button>
                </label>
            </div>
        </div>
    </main>
    <Footer/>
    </>
  );
}