'use client';
import { useUser } from '@/context/usercontext';
import '../styles/login.css';
import { verify } from '../functions/verify.js';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
    const { login } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const senha = event.target.senha.value;
        try {
            const user = await verify({ email, senha });
            console.log(user.email)
            alert(user.email)
            login(user); // Salva no contexto
            window.location.href = './home';
        } catch (e) {
            alert('Erro ao fazer login');
        }
    };

    return (
        <>
            <main className="container">
                <form id="formLogin" onSubmit={handleSubmit}>
                    <h1 id="titulo">
                        LOGIN <span className="titulo-color">TÁ PAGO</span>
                    </h1>
                    <div className="logo">
                        <Image
                            src="/img/Logo.png"
                            alt="Logo Tá Pago"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="input">
                        <input type="email" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="input">
                        <input type="password" id="senha" name="senha" placeholder="Senha" required />
                    </div>
                    <div className="recuperar">
                        <Link href="forgotpwd" className="underline text-blue-600 hover:text-blue-900">Esqueci minha senha</Link>
                    </div>
                    <button className="button" type="submit">
                        Acesse
                    </button>
                    <div className="cadastro">
                        <p>
                            Não tem uma conta? <Link href="register" className="underline text-blue-600 hover:text-blue-900">Registre-se</Link>
                        </p>
                    </div>
                </form>
            </main>
        </>
    );
}