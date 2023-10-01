import './index.scss';
import Logo from '../assets/fonts/images/logo.png';

export default function Cabecalho(){
    return(
        <>
            <div className="container_cabecalho">
                <img src={Logo} />
                <p>Instituto Nossa Senhora de Fátima</p>
            </div>
        </>
    )
}