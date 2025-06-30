import './editprofile.css'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/page'

export default function EditarPerfil() {
    return (
        <>
            <Header />
    <div className="corpo">
        <h1 className="text-2xl font-bold text-[var(--foreground)] h-[10vh] flex justify-center items-center">
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