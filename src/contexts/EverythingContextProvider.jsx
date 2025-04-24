import React from 'react';
import moment from 'moment';

const initialState = {
    newsArticles:[],
    q:"",
    sortBy:"relevancy",
    dateFrom:moment().format("YYYY-MM-DD"),
    dateTo:moment().format("YYYY-MM-DD")
};

function reducer(state, action){
    switch(action.type) {
        case 'SET_ARTICLES':{
            return {
                ...state,
                newsArticles:action.newsArticles,
                q:action.q,
                sortBy:action.sortBy,
                dateFrom:action.dateFrom,
                dateTo:action.dateTo
            };
        }
        default:
            throw new Error('Bad Action Type');
    }
}

const EverythingContextProvider = ({children}) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const Context = React.createContext(initialState);

export default EverythingContextProvider;