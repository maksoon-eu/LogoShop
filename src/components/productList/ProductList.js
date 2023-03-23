import { useState, useEffect } from 'react';
import useShopService from "../../services/ShopService";
import { Link } from 'react-router-dom';

import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErorrMessage";
import ProductListItem from '../productListItem/ProductListItem';

import catalogImg from '../../resources/img/catalog.svg'

import './productList.scss'

const ProductList = ({title, comicId, onRenderItem, onAddToBag, bagList, onTotalSum}) => {
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
            <ProductListItem onTotalSum={onTotalSum} bagList={bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem} catalog={item} comicId={comicId} key={item.id}/>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content =  !(loading || error) ? catalogList : null

    return (
        <>
            <div className="list__header">
                <h1 className="title">{title}</h1>
                <Link to={`/${comicId}`} className="nav__block-item nav__block-item--main">
                    <img src={catalogImg} alt="catalog" />
                    Все товары
                </Link>
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