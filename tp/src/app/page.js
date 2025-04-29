/*import '../estilos/login.css'

export default function Login() {
  return (
    <>
      <main className='container'>
        <form id="formLogin">
            <h1 id="titulo">LOGIN <span className='titulo-color'>TÁ PAGO</span></h1>
            <picture className='logo'>
                <img src="../img/Logo.png" alt="Logo Tá Pago"/>
            </picture>
            <div className='input'> 
                <input type="email" name="" id="email" placeholder="Email" required/>
            </div>
            <div className='input'>
                <input type="password" name="" id="senha" placeholder="Senha" required/>
            </div>
            <div className='recuperar'>
                <a href="esqsenha.html">Esqueci minha senha</a>
            </div>
            <button className='button' onclick="logar(event)" type="submit">Acesse</button>
            <div className='cadastro'>
                <p>Não tem uma conta? <a href="cadastro.html">Registre-se</a></p>
            </div>
        </form>
    </main>
    </>
  )
}
*/

'use client'
import { useEffect, useState } from 'react';

// Importe o arquivo JSON diretamente
// Você precisará criar este arquivo na raiz do projeto
import dadosJson from '../dados.json';

export default function Home() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // Simula uma chamada API com um pequeno atraso
    setTimeout(() => {
      setInfo(dadosJson);
      console.log("Dados carregados:", dadosJson);
    }, 500);
  }, []);
  
  return (
    <div>
      <h1>Dados da API</h1>
      {info ? (
        <ul>
          <li>Email: {info.email}</li>
          <li>Senha: {info.senha}</li>
        </ul>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}