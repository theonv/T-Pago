'use client';
import '../../styles/login.css';
import Image from 'next/image';
import Link from 'next/link';
import { create } from '../../functions/create.js';

export default function Register() {
    return (
        <>
            <main className="container">
                <form onSubmit={create}>
                    <h1 id="titulo">CADASTRE - <span className="titulo-color">SE</span></h1>
                    <div className="logo">
                        <Image
                            src="/img/Logo.png"
                            alt="Logo Tá Pago"
                            width={400}
                            height={400}
                            placeholder="empty"
                            quality={100}
                        />
                    </div>
                    <div className="input">
                        <input type="email" id="email" placeholder="Email" required />
                    </div>
                    <div className="input">
                        <input type="password" id="senha" placeholder="Crie uma senha" required />
                    </div>
                    <div className="recuperar">
                        <Link href="/" className="underline text-blue-600 hover:text-blue-900">Já Tenho uma conta</Link>
                    </div>
                    <button className="button" type="submit">Crie</button>
                </form>
            </main>
        </>
    )
}