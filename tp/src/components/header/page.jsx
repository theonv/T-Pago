'use client';
import { useUser } from '@/context/usercontext';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { user, logout } = useUser();
    const router = useRouter();
    if (!user) return null;

    const handleLogout = () => {
        setTimeout(() => {
            logout();
        }, 1500);
        router.push('/');
    };

    return (
        <header className="w-full px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 shadow-xl rounded-b-2xl backdrop-blur-md transition-all duration-500">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Perfil à esquerda */}
                <div className="flex items-center gap-3 animate-slide-in">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-sm"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="10" r="3" />
                        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                    </svg>
                    <span className="text-white font-medium text-sm bg-white/20 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
                        {user.email}
                    </span>
                </div>

                {/* Botão sair à direita */}
                <div className="animate-slide-in">
                    <button
                        onClick={handleLogout}
                        className="text-white text-sm font-semibold bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-sm transition-all duration-200"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
}
