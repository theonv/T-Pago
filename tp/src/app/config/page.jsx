import '../../estilos/config.css'
import Footer from '../../componentes/footer/footer.jsx'
import Header from '@/componentes/header/page'

export default function Config() {
    return (
        <>
            <Header />
            <div class="corpo">
                <h1 class="titulo">
                    CONFIGURAÇÕES
                </h1>
            </div>
            <main>
                <div>
                    <div class="box" id="editarPerfil">
                        <p class="conf">
                            EDITAR PERFIL
                        </p>
                        <div class="icon pencil-icon"></div>
                    </div>
                    <div class="box" id="notificacoes">
                        <p class="conf">
                            NOTIFICAÇÕES
                        </p>
                        <div class="icon bell-icon"></div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}