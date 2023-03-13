import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import useShopService from "../../services/ShopService";

import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErorrMessage";
import ProductListItem from "../productListItem/ProductListItem";
import CatalogFilter from '../catalogFilter/CatalogFilter';
import CatalogSort from "../catalogSort/CatalogSort";

import './catalogList.scss'

const CatalogList = ({onRenderItem, onAddToBag, bagList}) => {
    const [catalog, setCatalog] = useState([])
    const [cost, setCost] = useState(0)
    const [activeName, setActiveName] = useState([])
    const [available, setAvailable] = useState(0)
    const [filters, setFilters] = useState([])
    const [sortItem, setSortItem] = useState()
    const [activeCount, setActiveCount] = useState(0)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [itemEnded, setItemEnded] = useState(false)
    const {comicId} = useParams()

    const sort = [
        {sortName: 'Популярные', sortDataName: 'popular'},
        {sortName: 'По алфавиту', sortDataName: 'alphabet'},
        {sortName: 'Дорогие', sortDataName: 'expensive'},
        {sortName: 'Дешевые', sortDataName: 'cheaply'}
    ]

    const {getCatalogItems, error, loading} = useShopService();

    useEffect(() => {
        setActiveCount(0)
        setCatalog([])

        onRequest(true)

        setFilters([])
        setAvailable(0)
        setSortItem()
        setItemEnded(false)
    }, [comicId])

    const onRequest = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getCatalogItems(comicId, 0, 6)
            .then(onCatalogLoaded)
        setActiveCount(activeCount => activeCount + 6)
    }

    const onUpdateList = (count, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getCatalogItems(comicId, count - 6, count)
            .then(onCatalogLoaded)
        setActiveCount(activeCount => activeCount + 6)
    }
    
    const onCatalogLoaded = (newCatalog) => {
        if (newCatalog.itemList.length < 6) {
            setItemEnded(true)
        }

        setCatalog(catalog => [...catalog, ...newCatalog.itemList])
        setActiveName(newCatalog.activeTab)
        setNewItemLoading(false)
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

    const setSortCatalog = (sortNew) => {
        setSortItem(sort => sort === sortNew ? '' : sortNew)
    }

    function sortingItems() {
        if (sortItem === 'expensive') {
            return filterList.sort((a, b) => b.price - a.price)
        }
        if (sortItem === 'cheaply') {
            return filterList.sort((a, b) => a.price - b.price)
        }
        if (sortItem === 'alphabet') {
            return filterList.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })
        }
        if (sortItem === 'popular') {
            return filterList.sort((a, b) => b.raiting - a.raiting)
        }
        return filterList
    }

    const catalogFilter = sortingItems().map(item => {
        return (
            <ProductListItem bagList={bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem} comicId={comicId} catalog={item} key={item.id}/>
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

    const sortedCatalog = sort.map((item, i) => {
        return (
            <CatalogSort sortItem={sortItem} sortCatalog={setSortCatalog} item={item} id={comicId} key={`${comicId}_${i}`}/>
        )
    })

    const catalogTitle = activeName.map(({activeTab}, i) => {
        return (
            <h1 key={i}>{activeTab}</h1>
        )
    })

    const fiteredContent = !catalogFilter.length && !loading && !error ? <h2 className="noTitle" >Товары не найдены</h2> : catalogFilter
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null

    return (
        <div>
            {catalogTitle}
            <div className="catalog__list">
                <CatalogFilter updateCost={updateCost} updateAvailable={updateAvailable} filteredList={filteredList} comicId={comicId}/>
                <div className="sort__block">
                    <div className="sort__list">
                        {sortedCatalog}
                    </div>
                    <div className="catalog__block">
                        {errorMessage}
                        {spinner}
                        {fiteredContent}
                    </div>
                    <button 
                        disabled={newItemLoading}
                        className="error__btn more__btn"
                        style={{'display' : itemEnded ? 'none' : 'block'}}
                        onClick={() => {onUpdateList(activeCount + 6, false)}}><span>Ещё</span></button>
                </div>
            </div>
        </div>
    )
};

export default CatalogList;