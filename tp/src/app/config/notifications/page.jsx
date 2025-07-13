import Footer from '@/components/footer/footer'
import Header from '@/components/header/page'
import LapisBranco from '@/components/lapis/page'

export default function Notification() {
    return (
        <>
            <Header />

            {/* Título */}
            <div className="h-[10vh] flex justify-center items-center px-4">
                <h1 className="text-2xl font-bold text-[var(--foreground)] text-center w-full max-w-5xl">
                    NOTIFICAÇÕES
                </h1>
            </div>

            {/* Conteúdo */}
            <main className="flex justify-center items-center px-4 py-4">
                <div className="w-full max-w-5xl flex flex-col items-center gap-3">

                    {/* Itens com toggle */}
                    {[
                        "LEMBRETE DE ATIVIDADE",
                        "LEMBRETE DE DATA",
                        "SOM DO LEMBRETE",
                        "VIBRAÇÃO",
                    ].map((text, i) => (
                        <div
                            key={i}
                            className="w-full max-w-[300px] bg-[#5768FF] rounded-[15px] flex items-center px-4 py-3 shadow-md"
                        >
                            {/* Texto */}
                            <div className="text-white font-bold text-sm sm:text-base leading-tight w-[70%] break-words">
                                {text}
                            </div>

                            {/* Toggle fixo */}
                            <label className="relative inline-block w-[50px] h-[28px] sm:w-[60px] sm:h-[30px] ml-auto">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="opacity-0 w-0 h-0 peer"
                                />
                                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition duration-400 rounded-[34px] peer-checked:bg-[#2196F3] peer-focus:ring-2 peer-focus:ring-blue-400"></span>
                                <span className="absolute content-[''] h-[20px] w-[20px] sm:h-[22px] sm:w-[22px] left-[4px] bottom-[4px] bg-white transition duration-400 rounded-full peer-checked:translate-x-[22px] sm:peer-checked:translate-x-[30px]"></span>
                            </label>
                        </div>
                    ))}

                    {/* Item final com ícone */}
                    <div className="w-full max-w-[300px] bg-[#5768FF] rounded-[15px] flex items-center px-4 py-3 shadow-md">
                        <div className="text-white font-bold text-sm sm:text-base leading-tight w-[70%] break-words">
                            EDITAR SOM DO LEMBRETE
                        </div>
                        <div className="ml-auto">
                            <LapisBranco />
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </>
    )
}