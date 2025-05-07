import Footer from '@/componentes/footer/footer'
import '../../estilos/notification.css'
import Header from '@/componentes/header/page'

export default function Notification() {
    return (
        <>
            <Header />
            <div class="corpo">
                <h1 class="titulo">
                    NOTIFICAÇÕES
                </h1>
            </div>
            <main>
                <div>
                    <div class="box">
                        <p class="conf">
                            LEMBRETE DE ATIVIDADE
                        </p>
                        <label class="switch">
                            <input type="checkbox" id="toggle1" checked />
                            <span class="slider round"></span>
                        </label>
                    </div><br />
                    <div class="box">
                        <p class="conf">
                            LEMBRETE DE DATA
                        </p>
                        <label class="switch">
                            <input type="checkbox" id="toggle2" checked />
                            <span class="slider round"></span>
                        </label>
                    </div><br />
                    <div class="box">
                        <p class="conf">
                            SOM DO LEMBRETE
                        </p>
                        <label class="switch">
                            <input type="checkbox" id="toggle3" checked />
                            <span class="slider round"></span>
                        </label>
                    </div><br />
                    <div class="box">
                        <p class="conf">
                            VIBRAÇÃO
                        </p>
                        <label class="switch">
                            <input type="checkbox" id="toggle4" checked />
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
            </main>
            <Footer/>
                </>
    )
}