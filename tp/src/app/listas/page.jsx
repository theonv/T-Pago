import '../../estilos/listas.css'
import Footer from '../../componentes/footer/footer.jsx'
import Header from '@/componentes/header/page'

export default function Listas() {
    return (
        <>
            <Header />
                <h1 className="titulo">
                    LISTAS
                </h1>
            <main>
                <div class="box">
                    <p class="task">
                        Comprar
                    </p>
                </div>
            </main>
            <Footer />
        </>
    )
}