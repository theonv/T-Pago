'use client';
import { useUser } from '@/context/usercontext';
import { verify } from '../functions/verify.js';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    
    const email = event.target.email.value;
    const senha = event.target.senha.value;
    
    try {
      const jwt = await verify({ email, senha });
      
      console.log(' Token recebido, fazendo login...');
      await login(jwt);
      window.location.href = '/home';
    } catch (error) {
      console.error(' Erro no login:', error);
      setError(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
      setLoading(false);
    }
  };

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
            Tá <span className="text-blue-700">Pago</span>
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            Entre para organizar sua rotina
          </p>
        </header>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block mb-1 font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="seuemail@exemplo.com"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
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

          {/* Senha */}
          <div className="relative">
            <label htmlFor="senha" className="block mb-1 font-medium text-black">
              Senha
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="senha"
              name="senha"
              required
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
              autoComplete="current-password"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>

          {/* Mostrar senha */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="showPassword" className="text-gray-900 select-none cursor-pointer">                                       
              Mostrar senha
            </label>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-xl font-semibold transition hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          <Link href="forgotpwd" className="text-blue-600 hover:underline">
            Esqueci minha senha
          </Link>
          <p>
            Não tem uma conta?{' '}
            <Link href="register" className="text-blue-600 hover:underline font-semibold">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}