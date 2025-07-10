import './config.css'
import Link from 'next/link'
import Footer from '../../components/footer/footer.jsx'
import Header from '@/components/header/page'
import LapisBranco from '@/components/lapis/page.jsx'

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
                            <p className="conf" id='edit' >
                                EDITAR PERFIL
                            </p>
                            <LapisBranco/>
                        </div>
                    </Link>
                    <Link href="/config/notifications">
                        <div className="box" id="notificacoes">
                            <p className="conf">
                                NOTIFICAÇÕES
                            </p>
                            <svg style= {{ stroke: 'white'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    )
}