import '../../styles/login.css';

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
            <picture className="logo">
                <img src="../img/Logo.png" alt="Logo Tá Pago"/>
            </picture>
            <div className="input"> 
                <input type="text" id="email" placeholder="Nova senha" required/>
            </div>
            <div className="input">
                <input type="text" id="senha" placeholder="Digite Novamente" required/>
            </div>
            <div className="recuperar">
                <a href="/">Lembrei minha senha</a>
            </div>
            <button type="submit">Altere</button>
        </form>
      </main>
    </>
  );
}