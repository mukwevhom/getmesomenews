import React, {useContext, useEffect} from "react";
import queryString from "query-string";
import {Context} from "../contexts/EverythingContextProvider";
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { TextField,
    MenuItem
 } from '@material-ui/core';
 import {
   MuiPickersUtilsProvider,
   KeyboardDatePicker,
 } from '@material-ui/pickers';

const apiBaseURL = "https://newsapi.org/v2/";

const sortByOptions = [
    {
        label:"Relevancy",
        value:"relevancy"
    },
    {
        label:"Popularity",
        value:"popularity"
    },
    {
        label:"Published At",
        value:"publishedAt"
    }
];

let requestParams = {
    apiKey:"64b79c009faa43b1b086263073e25aea"
};

function sendRequest(dispatch) {
    let {q, sortBy, from, to} = requestParams;

    let qs = queryString.stringify(requestParams);
        
    fetch(`${apiBaseURL}everything?${qs}`)
        .then(response => response.json())
        .then(response => {
            dispatch({
                type: 'SET_ARTICLES',
                newsArticles: response.articles,
                q,
                sortBy,
                from,
                to
            });
        });
}

export default function Everything(){
    const [state, dispatch] = useContext(Context);

    useEffect((e) => {
        requestParams = {
            ...requestParams,
            q: state.q,
            sortBy:state.sortBy,
            to:state.dateTo
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
                            && state.newsArticles.map((article,i) => {
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

    const [sortByOption, setSortByOption] = React.useState(state.sortBy);
    const [searchText, setSearchText] = React.useState(state.q);
    const [dateFrom, setDateFrom] = React.useState(state.dateFrom);
    const [dateTo, setDateTo] = React.useState(state.dateTo);

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
                case "selectSortByOption":{
                    setSortByOption(value);
                    requestParams.sortBy=value!=="all" ? value : "";
                    break;
                }
                default:
                    return;
            }
        }

        sendRequest(dispatch);
    };

    const handleDateFromChange = (date) => {
        let formatedDate = moment(date).format("YYYY-MM-DD");

        setDateFrom(formatedDate);
        requestParams.from = formatedDate;

        sendRequest(dispatch);
    };

    const handleDateToChange = (date) => {
        let formatedDate = moment(date).format("YYYY-MM-DD");

        setDateTo(formatedDate);
        requestParams.to = formatedDate;
        
        sendRequest(dispatch);
    };

    return (
        <div className="searchBar py-2">
            <div className="container">
                <form className="d-flex" onSubmit={e => { e.preventDefault(); }}>
                    <TextField id="searchText" name="searchText" value={searchText}  label="Search" variant="outlined" onChange={handleChange} />
                    <TextField
                        id="selectSortByOption"
                        name="selectSortByOption"
                        select
                        label="Sort By"
                        value={sortByOption}
                        onChange={handleChange}
                        variant="outlined"
                        >
                        {sortByOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className="flex">
                            <KeyboardDatePicker
                                className="my-0"
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dateFromPicker"
                                label="Date From"
                                value={dateFrom}
                                onChange={handleDateFromChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                            <KeyboardDatePicker
                                className="my-0"
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dateToPicker"
                                label="Date To"
                                value={dateTo}
                                onChange={handleDateToChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                        </div>
                    </MuiPickersUtilsProvider>
                </form>
            </div>
        </div>
    )
}