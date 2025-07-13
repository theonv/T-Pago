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

            <main className="h-[40vh] flex justify-center items-center">
                <div className="grid grid-cols-1">
                    <Link href="/config/editprofile">
                        <div className="w-[400px] h-[50px] bg-[#5768FF] rounded-[15px] flex justify-between items-center px-5 mb-3 cursor-pointer transition duration-300 hover:bg-[#4456ee] hover:-translate-y-0.5 active:translate-y-[1px] shadow-md">
                            <p className="text-white font-bold text-[1.1em] ml-[10px] mr-[160px]">
                                EDITAR PERFIL
                            </p>
                            <LapisBranco />
                        </div>
                    </Link>

                    <Link href="/config/notifications">
                        <div className="w-[400px] h-[50px] bg-[#5768FF] rounded-[15px] flex justify-between items-center px-5 mb-3 cursor-pointer transition duration-300 hover:bg-[#4456ee] hover:-translate-y-0.5 active:translate-y-[1px] shadow-md">
                            <p className="text-white font-bold text-[1.1em] ml-[10px]">
                                NOTIFICAÇÕES
                            </p>
                            <svg
                                style={{ stroke: 'white' }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-[30px] h-[30px] flex justify-center items-center"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                />
                            </svg>
                        </div>
                    </Link>
                </div>
            </main>

            <Footer />
        </>
    )
}