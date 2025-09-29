import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/usercontext";
import { AuthProvider } from "./AuthProvider";
import RouteGuard from '@/components/RouteGuard';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tá Pago",
  description: "Site de Gerenciamento de Tempo e Tarefas do usuario",
  icon: {
    icon: '/img/Logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
          <AuthProvider>
            <RouteGuard />
            {children}
          </AuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}