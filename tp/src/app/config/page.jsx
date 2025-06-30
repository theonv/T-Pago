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
                        <div className="box flex items-center justify-between" id="editarPerfil">
                            <p className="conf">
                                EDITAR PERFIL
                            </p>
                            {/* Ícone de lápis usando SVG e Tailwind */}
                            <span className="ml-2 flex items-center justify-end w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke=""
                                    className="w-6 h-6 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4.182.545.545-4.182 13-13z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </Link>
                    <Link href="/config/notifications">
                        <div className="box" id="notificacoes">
                            <p className="conf">
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