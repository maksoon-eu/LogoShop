import Header from '../header/Header';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import MainPage from "../pages/MainPage";
import ItemsPage from '../pages/ItemsPage';
import ElemPage from '../pages/ElemPage';
import ErrorPage from '../pages/ErrorPage';

import '../../style/style.scss'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';


const App = () => {

    const [header, setHeader] = useState()
    const [activeId, setActiveId] = useState()
    
    const headerForList = (name) => {
        setHeader(name)
    }

    const onRenderItem = (id) => {
        setActiveId(id)
    }

    return (
        <Router>
            <div className="app">
                <Header/>
                <Nav headerForList={headerForList}/>
                <Routes>
                    <Route path="/" element={<MainPage onRenderItem={onRenderItem}/>}/>
                    <Route path="/:comicId" element={<ItemsPage name={header} onRenderItem={onRenderItem}/>}/>
                    <Route path="/:comicId/:comicName" element={<ElemPage activeId={activeId}/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
