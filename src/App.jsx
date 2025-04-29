import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Everything from './pages/Everything';
import TopNews from './pages/TopNews';
import EverythingContextProvider from './contexts/EverythingContextProvider';
import TopNewsContextProvider from './contexts/TopNewsContextProvider';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route exact path="/"
                    element={
                        <TopNewsContextProvider>
                            <TopNews />
                        </TopNewsContextProvider>
                    }
                />
                <Route
                    exact path="/search-news"
                    element={
                        <EverythingContextProvider>
                            <Everything />
                        </EverythingContextProvider>
                    }
                />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App;