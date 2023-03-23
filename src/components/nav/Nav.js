import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useShopService from "../../services/ShopService";

import catalog1 from '../../resources/img/catalog.svg'

import './nav.scss'

const Nav = ({headerForList}) => {
    const [catalog, setCatalog] = useState([])

    useEffect(() => {
        getCatalog()
            .then(onCharLoaded)
    }, [])

    const {getCatalog} = useShopService();

    const onCharLoaded = (catalog) => {
        setCatalog(catalog)
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
                onClick={() => headerForList(name)}
                className="nav__block-item"
                style={({isActive}) => isActive ? activeStyle : undefined}
                >{name}</NavLink>
        )
    })

    return (
        <nav>
            <div className="nav__block">
                <NavLink to='/' className="nav__block-item nav__block-item--main">
                    <img src={catalog1} alt="catalog" />
                    Каталог
                </NavLink>
                {navList}
            </div>
        </nav>
    );
};

export default Nav;