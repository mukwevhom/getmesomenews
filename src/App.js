import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
            <Switch>
                <Route exact path="/search-news">
                    <EverythingContextProvider>
                        <Everything />
                    </EverythingContextProvider>
                </Route>
                <Route exact path="/">
                    <TopNewsContextProvider>
                        <TopNews />
                    </TopNewsContextProvider>
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default App;