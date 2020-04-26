import React from 'react';
import { Link } from 'react-router-dom';

function NewsCard({id, imgUrl, title, description, date}) {
    return(
        <>
            <div className="noticias">
                <Link to={`/details-news/${id}`}>
                <div className="noticias__card">
                    <img className="noticias__card--picture" src={imgUrl} alt="Imagem" />
                    <div className="noticias__card--body">
                        <p className="noticias__card--title">{title.length > 69 ? title.substr(0, 69)+'...' : title}</p>
                        <p className="noticias__card--description">{description.length > 200 ? description.substr(0, 200)+'...' : description}</p>
                        <p className="noticias__card--date">{`Publicado em: ${date}`}</p>
                    </div>
                </div>
                </Link>      
            </div>
        </>
    )
}

export default NewsCard;