"use client";
import { useUser } from '@/context/usercontext';
import Footer from '@/components/footer/footer.jsx';
import { IconEdit } from '@/components/actionbuttons/actionbuttons';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditarPerfil() {
    const { user } = useUser();
    const [emails, setEmails] = useState([]);
    const [showPassword, setShowPassword] = useState(false); // <- estado de visibilidade da senha

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
                        <div
                            className="w-full bg-[#5768FF] rounded-[15px] flex items-center px-4 py-4 shadow-md relative  "
                        >
                            {/* EMAIL fixo à esquerda */}
                            <span className="text-white font-bold text-sm sm:text-base">
                                EMAIL
                            </span>

                            {/* Email centralizado */}
                            <span
                                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm sm:text-lg font-mono truncatemax-w-[60%]  /* evita overflow */text-center"
                            >
                                {user?.email}
                            </span>

                            {/* Ícone fixo à direita */}
                            <span className="ml-auto text-white">
                                <IconEdit />
                            </span>
                        </div>



                        {/* SENHA */}
                        <div className="w-full bg-[#5768FF] rounded-[15px] flex items-center px-4 py-4 shadow-md relative">
                            {/* SENHA fixo à esquerda */}
                            <span className="text-white font-bold text-sm sm:text-base">
                                SENHA
                            </span>

                            {/* Senha centralizada */}
                            <span
                                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm sm:text-lg font-mono truncatemax-w-[60%]  /* para evitar overflow */ text-center"
                            >
                                {showPassword ? user?.senha : '*'.repeat(user?.senha?.length || 8)}
                            </span>

                            {/* Container ícones no final, com gap entre eles */}
                            <div className="ml-auto flex items-center space-x-4">
                                {/* Botão ver senha */}
                                <button onClick={() => setShowPassword(prev => !prev)} aria-label="Mostrar senha">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 15c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </button>

                                {/* Ícone editar */}
                                <span className="text-white">
                                    <Link
                                        href="/"
                                        className="underline text-blue-600 hover:text-blue-900 text-sm"
                                    >
                                       <IconEdit/>
                                    </Link>
                                </span>
                            </div>
                        </div>


                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
