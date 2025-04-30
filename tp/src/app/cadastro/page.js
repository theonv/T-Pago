import '../../estilos/login.css';

export default function Cadastro() {
    return (
        <>
            <main class="container">
                <form>
                    <h1 id="titulo">CADASTRE - <span class="titulo-color">SE</span></h1>
                    <picture class="logo">
                        <img src="../img/Logo.png" alt="Logo Tá Pago"/>
                    </picture>
                    <div class="input">
                        <input type="email" name="" id="email" placeholder="Email" required/>
                    </div>
                    <div class="input">
                        <input type="email" name="" id="senha" placeholder="Crie uma senha" required/>
                    </div>
                    <div class="recuperar">
                        <a href="/">Já Tenho uma conta</a>
                    </div>
                    <button onclick="novouser()" type="submit">Crie</button>
                </form>
            </main>
        </>
    )
}