import Header from '../header/Header';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import MainPage from "../pages/MainPage";
import ItemsPage from '../pages/ItemsPage';

import '../../style/style.scss'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';


const App = () => {

    const [header, setHeader] = useState(localStorage.getItem('activeTab'))
    const headerForList = (name) => {
        setHeader(name)
    }

    return (
        <Router>
            <div className="app">
                <Header/>
                <Nav headerForList={headerForList}/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/:comicId" element={<ItemsPage name={header}/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
