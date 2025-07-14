'use client';
import '../../styles/login.css';
import Link from 'next/link';
import Image from 'next/image';
import { create } from '../../functions/create.js';

export default function Register() {
    return (
        <>
            <main className="min-h-screen flex items-center justify-center">
                <div className="w-[420px] border-2 border-foreground rounded-[10px] p-[30px_40px] flex flex-col items-center font-['Roboto']">
                    <header>
                        <h1 className="text-center text-[36px] font-bold">
                            CADASTRE - <span className="text-[var(--corSecundaria)]">SE</span>
                        </h1>
                    </header>

                    <section className="flex justify-center my-5">
                        <Image
                            src="/img/Logo.png"
                            alt="Logo Tá Pago"
                            width={400}
                            height={400}
                            placeholder="empty"
                            quality={100}
                            className="w-2/5 h-auto"
                        />
                    </section>

                    <form onSubmit={create} className="w-full">
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
                                placeholder="Crie uma senha"
                                required
                                className="w-full h-full bg-transparent border-2 border-foreground rounded-full text-[16px] text-[var(--corSecundaria)] px-5 placeholder:text-[#0059ff8f] focus:outline-none"
                            />
                        </div>
                        <div className="w-full text-center my-5">
                            <Link href="/" className="underline text-blue-600 hover:text-blue-900">
                                Já Tenho uma conta
                            </Link>
                        </div>
                        <button
                            className="w-full my-[30px] py-[10px] border border-[var(--corSecundaria)] rounded-full text-[16px] text-white bg-[#0059ff] hover:bg-[#0400ff] transition duration-300 ease-in-out transform hover:scale-110"
                            type="submit"
                        >
                            Crie
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}