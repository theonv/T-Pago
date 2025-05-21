import '../../styles/login.css';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPassword() {
  return (
    <>
       <main className="container">
        {/* A função novasenha() foi removida do onClick do botão e movida para o onSubmit do formulário. 
        Isso é a prática correta, pois o envio de formulários deve ser tratado pelo evento onSubmit, 
        garantindo melhor semântica e funcionamento, além de permitir o envio ao pressionar "Enter". 
        <form onSubmit={fase_de_desenvolvimento}> -> Só para lembrar como deve ser feito, já que a página
        ainda não foi finalizada. */}
        <form>
            <h1 id="titulo">MUDAR <span className="titulo-color">SENHA</span></h1>
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
                <input type="text" id="email" placeholder="Digite seu email" required/>
            </div>
            <div className="recuperar">
                <Link href="/" className="underline text-blue-600 hover:text-blue-900">Lembrei minha senha</Link>
            </div>
            <button className="button" type="submit">Altere</button>
        </form>
      </main>
    </>
  );
}