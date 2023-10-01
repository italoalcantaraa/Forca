import { useEffect, useState } from "react";
import "./index.scss";

import Cabecalho from "../cabecalho/index.js";
import Seta from '../assets/images/seta.png';

import Forcao from '../assets/images/forca.png';
import Forca1 from '../assets/images/forca01.png';
import Forca2 from '../assets/images/forca02.png';
import Forca3 from '../assets/images/forca03.png';
import Forca4 from '../assets/images/forca04.png';
import Forca5 from '../assets/images/forca05.png';
import Forca6 from '../assets/images/forca06.png';
import JogarDnv from '../assets/images/jogarNovamente.gif';
import Reiniciar from '../assets/images/reiniciar.png';

export default function Forca() {

    let [palavraSecreta, setPalavraSecreta] = useState('');
    let [dica, setDica] = useState('');
    const [opcao, setOpcao] = useState('inicial');
    const [tentativas, setTentativas] = useState(6);
    const [desabilitarTeclado, SetDesabilitarTeclado] = useState(true);
    const [jogoOn, setJogoOn] = useState(false);
    const [botaoVisivel, setBotaoVisivel] = useState(true);
    const [letraDigitada, setLetraDigitada] = useState('');
    const [resultado, setResultado] = useState(null);
    const refreshPage = () => { window.location.reload();};
    const [palavras, setPalavras] = useState([
        {
            nome: 'BANANA',
            dica: 'Fruta'
        },
        {
            nome: 'MELANCIA',
            dica: 'Fruta'
        },
        {
            nome: 'PERA',
            dica: 'Fruta'
        },
        {
            nome: 'NIKE',
            dica: 'Marca de Roupa'
        },
        {
            nome: 'FIAT',
            dica: 'Marca de Carro'
        },
        {
            nome: 'FREI',
            dica: 'Instituição'
        },
        {
            nome: 'INFORMATICA',
            dica: 'Tema deste curso'
        },
        {
            nome: 'URUGUAI',
            dica: 'País'
        },
        {
            nome: 'GOIABA',
            dica: 'Fruta'
        },
        {
            nome: 'ALEMANHA',
            dica: 'País'
        },
        {
            nome: 'ARGENTINA',
            dica: 'País'
        },
        {
            nome: 'ASIA',
            dica: 'Continente'
        },
        {
            nome: 'POMBA',
            dica: 'Ave'
        },
        {
            nome: 'CORUJA',
            dica: 'Ave'
        },
    ]);

    const teclado = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    function SortearPalavra() {
        if (botaoVisivel == true) {
            for (let pos = 0; pos <= palavras.length; pos++) {
                let sortear = Math.floor(Math.random() * palavras.length);

                dica = palavras[sortear].dica;
                palavraSecreta = palavras[sortear].nome;
            }
            setDica(dica);
            setPalavraSecreta(palavraSecreta);
            setBotaoVisivel(false);
            setTentativas(6);
            setJogoOn(true);
            setResultado(null)
        }
    }
    function ImgForca() {
        switch (tentativas) {
            case 0:
                return Forca6;
            case 1:
                return Forca5;
            case 2:
                return Forca4;
            case 3:
                return Forca3;
            case 4:
                return Forca2;
            case 5:
                return Forca1;
            case 6:
                return Forcao
        }
    }

    function verificarLetra(letra) {
        if (!palavraSecreta.includes(letra)) {
            setTentativas(tentativas - 1);
        }
        if (tentativas === 1) {
            setOpcao('perdeu');
        }

        //passar os caracters para um array
        const letrasPalavra = palavraSecreta.split('');
        const letrasAdivinhadas = letrasPalavra.filter((letter) => letraDigitada.includes(letter));

        if (letrasAdivinhadas.length === letrasPalavra.length - 1) {
            setOpcao("venceu");
            setJogoOn(false);
            return;
        } else if (tentativas === 0) {
            setOpcao("perdeu")
            setResultado('perdeu');
            setOpcao('jogarNovamente');
            setJogoOn(false);
        }

    }

    function letraUsada(letra) {
        return letraDigitada.includes(letra);
    }

    return (
        <>
            <div className="container_forca">
                <Cabecalho />
                {opcao == 'inicial' &&
                    <>
                        <div className="forca">
                            <img style={{ marginTop: '40px' }} src="./forca.png" />

                        </div>
                        <div className="inicial">
                            <h1> Bem-vindo ao jogo da Forca</h1>
                            <div onClick={() => setOpcao('letra')}>
                                <a  >Iniciar</a>
                                <img src={Seta} />
                            </div>
                        </div>
                    </>
                }

                {opcao == 'letra' &&
                    <>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '80px' }}>
                            <img className="forca" style={{ width: '200px' }} src={ImgForca()} />
                            <p style={{ fontSize: '30px', marginLeft: '50px', fontWeight: '600' }}>{dica}</p>
                        </div>

                        <div className="letra">
                            <h1 id="palavraSecreta">{palavraSecreta.split('').map((letter, index) => (
                                <span id="border"
                                    style={{
                                        borderBottom: '0.2em  solid black',
                                        margin: '5px',
                                        height: "50px",
                                        fontSize: '40px'
                                    }}
                                    key={index}>

                                    <span style={{ visibility: letraDigitada.includes(letter)? 'visible' : "hidden", padding: '0px 20px'}}>
                                        {letter}</span>
                                </span>
                            ))}</h1>

                            <div className="teclado"> {teclado.map((item) => (
                                <button key={item}
                                    onClick={() => {
                                        if (jogoOn && !letraDigitada.includes(item)) {
                                            setLetraDigitada([...letraDigitada, item]);
                                            verificarLetra(item);
                                        }
                                    }}
                                    disabled={letraUsada(item)}
                                    style={{
                                        backgroundColor: letraDigitada.includes(item) ? 'rgba(71, 71, 71)' : '',
                                        border: letraDigitada.includes(item) ? 'none' : '',
                                    }}
                                >{item}</button>

                            ))}
                                <button id="sortear" style={{ display: botaoVisivel !== true && 'none'}}
                                    onClick={SortearPalavra}> Sortear</button>
                            </div>
                        </div>
                    </>
                }
                {opcao == 'venceu' &&
                    <div className="venceu">
                        <div className="conteudo">
                            <h1>Você ganhou!</h1>
                            <div onClick={refreshPage}>
                                <a>Reiniciar</a>
                                <img src={Reiniciar} />
                            </div>
                        </div>
                    </div>
                }
                {opcao == 'perdeu' &&
                    <div className="perdeu">
                        <div className="conteudo">
                            <h1>Desculpe, você falhou.</h1>
                            <div onClick={refreshPage}>
                                <a >Reiniciar</a>
                                <img src={Reiniciar} />
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}