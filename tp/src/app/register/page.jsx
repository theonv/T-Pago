'use client';
import Link from 'next/link';
import Image from 'next/image';
import { create } from '../../functions/create.js';

export default function Register() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] border-2 border-foreground rounded-[10px] px-6 py-10 flex flex-col items-center font-['Roboto']">
        
        <header>
          <h1 className="text-center text-3xl sm:text-[36px] font-bold">
            CADASTRE <span className="text-[var(--corSecundaria)]">-SE</span>
          </h1>
        </header>

        <section className="flex justify-center my-5">
          <Image
            src="/img/Logo.png"
            alt="Logo Tá Pago"
            width={400}
            height={400}
            className="w-full max-w-[120px] sm:max-w-[150px] h-auto"
          />
        </section>

        <form onSubmit={create} className="w-full mt-8">
          <div className="w-full max-w-[90%] mx-auto space-y-6">
            <div className="h-[50px]">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className="w-full h-full bg-transparent border-2 border-foreground rounded-full text-[16px] text-[var(--corSecundaria)] px-5 placeholder:text-[#0059ff8f] focus:outline-none"
              />
            </div>

            <div className="h-[50px]">
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Crie uma senha"
                required
                className="w-full h-full bg-transparent border-2 border-foreground rounded-full text-[16px] text-[var(--corSecundaria)] px-5 placeholder:text-[#0059ff8f] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 border border-[var(--corSecundaria)] rounded-full text-[16px] text-white bg-[#0059ff] hover:bg-[#0400ff] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Crie
            </button>
          </div>
        </form>

        <div className="w-full flex flex-col items-center space-y-4 mt-6">
          <div className="text-center">
            <Link
              href="/"
              className="underline text-blue-600 hover:text-blue-900 text-sm"
            >
              Já tenho uma conta
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}