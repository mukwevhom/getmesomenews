import React from 'react';
import GlobalContextProvider from './GlobalContextProvider';
import NewsArticles from './newsarticles';
import SearchBar from './searchbar';

const App = () => {
    return (
        <GlobalContextProvider>
            <SearchBar />
            <NewsArticles />
        </GlobalContextProvider>
    )
}

export default App;