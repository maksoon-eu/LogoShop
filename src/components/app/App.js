import Header from '../header/Header';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import MainPage from "../pages/MainPage";
import ItemsPage from '../pages/ItemsPage';

import '../../style/style.scss'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {
    return (
        <Router>
            <div className="app">
                <Header/>
                <Nav/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/:comicId" element={<ItemsPage/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
