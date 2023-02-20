import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import useShopService from "../../services/ShopService";

import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErorrMessage";
import ProductListItem from "../productListItem/ProductListItem";
import CatalogFilter from '../catalogFilter/CatalogFilter';

import './catalogList.scss'

const CatalogList = () => {
    const [catalog, setCatalog] = useState([])
    const [activeName, setActiveName] = useState([])
    const [filters, setFilters] = useState([])
    const {comicId} = useParams()

    const {getCatalogItems, error, loading} = useShopService();

    useEffect(() => {
        getCatalogItems(comicId)
            .then(onCatalogLoaded)

        setFilters([])
    }, [comicId])
    
    const onCatalogLoaded = (catalog) => {
        setCatalog(catalog.itemList)
        setActiveName(catalog.activeTab)
    }

    const filteredList = (newFilter) => {
        if (filters.length === 0) {
            setFilters(filters.concat(newFilter))
        }

        if (!filters.some(item => item === newFilter)) {
            setFilters(filters.concat(newFilter))
        } else {
            setFilters(filters.filter(el => {
                return el !== newFilter
            }))
        }
    }

    const catalogList = catalog.map((item, i) => {
        return (
            <ProductListItem catalog={item} key={i}/>
        )
    })

    const catalogTitle = activeName.map(({activeTab}, i) => {
        return (
            <h1 key={i}>{activeTab}</h1>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content =  !(loading || error) ? catalogList : null

    return (
        <div>
            {catalogTitle}
            <CatalogFilter filteredList={filteredList} comicId={comicId}/>
            <div className="catalog__block">
                {errorMessage}
                {spinner}
                {content}
            </div>
        </div>
    )
};

export default CatalogList;