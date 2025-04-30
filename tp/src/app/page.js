'use client'
import { verify } from '../funcao/verify';
import '../estilos/login.css'

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
                <a href="esqsenha">Esqueci minha senha</a>
            </div>
            <button className='button' onClick={verify} type="button">Acesse</button>
            <div className='cadastro'>
                <p>Não tem uma conta? <a href="cadastro">Registre-se</a></p>
            </div>
        </form>
    </main>
    </>
  )
}