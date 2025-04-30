import '../../estilos/listas.css'
import Footer from '../../componentes/footer/footer.jsx'

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
            <Footer/>
            </>
)
}