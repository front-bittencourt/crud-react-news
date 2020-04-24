import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

// Página de Publicar Notícias também é utilizada para Editar Notícias
function PublishNews(props) {
    
    const token = localStorage.getItem('token');
    const [title, setTitle] = useState('');
    const [urlImg, setUrlImg] = useState('');
    const [description, setDescription] = useState('');
    const [msgTipo, setMsgTipo] = useState();
    const [carregando, setCarregando] = useState(false);
    const parametroUrl = props.match.params.id;
    
    // Busca a notícia pelo parametro - Edição
    useEffect(() => {
        if(parametroUrl) {
            axios.get('http://localhost:3000/news/' + parametroUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setTitle(response.data.title);
                setUrlImg(response.data.imgUrl);
                setDescription(response.data.description);
            })
            .catch(Error => console.log(Error))
        }
    }, [])

    function initialState() {
        setTitle('')
        setUrlImg('')
        setDescription('')
    }

    // Função de editar uma notiícia
    function editNews() {
        const requestInfo = {
            method: 'PUT',
            url: 'http://localhost:3000/news/' + parametroUrl,
            data: {
                title: title, 
                imgUrl: urlImg, 
                description: description,
                date: new Date().toISOString().slice(0,10).split('-').reverse().join('/'), // Coloca data em DD/MM/YY
            },
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        axios(requestInfo)
        .then(response => {
            console.log(response)
        })
        .catch(Error => console.log(Error))
    }

    // Função de publicar notítica
    function publishNews() {
        setMsgTipo('')
        const requestInfo = {
            method: 'POST',
            url: 'http://localhost:3000/news',
            data: {
                title: title, 
                imgUrl: urlImg, 
                description: description,
                date: new Date().toISOString().slice(0,10).split('-').reverse().join('/'), // Coloca data em DD/MM/YY
            },
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        axios(requestInfo)
        .then(response => {
            setCarregando(true)
            setTimeout(() => {
                setCarregando(false)
                setMsgTipo('success')
                initialState() 
            }, 2000)
        })
        .catch(Error => {
            console.log(Error)
            setMsgTipo('failed')
        })
    }

    return(
        <>
            <form className="form">
                <h1>{props.match.params.id ? 'Atualizar Notícia' : 'Publicar Notícia'}</h1>

                <input type="text" onChange={e => setTitle(e.target.value)} value={title && title} name="title" className="form__input" placeholder="Título" required/>
                <input type="text" onChange={e => setUrlImg(e.target.value)} value={urlImg && urlImg} name="urlImg" className="form__input" placeholder="URL da Imagem" required/>
                <textarea name="description" onChange={e => setDescription(e.target.value)} value={description && description} className='form__input' placeholder="Digite a descrição" rows="5" cols="43" required></textarea>

            {msgTipo === 'success' && 
                <p className="message message__success">Nóticia publicada!!! <span role="img" aria-label="Feliz">&#128526;</span></p>}
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
                    <button onClick={props.match.params.id ? editNews : publishNews} type="button" className="form__button">{props.match.params.id ? 'Atualizar' : 'Publicar'}</button>
                }
            </form>
        </>
    )
}

export default PublishNews;