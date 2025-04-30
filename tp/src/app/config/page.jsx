import '../../estilos/config.css'
import Footer from '../../componentes/footer/footer.jsx'

export default function Config() {
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
            CONFIGURAÇÕES
        </h1>
    </div>
    <main>
        <div>
            <div class="box" id="editarPerfil">
                <p class="conf">
                    EDITAR PERFIL
                </p>
                <div class="icon pencil-icon"></div>
            </div>
            <div class="box" id="notificacoes">
                <p class="conf">
                    NOTIFICAÇÕES
                </p>
                <div class="icon bell-icon"></div>
            </div>
        </div>
    </main>
    <Footer/>

    <script>
        document.getElementById('editarPerfil').addEventListener('click', function() {
            window.location.href = "editarperfil.html"
        });
        
        document.getElementById('notificacoes').addEventListener('click', function() {
            window.location.href = "notification.html"
        });
    </script>
        </>
    )
}