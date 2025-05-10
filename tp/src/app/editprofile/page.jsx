import './editprofile.css'
import Footer from '../../components/Footer'
import Header from '@/components/header/page'

export default function EditarPerfil() {
    return (
        <>
            <Header />
    <div className="corpo">
        <h1 className="titulo">
            EDITAR PERFIL
        </h1>
    </div>
    <main>
        <div>
            <div className="box">
                <p className="conf">
                    NOME DE USUÁRIO
                </p>
            </div><br/>
            <div className="box">
                <p className="conf">
                    FOTO DE PERFIL
                </p>
            </div><br/>
            <div className="box">
                <p className="conf">
                    FOTO DE PERFIL
                </p>
            </div>
        </div>
    </main>
    <Footer/>
        </>
    )
}