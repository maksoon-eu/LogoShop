import Header from '../header/Header';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import MainPage from "../pages/MainPage";
import ItemsPage from '../pages/ItemsPage';
import ElemPage from '../pages/ElemPage';
import BagPage from '../pages/BagPage';
import InfoPage from '../pages/InfoPage';
import ErrorPage from '../pages/ErrorPage';
import OrderPage from '../pages/OrderPage';
import AccountPage from '../pages/AccountPage';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

import '../../style/style.scss'


const App = () => {
    const [cookies, setCookie] = useCookies(['bagList', 'activeSum']);

    const [header, setHeader] = useState()
    const [activeId, setActiveId] = useState()
    const value = useMemo(() => +(cookies.activeSum === undefined ? 0 : cookies.activeSum), [cookies.activeSum]).toFixed(2)
    
    const headerForList = (name) => {
        setHeader(name)
    }

    const onRenderItem = (id) => {
        setActiveId(id)
    }

    const onTotalSum = (newSum) => {
        setCookie('activeSum', +value + +newSum)
    }

    const onAddToBag = (catalog, newSum) => {
        const newNumFunc = +(newSum).toFixed(2)
        if (cookies.bagList.length > 0) {
            if (!cookies.bagList.some(item => item.id === catalog.id)) {
                setCookie('bagList', [...cookies.bagList, ...[catalog]]);
                setCookie('activeSum', +value + newNumFunc)
            } else {
                setCookie('bagList', cookies.bagList.filter(item => item.id !== catalog.id));
                setCookie('activeSum', +value - newNumFunc)
            }
        } else {
            setCookie('bagList', [...cookies.bagList, ...[catalog]]);
            setCookie('activeSum', +value + newNumFunc)
        }
    }

    return (
        <Router>
            <div className="app">
                <Header bagList={cookies.bagList} totalSum={value} onRenderItem={onRenderItem}/>
                <Nav headerForList={headerForList}/>
                <Routes>
                    <Route path="/" element={<MainPage onTotalSum={onTotalSum} bagList={cookies.bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem}/>}/>
                    <Route path="/info" element={<InfoPage/>}/>
                    <Route path="/order" element={<OrderPage bagList={cookies.bagList} totalSum={value}/>}/>
                    <Route path="/account" element={<AccountPage/>}/>
                    <Route path="/cart" element={<BagPage onTotalSum={onTotalSum} onAddToBag={onAddToBag} bagList={cookies.bagList}/>}/>
                    <Route path="/:comicId" element={<ItemsPage onTotalSum={onTotalSum} name={header} bagList={cookies.bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem}/>}/>
                    <Route path="/:comicId/:comicName" element={<ElemPage onTotalSum={onTotalSum} activeId={activeId} bagList={cookies.bagList} onAddToBag={onAddToBag}/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
