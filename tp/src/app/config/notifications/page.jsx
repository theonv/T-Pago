import Footer from '@/components/footer/footer'
import './notification.css'
import Header from '@/components/header/page'
import LapisBranco from '@/components/lapis/page'

export default function Notification() {
    return (
        <>
            <Header />
            <div className="corpo">
                <h1 className="text-2xl font-bold text-[var(--foreground)] h-[10vh] flex justify-center items-center">
                    NOTIFICAÇÕES
                </h1>
            </div>
            <main>
                <div>
                    <div className="box">
                        <p className="conf">
                            LEMBRETE DE ATIVIDADE
                        </p>
                        <label className="switch">
                            <input type="checkbox" id="toggle1" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                    </div><br />
                    <div className="box">
                        <p className="conf">
                            LEMBRETE DE DATA
                        </p>
                        <label className="switch">
                            <input type="checkbox" id="toggle2" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                    </div><br />
                    <div className="box">
                        <p className="conf">
                            SOM DO LEMBRETE
                        </p>
                        <label className="switch">
                            <input type="checkbox" id="toggle3" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                    </div><br />
                    <div className="box">
                        <p className="conf">
                            VIBRAÇÃO
                        </p>
                        <label className="switch">
                            <input type="checkbox" id="toggle4" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                    </div> <br />
                    <div className='box'>
                        <p className='conf'>
                            EDITAR SOM DO LEMBRTE
                        </p>
                        <LapisBranco/>
                    </div>
                </div>
            </main>
            <Footer/>
                </>
    )
}