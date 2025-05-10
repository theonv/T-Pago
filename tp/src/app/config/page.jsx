import './config.css'
import Footer from '../../components/footer/footer.jsx'
import Header from '@/components/header/page'

export default function Config() {
    return (
        <>
            <Header />
            <div className="corpo">
                <h1 className="titulo">
                    CONFIGURAÇÕES
                </h1>
            </div>
            <main>
                <div>
                    <div className="box" id="editarPerfil">
                        <p className="conf">
                            EDITAR PERFIL
                        </p>
                        <div className="icon pencil-icon"></div>
                    </div>
                    <div className="box" id="notificacoes">
                        <p className="conf">
                            NOTIFICAÇÕES
                        </p>
                        <div className="icon bell-icon"></div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}