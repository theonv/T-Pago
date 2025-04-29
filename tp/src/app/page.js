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
// pages/index.js
'use client'
import { useEffect, useState } from 'react';

export default function Home() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch('../api/v1/user')
      .then(res => res.json())
      .then(data => setInfo(data));
  }, []);

  return (
    <div>
      <h1>Dados da API</h1>
      {info ? (
        <ul>
          <li>Nome: {info.email}</li>
          <li>Idade: {info.senha}</li>
        </ul>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
