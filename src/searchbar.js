import React, {useContext} from "react";
import {Context} from './GlobalContextProvider';
import queryString from "query-string";
import DateFnsUtils from '@date-io/date-fns';
import { TextField,
    MenuItem,
    Grid
 } from '@material-ui/core';
 import {
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
   KeyboardDatePicker,
 } from '@material-ui/pickers';

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

const articlesToGetList = [
    {
        label:"All",
        value:"everything"
    },
    {
        label:"Top Headlines",
        value:"top-headlines"
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

export default function SearchBar() {
    const [state, dispatch] = useContext(Context);

    const [country, setCountry] = React.useState(state.country);
    const [searchText, setSearchText] = React.useState(state.q);
    const [articlesToGet, setArticlesToGet] = React.useState(state.resource);
    const [category, setCategory] = React.useState(state.category);
    const [dateFrom, setDateFrom] = React.useState(state.dateFrom);
    const [dateTo, setDateTo] = React.useState(state.dateTo);

    let requestParams = {
        apiKey:"64b79c009faa43b1b086263073e25aea"
    };

    let varArticlesToGet = state.resource;

    requestParams.country=state.country;
    requestParams.q = state.q;

    function getNewsArticles() {
        if(varArticlesToGet === "everything") {
            delete requestParams.country;
            delete requestParams.category;
        }
        
        let qs = queryString.stringify(requestParams);

        fetch(`${apiBaseURL}${varArticlesToGet}?${qs}`)
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: 'SET_ARTICLES',
                    newsArticles: response.articles,
                    q:requestParams.q,
                    resource:varArticlesToGet,
                    category:requestParams.category ? requestParams.category : "",
                    country:requestParams.country ? requestParams.country : ""
                });
                // this.setState({newsArticles: response.articles});
            });
    }

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
                case "selectArticlesToGet":{
                    setArticlesToGet(value);
                    varArticlesToGet=value;
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
        // switch(event.target.name){}
        // setCountry(event.target.value);
        // requestParams.country=event.target.value;

        getNewsArticles();
    };

    const handleDateChange = (date) => {
        console.log(date)
    };

    
    return (
        <div className="searchBar">
            <form onSubmit={e => { e.preventDefault(); }}>
                <TextField id="searchText" name="searchText" value={searchText}  label="Search" variant="outlined" onChange={handleChange} />
                <TextField
                    id="selectArticlesToGet"
                    name="selectArticlesToGet"
                    select
                    label="Articles To Get"
                    value={articlesToGet}
                    onChange={handleChange}
                    variant="outlined"
                    >
                    {articlesToGetList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                {articlesToGet==="top-headlines" &&
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
                    </TextField>}
                {articlesToGet==="top-headlines" &&
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
                    </TextField>}
                {articlesToGet==="everything" &&
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="dateFromPicker"
                            label="Date From"
                            value={dateFrom}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dateToPicker"
                                label="Date To"
                                value={dateTo}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                    </Grid>
                </MuiPickersUtilsProvider>
                 }
            </form>
        </div>
    )
}