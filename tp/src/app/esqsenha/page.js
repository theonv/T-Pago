import '../../estilos/login.css';

export default function EsqueciSenha() {
  return (
    <>
      <main class="container">
        <form>
            <h1 id="titulo">MUDAR <span className="titulo-color">SENHA</span></h1>
            <picture class="logo">
                <img src="../img/Logo.png" alt="Logo Tá Pago"/>
            </picture>
            <div class="input"> 
                <input type="text" name="" id="email" placeholder="Nova senha" required/>
            </div>
            <div class="input">
                <input type="text" name="" id="senha" placeholder="Digite Novamente" required/>
            </div>
            <div class="recuperar">
                <a href="/">Lembrei minha senha</a>
            </div>
            <button onclick="novasenha()" type="submit">Altere</button>
        </form>
    </main>
    </>
  );
}