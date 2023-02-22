import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
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
    
    const onCatalogLoaded = (newCatalog) => {
        setCatalog(newCatalog.itemList)
        setActiveName(newCatalog.activeTab)
    }


    const updateCatalog = () => {
        const catalogListAvailable = catalog.map((item, id) => {
            if (filters.includes('available')) {
                if (item.category.some(elem => elem === 'available')) {
                    return (
                        <ProductListItem catalog={item} key={id}/>
                    )
                }
            }
        })
        const catalogListFunc = catalog.map((item, id) => {
            const newFilters = filters.filter(filter => filter !== 'available')
            if (newFilters.length === 0) {
                return (
                    <ProductListItem catalog={item} key={id}/>
                ) 
            } for (let i = 0; i < newFilters.length; i++) {
                if (item.category.some(elem => elem === newFilters[i])) {
                    return (
                        <ProductListItem catalog={item} key={id}/>
                    )
                }
            }
        })


        if (catalogListAvailable.filter(item => item !== undefined).length === 0) {
            if (catalogListFunc.filter(item => item !== undefined).length === 0) {
                return <h2 className="noTitle" >Товары не найдены</h2>
            } return catalogListFunc
        }

        const list = catalogListAvailable.map(item => {
            if (item !== undefined) {
                return catalogListFunc.filter(elem => elem !== undefined ? elem.key === item.key : '')
            } return false
            
        })

        if (list.filter(item => item.length > 0).length === 0) {
            return <h2 className="noTitle" >Товары не найдены</h2>
        } return list
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

    const catalogTitle = activeName.map(({activeTab}, i) => {
        return (
            <h1 key={i}>{activeTab}</h1>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content =  !(loading || error) ? updateCatalog() : null

    return (
        <div>
            {catalogTitle}
            <CatalogFilter getNewFilter={updateCatalog} filteredList={filteredList} comicId={comicId}/>
            <div className="catalog__block">
                {errorMessage}
                {spinner}
                {content}
            </div>
        </div>
    )
};

export default CatalogList;