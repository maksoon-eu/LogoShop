import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useShopService from "../../services/ShopService";

import catalog1 from '../../resources/img/catalog.svg'
import './nav.scss'

const Nav = () => {

    const [catalog, setCatalog] = useState([])

    useEffect(() => {
        getCatalog()
            .then(onCharLoaded)
    }, [])

    const {getCatalog} = useShopService();

    const onCharLoaded = (catalog) => {
        setCatalog(catalog)
    }

    const nonActiveStyle = {
        color: '#000',
        background: '#fff'
    }

    const activeStyle = {
        background: '#EFF6FF',
        color: '#3B82F6'
    };

    const navList = catalog.map(({name, id}, i) => {
        return (
            <NavLink
            to={`/${id}`}
            key={i} 
            end
            style={({isActive}) => isActive ? activeStyle : nonActiveStyle}
            className="nav__block-item">{name}</NavLink>
        )
    })

    return (
        <nav>
            <div className="nav__block">
                <a href="#" className="nav__block-item nav__block-item--main">
                    <img src={catalog1} alt="catalog" />
                    Каталог
                </a>
                {navList}
            </div>
        </nav>
    );
};

export default Nav;