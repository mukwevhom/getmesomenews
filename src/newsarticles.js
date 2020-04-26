import React, {useContext, useEffect} from "react";
import {Context} from './GlobalContextProvider';

const queryString = require('query-string');

const apiBaseURL = "https://newsapi.org/v2/";

const NewsArticles = () => {

    const [state, dispatch] = useContext(Context);

    useEffect((e) => {

        let requestParams = {
            apiKey:"64b79c009faa43b1b086263073e25aea"
        };

        requestParams.country=state.country;
        requestParams.q = state.q;

        let qs = queryString.stringify(requestParams);

        fetch(`${apiBaseURL}${state.resource}?${qs}`)
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: 'SET_ARTICLES',
                    newsArticles: response.articles,
                    q:state.q,
                    resource:state.resource,
                    country:state.country,
                    category:state.category
                });
                // this.setState({newsArticles: response.articles});
            });
    }, []);

    return (
        <React.Fragment>
            <div className="container py-6">
                <div className="newsArticles">
                    { state.newsArticles
                        && state.newsArticles.map(article => {
                            return(
                                <div className="article row mb-3" href={article.url}>
                                    {article.urlToImage && <div className="article-image col-3">
                                        <a href={article.url} target="_h" className="d-block h-100">
                                            <figure className="my-0 h-100">
                                                <img src={article.urlToImage} alt={article.title} className="w-100 h-100" />
                                            </figure>
                                        </a>
                                    </div> }
                                    <div className={article.urlToImage?"article-info col-8" : "article-info col-11" }>
                                        <h2 className="article-title">
                                            <a href={article.url} target="_h">{article.title}</a>
                                        </h2>
                                        <p className="article-description">{article.description}</p>
                                        <div className="article-meta d-flex">
                                            <p className="article-meta-source">{article.source.name}</p>
                                            &bull;
                                            <p className="article-meta-date">{article.publishedAt}</p>
                                        </div>
                                    </div>
                                    <div className="article-action col-1">
                                        <a href={article.url} target="_h">visit</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default NewsArticles;