import Header from '../header/Header';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import MainPage from "../pages/MainPage";
import ItemsPage from '../pages/ItemsPage';
import ElemPage from '../pages/ElemPage';
import BagPage from '../pages/BagPage';
import ErrorPage from '../pages/ErrorPage';

import '../../style/style.scss'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';


const App = () => {

    const [header, setHeader] = useState()
    const [activeId, setActiveId] = useState()
    const [bagList, setBagList] = useState([])
    const [totalSum, setTotalSum] = useState(0)
    
    const headerForList = (name) => {
        setHeader(name)
    }

    const onRenderItem = (id) => {
        setActiveId(id)
    }

    const onTotalSum = (newSum) => {
        setTotalSum(totalSum => totalSum + +(newSum))
    }

    const onAddToBag = (catalog, newSum) => {
        if (bagList.length > 0) {
            if (!bagList.some(item => item.id === catalog.id)) {
                setBagList(bagList => [...bagList, ...[catalog]])
                setTotalSum(totalSum => totalSum + +(newSum))
            } else {
                setBagList(bagList => bagList.filter(item => item.id !== catalog.id))
                setTotalSum(totalSum => totalSum - +(newSum))
            }
        } else {
            setBagList(bagList => [...bagList, ...[catalog]])
            setTotalSum(totalSum => totalSum + +(newSum))
        }
    }

    return (
        <Router>
            <div className="app">
                <Header bagList={bagList} totalSum={totalSum} onRenderItem={onRenderItem}/>
                <Nav headerForList={headerForList}/>
                <Routes>
                    <Route path="/" element={<MainPage bagList={bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem}/>}/>
                    <Route path="/cart" element={<BagPage onTotalSum={onTotalSum} onAddToBag={onAddToBag} bagList={bagList}/>}/>
                    <Route path="/:comicId" element={<ItemsPage name={header} bagList={bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem}/>}/>
                    <Route path="/:comicId/:comicName" element={<ElemPage activeId={activeId} bagList={bagList} onAddToBag={onAddToBag}/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
