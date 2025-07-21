'use client';
import { useUser } from '@/context/usercontext';

export default function Header() {
    const { user } = useUser();
    if (!user) return null; // ou loading, ou só mostra o email

    return (
        <header className="m-3 flex justify-end items-center">
            <div className="text-base font-medium mr-4">{user.email}</div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke={"var(--foreground)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
            </svg>
        </header>
    );
}