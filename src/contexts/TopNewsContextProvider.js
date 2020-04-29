import React from 'react'

const initialState = {
    newsArticles:[],
    country:"za",
    q:"",
    category:"all",
};

function reducer(state, action){
    switch(action.type) {
        case 'SET_ARTICLES':{
            return {
                ...state,
                newsArticles:action.newsArticles,
                q:action.q,
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

const TopNewsContextProvider = ({children}) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const Context = React.createContext(initialState);

export default TopNewsContextProvider;