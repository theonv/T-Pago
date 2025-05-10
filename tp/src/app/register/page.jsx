import '../../styles/login.css';
import Image from 'next/image';

export default function Register() {
    return (
        <>
            <main className="container">
                {/* Alterado de onClick para onSubmit, pois o envio de formulário deve ser tratado pelo 
                evento onSubmit para melhor semântica e funcionamento. 
                <form onSubmit="novouser()"> -> Só para lembrar como deve ser feito, já que a página 
                ainda não foi finalizada. */}
                <form>
                    <h1 id="titulo">CADASTRE - <span className="titulo-color">SE</span></h1>
                    <div className="logo">
                        {/* O <img> foi substituído por <Image> do Next.js para aproveitar os benefícios 
                        de otimização automática de imagens, como carregamento preguiçoso (lazy loading), 
                        suporte a formatos modernos (como WebP) e melhoria no SEO. */}
                        <Image
                            src="/img/Logo.png"
                            alt="Logo Tá Pago"
                            width={120}
                            height={120}
                            placeholder="empty"
                            quality={100}
                        />
                    </div>
                    <div className = "input">
                        <input type="email" name="" id="email" placeholder="Email" required/>
                    </div>
                    <div className = "input">
                        <input type="password" name="" id="senha" placeholder="Crie uma senha" required/>
                    </div>
                    <div className = "recuperar">
                        <a href="/">Já Tenho uma conta</a>
                    </div>
                    {/* O evento onClick foi removido do botão e agora o evento onSubmit é tratado 
                    diretamente pelo formulário, garantindo que o envio do formulário seja semântico e 
                    funcione ao pressionar "Enter" ou clicar no botão. */}
                    <button type="submit">Crie</button>
                </form>
            </main>
        </>
    )
}