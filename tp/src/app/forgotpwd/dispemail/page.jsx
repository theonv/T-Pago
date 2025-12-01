'use client';
import { useState } from 'react';
import Image from 'next/image'

export default function resetpassword() {
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!senha || !confirmaSenha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmaSenha) {
      setError('As senhas não coincidem.');
      return;
    }


    setSuccess('Senha alterada com sucesso!');
    setSenha('');
    setConfirmaSenha('');
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] border-2 border-foreground rounded-[10px] px-6 py-10 flex flex-col items-center font-['Roboto']">
        <header>
          <h1 className="text-center text-3xl sm:text-[36px] font-bold">
            CRIAR <span className="text-[var(--corSecundaria)]">NOVA SENHA</span>
          </h1>
        </header>

        <section className="flex justify-center my-5">
          <Image
            src="/img/Logo.png"
            alt="Logo Tá Pago"
            width={100}
            height={100}
            className="mb-4 rounded-full shadow-lg"
          />
        </section>

        <form id="formResetPassword" onSubmit={handleSubmit} className="w-full mt-8">
          <div className="w-full max-w-[90%] mx-auto space-y-6">
            <div className="h-[50px]">
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Nova senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={6}
                className="w-full h-full bg-transparent border-2 border-foreground rounded-full text-[16px] text-[var(--corSecundaria)] px-5 placeholder:text-[#0059ff8f] focus:outline-none"
              />
            </div>

            <div className="h-[50px]">
              <input
                type="password"
                id="confirmaSenha"
                name="confirmaSenha"
                placeholder="Confirmar nova senha"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                required
                minLength={6}
                className="w-full h-full bg-transparent border-2 border-foreground rounded-full text-[16px] text-[var(--corSecundaria)] px-5 placeholder:text-[#0059ff8f] focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            {success && (
              <p className="text-green-600 text-sm text-center">{success}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 border border-[var(--corSecundaria)] rounded-full text-[16px] text-white bg-[#0059ff] hover:bg-[#0400ff] transition duration-300 ease-in-out transform hover:scale-105"
            >
              Alterar senha
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}