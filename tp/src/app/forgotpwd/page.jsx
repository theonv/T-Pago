'use client';
import Link from 'next/link';
import Image from 'next/image';
import { e_mail } from '@/functions/email'

export default function ForgotPassword() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 px-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 space-y-8">
        {/* Logo e título */}
        <header className="flex flex-col items-center">
          <Image
            src="/img/Logo.png"
            alt="Logo Tá Pago"
            width={100}
            height={100}
            className="mb-4 rounded-full shadow-lg"
          />
          <h1 className="text-3xl font-extrabold text-gray-800">
            Recuperar <span className="text-blue-700">Senha</span>
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            Digite seu email para redefinir sua senha
          </p>
        </header>

        {/* Formulário */}
        <form onSubmit={e_mail} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="seuemail@exemplo.com"
              className="dark:text-gray-900 w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoComplete="username"
            />
            <div className="absolute left-3 top-[38px] pointer-events-none text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12h.01M12 12h.01M8 12h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z" />
              </svg>
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold transition hover:bg-blue-700"
          >
            Enviar Link de Recuperação
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          <Link href="/" className="text-blue-600 hover:underline">
            Lembrei minha senha - Voltar ao login
          </Link>
        </div>
      </div>
    </main>
  );
}