import './config.css'
import Link from 'next/link'
import Footer from '../../components/footer/footer.jsx'
import Header from '@/components/header/page'

export default function Config() {
    return (
        <>
            <Header />
                <h1 className="text-2xl font-bold text-[var(--foreground)] h-[10vh] flex justify-center items-center">
                    CONFIGURAÇÕES
                </h1>
            <main>
                <div>
                    <Link href="/config/editprofile">
                    <div className="box" id="editarPerfil">
                        <p className="conf">
                            EDITAR PERFIL
                        </p>
                        <div className="icon pencil-icon"></div>
                    </div>
                    </Link>
                    <Link href ="/config/notifications">
                    <div className="box" id="notificacoes">
                        
                        
                        <p className="conf" >
                            NOTIFICAÇÕES
                        </p>
                       
                        <div className="icon bell-icon"></div>
                    </div>
                     </Link>
                </div>
            </main>
            <Footer />
        </>
    )
}