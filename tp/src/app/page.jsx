'use client';
import { useUser } from '@/context/usercontext';
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
            console.log(user.email);
            alert(user.email);
            login(user); // Salva no contexto
            window.location.href = './home';
        } catch (e) {
            alert('Erro ao fazer login');
        }
    };

    return (
        <>
            <main className="min-h-screen flex items-center justify-center">
                <div className="w-[420px] border-2 border-foreground rounded-[10px] p-[30px_40px] flex flex-col items-center font-['Roboto']">
                    
                    <header>
                        <h1 className="text-center text-[36px] font-bold">
                            LOGIN <span className="text-[var(--corSecundaria)]">TÁ PAGO</span>
                        </h1>
                    </header>

                    <section className="flex justify-center my-5">
                        <Image
                            src="/img/Logo.png"
                            alt="Logo Tá Pago"
                            width={400}
                            height={400}
                            className="w-2/5 h-auto"
                        />
                    </section>

                    <form id="formLogin" onSubmit={handleSubmit} className="w-full">
                        <div className="w-full h-[50px] my-7">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="w-full h-full bg-transparent border-2 border-foreground rounded-full text-[16px] text-[var(--corSecundaria)] px-5 placeholder:text-[#0059ff8f] focus:outline-none"
                            />
                        </div>

                        <div className="w-full h-[50px] my-7">
                            <label htmlFor="senha" className="sr-only">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Senha"
                                required
                                className="w-full h-full bg-transparent border-2 border-foreground rounded-full text-[16px] text-[var(--corSecundaria)] px-5 placeholder:text-[#0059ff8f] focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full my-[30px] py-[10px] border border-[var(--corSecundaria)] rounded-full text-[16px] text-white bg-[#0059ff] hover:bg-[#0400ff] transition duration-300 ease-in-out transform hover:scale-110"
                        >
                            Acesse
                        </button>
                    </form>

                    <div className="w-full flex flex-col items-center space-y-4">
                        <div className="w-full text-center">
                            <Link
                                href="forgotpwd"
                                className="underline text-blue-600 hover:text-blue-900 text-sm"
                            >
                                Esqueci minha senha
                            </Link>
                        </div>

                        <div className="text-center w-full">
                            <p>
                                Não tem uma conta?{' '}
                                <Link
                                    href="register"
                                    className="underline text-blue-600 hover:text-blue-900"
                                >
                                    Registre-se
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}