import { useState, useEffect } from 'react';
import useShopService from "../../services/ShopService";

import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErorrMessage";
import ProductListItem from '../productListItem/ProductListItem';

import './productList.scss'
import catalogImg from '../../resources/img/catalog.svg'
import { NavLink } from 'react-router-dom';


const ProductList = ({title, comicId, onRenderItem, onAddToBag, bagList}) => {
    const [catalog, setCatalog] = useState([])

    const {getCatalogItems, error, loading} = useShopService();

    useEffect(() => {
        getCatalogItems(comicId, 0, 4)
            .then(onCatalogLoaded)
    }, [])
    
    const onCatalogLoaded = (catalog) => {
        setCatalog(catalog.itemList)
    }

    const catalogList = catalog.map(item => {
        return (
            <ProductListItem bagList={bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem} catalog={item} comicId={comicId} key={item.id}/>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content =  !(loading || error) ? catalogList : null

    return (
        <>
            <div className="list__header">
                <h2 className="list__title">{title}</h2>
                <NavLink to={`/${comicId}`} className="nav__block-item nav__block-item--main">
                    <img src={catalogImg} alt="catalog" />
                    Все товары
                </NavLink>
            </div>
            <div className='list'>
                {errorMessage}
                {spinner}
                {content}
            </div>
        </>
    );
};

export default ProductList;