'use client';
import '../../styles/header.css'
import { useUser } from '@/context/usercontext';

export default function Header() {
    const { user} = useUser();
    return (
        <header className='m-3'>
            <div className="cliente">{user.email}</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
            </svg>
        </header>
    )
}