"use client";
import { useUser } from '@/context/usercontext';
import Footer from '@/components/footer/footer.jsx';
import { IconEdit } from '@/components/actionbuttons/actionbuttons';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import apiClient from '@/functions/apiClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditarPerfil() {
    const { user } = useUser();
    const [emails, setEmails] = useState([]);
    const [showPassword, setShowPassword] = useState(false); // <- estado de visibilidade da senha
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [backgroundUrl, setBackgroundUrl] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await apiClient.getUserImages();
                if (data.avatar) setAvatarUrl(data.avatar);
                if (data.background) setBackgroundUrl(data.background);
            } catch (error) {
                console.error("Erro ao buscar imagens:", error);
            }
        };
        fetchImages();
    }, []);

    const handleFileChange = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            toast.error("Formato inválido! Use JPG, JPEG, PNG ou GIF.");
            e.target.value = ''; 
            return;
        }

        if (file.size > maxSize) {
            toast.error("O arquivo excede o limite de 5MB.");
            e.target.value = ''; 
            return;
        }

        const formData = new FormData();
        formData.append(type === 'background' ? 'background' : 'avatar', file);

        try {
            let response;
            if (type === 'background') {
                response = await apiClient.uploadBackground(formData);
                setBackgroundUrl(response.path);
            } else {
                response = await apiClient.uploadAvatar(formData);
                setAvatarUrl(response.path);
            }
            
            const msg = type === 'background' ? "Imagem de fundo atualizada!" : "Avatar atualizado!";
            toast.success(msg);
        } catch (error) {
            console.error("Erro no upload:", error);
            toast.error("Erro ao atualizar imagem.");
        }
    };

    return (
        <>
            <main 
                className="flex flex-col md:flex-row justify-center items-center min-h-[80vh] w-full px-4 transition-all duration-500"
                style={{
                    backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className={`flex flex-col md:flex-row w-full max-w-5xl gap-8 items-center justify-between p-8 rounded-3xl ${backgroundUrl ? 'bg-white/80 backdrop-blur-sm shadow-2xl' : ''}`}>

                    {/* Coluna da Esquerda: Uploads de Imagem */}
                    <div className="flex flex-col gap-10 w-full md:basis-1/2">
                        
                        {/* Avatar Upload */}
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
                            {avatarUrl ? (
                                <img 
                                    src={avatarUrl} 
                                    alt="Avatar" 
                                    className="w-[120px] h-[120px] rounded-full object-cover border-2 border-[#5768FF]"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="120"
                                    height="120"
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
                            )}

                            <div className="flex flex-col gap-2 items-center sm:items-start">
                                <span className="font-bold text-[#5768FF]">Logo do Usuário</span>
                                <label 
                                    htmlFor="avatar-upload" 
                                    className="cursor-pointer bg-[#5768FF] text-white px-6 py-2 rounded-[15px] shadow-md hover:bg-[#4555d6] transition-colors font-bold text-sm"
                                >
                                    Escolher Logo
                                </label>
                                <input 
                                    id="avatar-upload"
                                    type="file" 
                                    accept=".jpg, .jpeg, .png, .gif"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, 'avatar')}
                                />
                                <span className="text-xs text-gray-500 font-medium">
                                    Max: 5MB
                                </span>
                            </div>
                        </div>

                        {/* Background Upload */}
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
                            {backgroundUrl ? (
                                <img 
                                    src={backgroundUrl} 
                                    alt="Background" 
                                    className="w-[120px] h-[80px] rounded-md object-cover border-2 border-[#5768FF]"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="120"
                                    height="80" 
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#5768FF"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            )}

                            <div className="flex flex-col gap-2 items-center sm:items-start">
                                <span className="font-bold text-[#5768FF]">Imagem de Plano</span>
                                <label 
                                    htmlFor="bg-upload" 
                                    className="cursor-pointer bg-[#5768FF] text-white px-6 py-2 rounded-[15px] shadow-md hover:bg-[#4555d6] transition-colors font-bold text-sm"
                                >
                                    Escolher Fundo
                                </label>
                                <input 
                                    id="bg-upload"
                                    type="file" 
                                    accept=".jpg, .jpeg, .png, .gif"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, 'background')}
                                />
                                <span className="text-xs text-gray-500 font-medium">
                                    Max: 5MB
                                </span>
                            </div>
                        </div>

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
