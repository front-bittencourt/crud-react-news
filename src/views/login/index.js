import React, { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msgTipo, setMsgTipo] = useState('');
    const [carregando, setCarregando] = useState(false);

    const dispatch = useDispatch();

    // Função de logar
    function signIn() {

        const requestInfo = {
            method: 'POST',
            url: 'http://localhost:3000/auth/login',
            data: JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'
            }
        };

        axios(requestInfo)
            .then(response => { 
                setCarregando(true);
                const { data } = response
                if(data) {
                    return data
                }
            }).then(token => {
                setMsgTipo('success');
                localStorage.setItem('token', token.access_token);
                setTimeout(() => {
                    setCarregando(false)
                    dispatch({type: 'LOG_IN', token: token.access_token, usuarioEmail: email});
                }, 3000)
            })
            .catch(e => {
                setMsgTipo('failed');
            })
    }

    return(
        <>
            {
                // Verificar se o usuário está logado e faz o redirecionamento
                useSelector(state => state.usuarioLogado > 0 ? <Redirect to="/" /> : null)
            }

            <form className="form">

                <h1>Login de usuário</h1>
                <input onChange={e => setEmail(e.target.value)} type="email" name="email" className="form__input" placeholder="E-mail" />
                <input onChange={e => setPassword(e.target.value)} type="password" name="senha" className="form__input" placeholder="Senha" />
                {msgTipo === 'success' && 
                    <p className="message message__success">Logado!!! Estamos te redirecionando. <span role="img" aria-label="Feliz">&#128526;</span></p>}
                {msgTipo === 'failed' && 
                    <p className="message message__error">Aconteceu algum erro, tente novamente!!! <span role="img" aria-label="Triste">&#128546;</span></p>}
                
                {carregando ?
                    <div className="text-center">
                        <Loader
                            type="Puff"
                            color="#3b9c00"
                            height={50}
                            width={50}
                            timeout={10000}
                        />
                    </div>
                :
                    <button onClick={signIn} type="button" className="form__button">Acessar</button>
                }
            </form>
        </>
    )
}

export default Login;