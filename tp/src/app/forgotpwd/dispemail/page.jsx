'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Certifique-se de ter js-cookie instalado
import Link from 'next/link';
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const router = useRouter();

  useEffect(() => {
    // Pega o email do cookie definido pelo middleware
    const emailCookie = Cookies.get('reset_email');
    
    if (emailCookie) {
      setEmail(emailCookie);
      console.log('Email recuperado do cookie:', emailCookie);
    } else {
      setMensagem({ texto: 'Sessão expirada ou inválida. Tente solicitar o link novamente.', tipo: 'erro' });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem({ texto: '', tipo: '' });

    if (!email) {
      setMensagem({ texto: 'Email não identificado. Reinicie o processo.', tipo: 'erro' });
      return;
    }

    if (novaSenha.length < 6) {
      setMensagem({ texto: 'A senha deve ter no mínimo 6 caracteres.', tipo: 'erro' });
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem({ texto: 'As senhas não coincidem.', tipo: 'erro' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/modsenha`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          novaSenha: novaSenha
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem({ texto: 'Senha alterada com sucesso! Redirecionando...', tipo: 'sucesso' });
        // Limpa o cookie de reset
        Cookies.remove('reset_email');
        
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setMensagem({ texto: data.message || 'Erro ao alterar senha.', tipo: 'erro' });
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem({ texto: 'Erro de conexão com o servidor.', tipo: 'erro' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Redefinir Senha</h2>
        
        {email && <p className="text-sm text-gray-600 mb-4 text-center">Definindo nova senha para: <strong>{email}</strong></p>}

        {mensagem.texto && (
          <div className={`p-3 mb-4 rounded ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {mensagem.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Nova Senha</label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirmar Nova Senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
              placeholder="Repita a senha"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className={`w-full py-2 px-4 rounded text-white font-bold transition-colors ${
              loading || !email ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Alterando...' : 'Alterar Senha'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-blue-500 hover:underline">
                Voltar para o Login
            </Link>
        </div>
      </div>
    </div>
  );
}