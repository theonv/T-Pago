import './lists.css'
import Footer from '../../components/footer/footer.jsx'
import Header from '@/components/header/page'

export default function Listas() {
    return (
        <>
            <Header />
                <h1 className="titulo">
                    LISTAS
                </h1>
            <main>
                <div className="box">
                    <p className="task">
                        Comprar
                    </p>
                </div>
            </main>
            <Footer />
        </>
    )
}