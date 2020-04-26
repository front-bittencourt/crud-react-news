import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner'
import api from '../../util/Api';

function DetailsNews(props) {
    const [news, setNews] = useState({});
    const [remove, setRemove] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const parametroUrl = props.match.params.id;

    // Guarda as informações da notícia no estado depois que o componente e montado e re-renderiza.
    useEffect(() => {
        if(parametroUrl)
        api.get(`/news/${parametroUrl}`)
        .then((response) => {
            setTimeout(() => {
                setNews(response.data)
                setCarregando(false)
            }, 2000)
        })
        .catch(Error => console.log(Error))
    }, [])

    // Função de deletar uma notícia
    function deleteNews() {
        api.delete(`/news/${parametroUrl}`)
        .then(() => {
            setCarregando(true)
            setTimeout(() => {
                setRemove(true)
                setCarregando(false)
            }, 2000)
        })
        .catch(Error => console.log(Error))
    }
    
    return (
        <>
            {
                carregando ?
                <div className="text-center">
                    <Loader
                        type="Puff"
                        color="#3b9c00"
                        height={100}
                        width={100}
                        timeout={10000}
                    />
                </div>
                :
                <div className="detail">
                    <div className="detail__img">
                        <img src={news.imgUrl} alt="" />
                    </div>
                    <h1 className="detail__title">{news.title}</h1>
                    <p className="detail__description">{news.description}</p>  
                    <p className="detail__date">Publicado em: {news.date}</p>
                    <button onClick={deleteNews} type="button" className="detail__delete">Excluir Publicação</button>
                    <Link to={`/edit-news/${props.match.params.id}`} className="detail__edit">Editar Publicação</Link>

                    {remove ? <Redirect to="/" /> : null}
                </div>
            }
        </>
    );
}

export default DetailsNews;