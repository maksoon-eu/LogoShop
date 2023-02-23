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
    const [cost, setCost] = useState(0)
    const [activeName, setActiveName] = useState([])
    const [available, setAvailable] = useState(0)
    const [filters, setFilters] = useState([])
    const {comicId} = useParams()

    const {getCatalogItems, error, loading} = useShopService();

    useEffect(() => {
        getCatalogItems(comicId)
            .then(onCatalogLoaded)

        setFilters([])
        setAvailable(0)
    }, [comicId])
    
    const onCatalogLoaded = (newCatalog) => {
        setCatalog(newCatalog.itemList)
        setActiveName(newCatalog.activeTab)
    }

    const updateCost = (cost) => {
        setCost(cost)
    }

    const updateAvailable = () => {
        setAvailable(available === 'available' ? '' : 'available')
    }

    const filterList = catalog.filter(n => (
        (!available.length || n.category.map(elem => elem === available).includes(true)) &&
        (!filters.length || n.category.map(elem => filters.includes(elem)).includes(true)) &&
        (!cost[0] || cost[0] <= n.price) &&
        (!cost[1] || cost[1] >= n.price)
    ))

    const catalogFilter = filterList.map((item, id) => {
        return (
            <ProductListItem catalog={item} key={id}/>
        )
    })

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

    const fiteredContent = !catalogFilter.length ? <h2 className="noTitle" >Товары не найдены</h2> : catalogFilter
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content =  !(loading || error) ? fiteredContent : null

    return (
        <div>
            {catalogTitle}
            <div className="catalog__list">
                <CatalogFilter updateCost={updateCost} updateAvailable={updateAvailable} filteredList={filteredList} comicId={comicId}/>
                <div className="catalog__block">
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
            </div>
        </div>
    )
};

export default CatalogList;