import '../../estilos/editarperfil.css'
import Footer from '../../components/Footer'
import Header from '@/componentes/header/page'

export default function EditarPerfil() {
    return (
        <>
            <Header />
    <div class="corpo">
        <h1 class="titulo">
            EDITAR PERFIL
        </h1>
    </div>
    <main>
        <div>
            <div class="box">
                <p class="conf">
                    NOME DE USUÁRIO
                </p>
            </div><br/>
            <div class="box">
                <p class="conf">
                    FOTO DE PERFIL
                </p>
            </div><br/>
            <div class="box">
                <p class="conf">
                    FOTO DE PERFIL
                </p>
            </div>
        </div>
    </main>
    <Footer/>
        </>
    )
}