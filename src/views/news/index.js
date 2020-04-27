import React , { useState, useEffect } from 'react';
import api from '../../util/Api';

import NewsCard from '../../components/newsCard';

function News() {
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('');
    let listaNews = [];

    // Guarda as notiícias no estado e re-renderiza
    useEffect(() => {
        api.get('/news')
        .then(async (response) => {
            await response.data.forEach(data => {
                if(data.title.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                    listaNews.push({...data})
                }
            })
            setNews(listaNews);
        })
        .catch(Error => window.location.href = "/login")
    }, [search])

    return(
        <>
            <input onChange={(e) => setSearch(e.target.value)} type="text" className="form__input search__home text-center" placeholder="Pesquisar notícias" />
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