import React , { useState, useEffect } from 'react';
import api from '../../util/Api';

import NewsCard from '../../components/newsCard';

function News() {
    const [news, setNews] = useState([]);
    let listaNews = [];

    // Guarda as notiícias no estado e re-renderiza
    useEffect(() => {
        api.get('/news')
        .then(async (response) => {
            await response.data.forEach(data => {
                listaNews.push({...data})
            })

            setNews(listaNews);
        })
        console.log(news)
    }, [])

    return(
        <>
            {news.map(item => <NewsCard 
                key={item.id} 
                id={item.id} 
                imgUrl={item.imgUrl} 
                title={item.title} 
                description={item.description} 
                date={item.date} />)
            }
        </>
    )
};

export default News;