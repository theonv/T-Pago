import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPassword() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-[420px] border-2 border-foreground rounded-[10px] p-[30px_40px] flex flex-col items-center font-['Roboto']">
          {/* A função novasenha() foi removida do onClick do botão e movida para o onSubmit do formulário. 
              Isso é a prática correta, pois o envio de formulários deve ser tratado pelo evento onSubmit, 
              garantindo melhor semântica e funcionamento, além de permitir o envio ao pressionar "Enter". 
              <form onSubmit={fase_de_desenvolvimento}> -> Só para lembrar como deve ser feito, já que a página
              ainda não foi finalizada. */}
          <form>
            <h1 className="text-center text-[36px] font-bold" id="titulo">
              MUDAR <span className="text-[var(--corSecundaria)] titulo-color">SENHA</span>
            </h1>
            <div className="flex justify-center my-5 logo">
              <Image
                src="/img/Logo.png"
                alt="Logo Tá Pago"
                width={400}
                height={400}
                placeholder="empty"
                quality={100}
                className="w-2/5 h-auto"
              />
            </div>
            <div className="w-full h-[50px] my-7 input">
              <label htmlFor="email" className="sr-only">Digite seu email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Digite seu email"
                required
                className="w-full h-full bg-transparent border-2 border-foreground rounded-full text-[16px] text-[var(--corSecundaria)] px-5 placeholder:text-[#0059ff8f] focus:outline-none"
              />
            </div>
            <div className="w-full text-right mb-4 recuperar">
              <Link
                href="/"
                className="underline text-blue-600 hover:text-blue-900 text-sm"
              >
                Lembrei minha senha
              </Link>
            </div>
            <button
              type="submit"
              className="w-full my-[30px] py-[10px] border border-[var(--corSecundaria)] rounded-full text-[16px] text-white bg-[#0059ff] hover:bg-[#0400ff] transition duration-300 ease-in-out transform hover:scale-110"
            >
              Altere
            </button>
          </form>
        </div>
      </main>
    </>
  );
}