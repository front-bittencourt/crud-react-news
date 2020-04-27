import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import api from '../../util/Api';

// Página de Publicar Notícias também é utilizada para Editar Notícias
function PublishNews(props) {
    
    const [title, setTitle] = useState('');
    const [urlImg, setUrlImg] = useState('');
    const [description, setDescription] = useState('');
    const [msgTipo, setMsgTipo] = useState();
    const [carregando, setCarregando] = useState(false);
    const parametroUrl = props.match.params.id || 1;
    
    // Busca a notícia pelo parametro - Edição
    useEffect(() => {
        if(parametroUrl) {
            api.get(`/news/${parametroUrl}`)
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
            data: {
                title: title, 
                imgUrl: urlImg, 
                description: description,
                date: new Date().toISOString().slice(0,10).split('-').reverse().join('/'), // Coloca data em DD/MM/YY
            }
        };
        api(`/news/${parametroUrl}`, requestInfo)
        .then(response => {
            console.log(response)
        })
        .catch(Error => console.log(Error))
    }

    // Função de publicar notítica
    function publishNews() {
        setMsgTipo('')
        if(!title || !urlImg || !description) {
            setMsgTipo('failed');
            return;
        }
        const requestInfo = {
            method: 'POST',
            data: {
                title: title, 
                imgUrl: urlImg, 
                description: description,
                date: new Date().toISOString().slice(0,10).split('-').reverse().join('/'), // Coloca data em DD/MM/YY
            }
        };
        api('/news', requestInfo)
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
            <form className="form" data-testid="footer">
                <h1>{props.match.params.id ? 'Atualizar Notícia' : 'Publicar Notícia'}</h1>

                <input type="text" onChange={e => setTitle(e.target.value)} value={title && title} name="title" className="form__input" placeholder="Título"/>
                <input type="text" onChange={e => setUrlImg(e.target.value)} value={urlImg && urlImg} name="urlImg" className="form__input" placeholder="URL da Imagem"/>
                <textarea name="description" onChange={e => setDescription(e.target.value)} value={description && description} className='form__input' placeholder="Digite a descrição" rows="5" cols="43"></textarea>

            {msgTipo === 'success' && 
                <p className="message message__success">Nóticia publicada!!! <span role="img" aria-label="Feliz">&#128526;</span></p>}
            {msgTipo === 'failed' && 
                <p className="message message__error">Preencha todos os campos e tente novamente!!! <span role="img" aria-label="Triste">&#128546;</span></p>}

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