import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import useShopService from "../../services/ShopService";

import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErorrMessage";
import ProductListItem from '../productListItem/ProductListItem';

import './productList.scss'
import catalogImg from '../../resources/img/catalog.svg'


const ProductList = ({title, comicId}) => {

    const [catalog, setCatalog] = useState([])

    const {getCatalogItems, error, loading} = useShopService();

    useEffect(() => {
        getCatalogItems(comicId, 4)
            .then(onCatalogLoaded)
    }, [])
    
    const onCatalogLoaded = (catalog) => {
        setCatalog(catalog.itemList)
    }

    const catalogList = catalog.map((item, i) => {
        return (
            <ProductListItem catalog={item} key={i}/>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content =  !(loading || error) ? catalogList : null

    return (
        <>
            <div className="list__header">
                <h2 className="list__title">{title}</h2>
                <a href="#" className="nav__block-item nav__block-item--main">
                    <img src={catalogImg} alt="catalog" />
                    Все товары
                </a>
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