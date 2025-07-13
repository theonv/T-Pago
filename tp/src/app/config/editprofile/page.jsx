"use client";
import { useUser } from '@/context/usercontext';
import Footer from '@/components/footer/footer.jsx';
import LapisBranco from '@/components/lapis/page.jsx';

export default function EditarPerfil() {
    const { user } = useUser();

    return (
        <>
            <main className="flex flex-col md:flex-row justify-center items-center min-h-[80vh] w-full px-4">
                <div className="flex flex-col md:flex-row w-full max-w-5xl gap-8 items-center justify-between">
                    {/* Ícone do usuário */}
                    <div className="flex justify-center md:justify-start md:basis-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="180"
                            height="180"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#5768FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="10" r="3" />
                            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                        </svg>
                    </div>

                    {/* Informações do usuário */}
                    <div className="flex flex-col gap-6 w-full md:basis-1/2 max-w-[400px]">
                        {/* EMAIL */}
                        <div className="w-full bg-[#5768FF] rounded-[15px] flex items-center justify-between px-4 py-4 shadow-md">
                            <span className="text-white font-bold text-sm sm:text-base">EMAIL</span>
                            <span className="text-white text-sm sm:text-lg font-mono truncate">{user?.email || '---'}</span>
                            <LapisBranco />
                        </div>

                        {/* SENHA */}
                        <div className="w-full bg-[#5768FF] rounded-[15px] flex items-center justify-between px-4 py-4 shadow-md">
                            <span className="text-white font-bold text-sm sm:text-base">SENHA</span>
                            <span className="text-white text-sm sm:text-lg font-mono truncate">{user?.senha || '---'}</span>
                            <LapisBranco />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}