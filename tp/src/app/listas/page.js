import '../../estilos/listas.css'

export default function Listas() {
    return (
        <>
            <header>
                <div class="cliente">EU</div>
                <picture>
                    <img src="../img/icon.png" alt="simbolo de icone de perfil"/>
                </picture>
            </header>
            <div class="corpo">
                <h1 class="titulo">
                    LISTAS
                </h1>
            </div>
            <main>
                <div class="box">
                    <p class="task">
                        Comprar
                    </p>
                </div>
            </main>
            <footer>
                <picture class="options">
                    <img src="../img/home.png" alt="" onclick="home()"/>
                    <img src="../img/3s.png" alt="" onclick="listas()"/>
                    <img src="../img/calendario.png" alt=""/>
                    <img src="../img/engrenagem.png" alt="" onclick="config()"/>
                </picture>
            </footer>
            </>
)
}