import '../../estilos/editarperfil.css'

export default function EditarPerfil() {
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
            EDITAR PERFIL
        </h1>
    </div>
    <main>
        <div>
            <div class="box">
                <p class="conf">
                    NOME DE USUÁRIO
                </p>
            </div><br/>
            <div class="box">
                <p class="conf">
                    FOTO DE PERFIL
                </p>
            </div><br/>
            <div class="box">
                <p class="conf">
                    FOTO DE PERFIL
                </p>
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