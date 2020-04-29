import React, {useContext, useEffect} from "react";
import queryString from "query-string";
import {Context} from "../contexts/TopNewsContextProvider";
import { TextField,
    MenuItem
 } from '@material-ui/core';

const apiBaseURL = "https://newsapi.org/v2/";

const countries = [
    {
        label:"All",
        value:"all"
    },
    {
        label:"South Africa",
        value:"za"
    },
    {
        label:"United Kingdom",
        value:"gb"
    },
    {
        label:"United States",
        value:"us"
    }
];

const categories = [
    {
        label:"All",
        value:"all"
    },
    {
        label:"Business",
        value:"business"
    },
    {
        label:"Entertainment",
        value:"entertainment"
    },
    {
        label:"Health",
        value:"health"
    },
    {
        label:"Science",
        value:"science"
    },
    {
        label:"Sports",
        value:"sports"
    },
    {
        label:"Technology",
        value:"technology"
    }
];

let requestParams = {
    apiKey:"64b79c009faa43b1b086263073e25aea"
};

function sendRequest(dispatch) {
    let {q, country, category } = requestParams;

    let qs = queryString.stringify(requestParams);
        
    fetch(`${apiBaseURL}top-headlines?${qs}`)
        .then(response => response.json())
        .then(response => {
            dispatch({
                type: 'SET_ARTICLES',
                newsArticles: response.articles,
                q,
                country,
                category
            });
        });
}

export default function TopNews(){
    const [state, dispatch] = useContext(Context);

    useEffect((e) => {

        requestParams = {
            ...requestParams,
            q:state.q,
            country:state.country!=="all" ? state.country : "",
            category:state.category!=="all" ? state.category : ""
        };

        sendRequest(dispatch);
    }, []);

    return (
        <React.Fragment>
            <SearchBar />
            <div className="newsWrapper py-4">
                <div className="container">
                    <div className="newsArticles">
                        { state.newsArticles
                            && state.newsArticles.map((article, i) => {
                                return(
                                    <div key={i} className="article row mb-3 py-3">
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
            </div>
        </React.Fragment>
    )
}

function SearchBar() {
    const [state, dispatch] = useContext(Context);

    const [country, setCountry] = React.useState(state.country);
    const [searchText, setSearchText] = React.useState(state.q);
    const [category, setCategory] = React.useState(state.category);

    const handleChange = (event) => {
        let name=event.target.name,
            value=event.target.value;

        if(event.type === "change") {
            switch(name){
                case "searchText":{
                    setSearchText(value);
                    requestParams.q=value;
                    break;
                }
                default:
                    return;
            }
        } else if(event.type === "click") {

            switch(name){
                case "selectCountry":{
                    setCountry(value);
                    requestParams.country=value!=="all" ? value : "";
                    break;
                }
                case "selectCategory":{
                    setCategory(value);
                    requestParams.category=value!=="all" ? value : "";
                    break;
                }
                default:
                    return;
            }
        }

        sendRequest(dispatch);
    };

    return (
        <div className="searchBar py-2">
            <div className="container">
                <form className="d-flex" onSubmit={e => { e.preventDefault(); }}>
                    <TextField id="searchText" name="searchText" value={searchText}  label="Search" variant="outlined" onChange={handleChange} />
                    <TextField
                        id="selectCountry"
                        name="selectCountry"
                        select
                        label="Country"
                        value={country}
                        onChange={handleChange}
                        variant="outlined"
                        >
                        {countries.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    <TextField
                        id="selectCategory"
                        name="selectCategory"
                        select
                        label="Category"
                        value={category}
                        onChange={handleChange}
                        variant="outlined"
                        >
                        {categories.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                </form>
            </div>
        </div>
    )
}