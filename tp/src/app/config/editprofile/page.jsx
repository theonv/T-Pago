"use client";

import { useUser } from '@/context/usercontext'; // Adjust the path as needed
import Footer from '@/components/footer/footer.jsx';
import LapisBranco from '@/components/lapis/page.jsx';

export default function EditarPerfil() {
    const { user } = useUser();
    return (
        <>
            <main className="flex flex-row justify-center items-center min-h-[80vh] w-full">
                {/* Lado esquerdo: Logo grande em larga escala */}
                <div className="flex-1 flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 24 24" fill="none" stroke="#5768FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="10" r="3"></circle>
                        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                    </svg>
                </div>
                {/* Lado direito: Dados do usuário */}
                <div className="flex-1 flex flex-col items-center justify-center gap-10">
                    <div className="w-[400px] h-[80px] bg-[#5768FF] rounded-[15px] flex items-center justify-between px-8 mb-8 shadow-lg">
                        <span className="text-white font-bold text-lg">EMAIL</span>
                        <span className="text-white text-xl font-mono">{user?.email || '---'}</span>
                        <LapisBranco />
                    </div>
                    <div className="w-[400px] h-[80px] bg-[#5768FF] rounded-[15px] flex items-center justify-between px-8 shadow-lg">
                        <span className="text-white font-bold text-lg">SENHA</span>
                        <span className="text-white text-xl font-mono">{user?.senha || "---"}</span>
                        <LapisBranco />
                    </div>
                </div>
            </main>
            <Footer className="absolute bottom-0 left-0 right-0" />
        </>
    )
}
