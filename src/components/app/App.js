import Header from '../header/Header';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import MainPage from "../pages/MainPage";
import ItemsPage from '../pages/ItemsPage';
import ElemPage from '../pages/ElemPage';
import BagPage from '../pages/BagPage';
import InfoPage from '../pages/InfoPage';
import ErrorPage from '../pages/ErrorPage';

import '../../style/style.scss'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import OrderPage from '../pages/OrderPage';


const App = () => {

    const [cookies, setCookie] = useCookies(['bagList', 'activeSum']);

    const [header, setHeader] = useState()
    const [activeId, setActiveId] = useState()
    const value = useMemo(() => +(cookies.activeSum === undefined ? 0 : cookies.activeSum), [cookies.activeSum])
    
    const headerForList = (name) => {
        setHeader(name)
    }

    const onRenderItem = (id) => {
        setActiveId(id)
    }

    const onTotalSum = (newSum) => {
        setCookie('activeSum', value + +(newSum))
    }

    const onAddToBag = (catalog, newSum) => {
        
        if (cookies.bagList.length > 0) {
            if (!cookies.bagList.some(item => item.id === catalog.id)) {
                setCookie('bagList', [...cookies.bagList, ...[catalog]]);
                setCookie('activeSum', value + +(newSum));
            } else {
                setCookie('bagList', cookies.bagList.filter(item => item.id !== catalog.id));
                setCookie('activeSum', value - +(newSum));
            }
        } else {
            setCookie('bagList', [...cookies.bagList, ...[catalog]]);
            setCookie('activeSum', value + +(newSum));
        }
    }

    return (
        <Router>
            <div className="app">
                <Header bagList={cookies.bagList} totalSum={value} onRenderItem={onRenderItem}/>
                <Nav headerForList={headerForList}/>
                <Routes>
                    <Route path="/" element={<MainPage bagList={cookies.bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem}/>}/>
                    <Route path="/info" element={<InfoPage/>}/>
                    <Route path="/order" element={<OrderPage/>}/>
                    <Route path="/cart" element={<BagPage onTotalSum={onTotalSum} onAddToBag={onAddToBag} bagList={cookies.bagList}/>}/>
                    <Route path="/:comicId" element={<ItemsPage name={header} bagList={cookies.bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem}/>}/>
                    <Route path="/:comicId/:comicName" element={<ElemPage activeId={activeId} bagList={cookies.bagList} onAddToBag={onAddToBag}/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
