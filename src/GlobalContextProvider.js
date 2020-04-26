import React from 'react'

const initialState = {
    newsArticles:[],
    country:"za",
    q:"",
    resource:"top-headlines",
    category:"all",
    dateFrom:new Date('2014-08-18T21:11:54'),
    dateTo:new Date('2014-08-18T21:11:54')
};

function reducer(state, action){
    switch(action.type) {
        case 'SET_ARTICLES':{
            return {
                ...state,
                newsArticles:action.newsArticles,
                q:action.q,
                resource:action.resource,
                category:action.category,
                country:action.country
            };
        }
        case 'SEARCH_ARTICLES': {
            return {
                ...state,
                newsArticles:action.newsArticles
            };
        }
        default:
            throw new Error('Bad Action Type');
    }
}

const GlobalContextProvider = ({children}) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const Context = React.createContext(initialState);

export default GlobalContextProvider;