'use client';
import '../styles/login.css';
import { verify } from '../functions/verify.js';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
    return (
        <>
            <main className="container">
                {/* A função `verify` foi removida do atributo `onClick` do botão e atribuída ao `onSubmit` 
             do <form>, para garantir a semântica correta e permitir o envio ao pressionar "Enter". */}
                <form id="formLogin" onSubmit={verify}>
                    <h1 id="titulo">
                        LOGIN <span className="titulo-color">TÁ PAGO</span>
                    </h1>
                    <div className="logo">
                        {/* O <img> foi substituído por <Image> do Next.js para aproveitar os benefícios de 
                otimização automática de imagens, como carregamento preguiçoso (lazy loading) e melhoria no SEO. */}
                        <Image
                            src="/img/Logo.png"
                            alt="Logo Tá Pago"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="input">
                        <input type="email" id="email" placeholder="Email" required />
                    </div>
                    <div className="input">
                        <input type="password" id="senha" placeholder="Senha" required />
                    </div>
                    <div className="recuperar">
                        <Link href="forgotpwd" className="underline text-blue-600 hover:text-blue-900">Esqueci minha senha</Link>
                    </div>
                    {/* Botão agora tem type="submit", o que vai automaticamente disparar o envio do formulário */}
                    <button className="button" type="submit">
                        Acesse
                    </button>
                    <div className="cadastro">
                        <p>
                            Não tem uma conta? <Link href="register"className="underline text-blue-600 hover:text-blue-900">Registre-se</Link>
                        </p>
                    </div>
                </form>
            </main>
        </>
    );
}