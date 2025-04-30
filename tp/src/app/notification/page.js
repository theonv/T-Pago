import '../../estilos/notification.css'

export default function Notification() {
    return (
        <>
            <header>
                <div class="cliente">EU</div>
                <picture>
                    <img src="../img/icon.png" alt="simbolo de icone de perfil"/>
                </picture>
            </header>
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
                            <input type="checkbox" id="toggle1" checked/>
                                <span class="slider round"></span>
                        </label>
                    </div><br/>
                        <div class="box">
                            <p class="conf">
                                LEMBRETE DE DATA
                            </p>
                            <label class="switch">
                                <input type="checkbox" id="toggle2" checked/>
                                    <span class="slider round"></span>
                            </label>
                        </div><br/>
                            <div class="box">
                                <p class="conf">
                                    SOM DO LEMBRETE
                                </p>
                                <label class="switch">
                                    <input type="checkbox" id="toggle3" checked/>
                                        <span class="slider round"></span>
                                </label>
                            </div><br/>
                                <div class="box">
                                    <p class="conf">
                                        VIBRAÇÃO
                                    </p>
                                    <label class="switch">
                                        <input type="checkbox" id="toggle4" checked/>
                                            <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </main>
                        <footer>
                            <picture class="options">
                                <img src="../img/home.png" alt="" onclick="home()"/>
                                <img src="../img/3s.png" alt="" onclick="listas()"/>
                                <img src="../img/calendario.png" alt=""/>
                                <img src="../img/engrenagem.png" alt="" onclick="config()"/>
                                            </picture>
                                        </footer>
                                    </>
                                    )
}