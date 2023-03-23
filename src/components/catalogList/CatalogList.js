import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import useShopService from "../../services/ShopService";

import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErorrMessage";
import ProductListItem from "../productListItem/ProductListItem";
import ProductListItemSecond from "../productListItem/ProductListItemSecond";
import CatalogFilter from '../catalogFilter/CatalogFilter';
import CatalogSort from "../catalogSort/CatalogSort";

import './catalogList.scss'

const CatalogList = ({onRenderItem, onAddToBag, bagList, onTotalSum}) => {
    const [catalog, setCatalog] = useState([])
    const [cost, setCost] = useState(0)
    const [activeName, setActiveName] = useState([])
    const [available, setAvailable] = useState(0)
    const [filters, setFilters] = useState([])
    const [sortItem, setSortItem] = useState()
    const [activeCount, setActiveCount] = useState(0)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [itemEnded, setItemEnded] = useState(false)
    const [modifyList, setModifyList] = useState(false)
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
        switch (sortItem) {
            case 'expensive':
                return filterList.sort((a, b) => b.price - a.price)
            case 'cheaply':
                return filterList.sort((a, b) => a.price - b.price)
            case 'alphabet':
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
            case 'popular':
                return filterList.sort((a, b) => b.raiting - a.raiting)
            }
        return filterList
    }

    const catalogFilterFirstType = sortingItems().map(item => {
        return (
            <ProductListItem onTotalSum={onTotalSum} bagList={bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem} comicId={comicId} catalog={item} key={item.id}/>
        )
    })

    const catalogFilterSecondType = sortingItems().map(item => {
        return (
            <ProductListItemSecond onTotalSum={onTotalSum} bagList={bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem} comicId={comicId} catalog={item} key={item.id}/>
        )
    })

    const onModifyList = (bool) => {
        setModifyList(bool)
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

    const sortedCatalog = sort.map((item, i) => {
        return (
            <CatalogSort sortItem={sortItem} sortCatalog={setSortCatalog} item={item} id={comicId} key={`${comicId}_${i}`}/>
        )
    })

    const catalogTitle = activeName.map(({activeTab}, i) => {
        return (
            <h1 className="title" key={i}>{activeTab}</h1>
        )
    })

    const chosenList = modifyList ? catalogFilterSecondType : catalogFilterFirstType
    const fiteredContent = !chosenList.length && !loading && !error ? <h2 className="noTitle" >Товары не найдены</h2> : chosenList
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
                        <div className="catalog__list-group">
                            <div className="catalog__list-mod" onClick={() => {onModifyList(false)}}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2 2V4.74H4.74V2H2ZM0 1.19C0 0.532785 0.532778 0 1.19 0H5.55C6.20723 0 6.74 0.532788 6.74 1.19V5.55C6.74 6.20721 6.20723 6.74 5.55 6.74H1.19C0.532778 6.74 0 6.20722 0 5.55V1.19ZM2 13.74V11H4.74V13.74H2ZM1.19 9C0.532778 9 0 9.53279 0 10.19V14.55C0 15.2072 0.532778 15.74 1.19 15.74H5.55C6.20723 15.74 6.74 15.2072 6.74 14.55V10.19C6.74 9.53279 6.20723 9 5.55 9H1.19ZM11 13.74V11H13.74V13.74H11ZM10.19 9C9.53278 9 9 9.53279 9 10.19V14.55C9 15.2072 9.53278 15.74 10.19 15.74H14.55C15.2072 15.74 15.74 15.2072 15.74 14.55V10.19C15.74 9.53279 15.2072 9 14.55 9H10.19ZM11 4.74V2H13.74V4.74H11ZM10.19 0C9.53278 0 9 0.532785 9 1.19V5.55C9 6.20722 9.53278 6.74 10.19 6.74H14.55C15.2072 6.74 15.74 6.20721 15.74 5.55V1.19C15.74 0.532788 15.2072 0 14.55 0H10.19Z" fill={!modifyList ? '#3B82F6' : 'black'}/>
                                </svg>
                            </div>
                            <div className="catalog__list-mod" onClick={() => {onModifyList(true)}}>
                                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2 4.74V2H4.74V4.74H2ZM1.19 0C0.532781 0 0 0.532781 0 1.19V5.55C0 6.20722 0.532784 6.74 1.19 6.74H5.55C6.20722 6.74 6.74 6.20722 6.74 5.55V1.19C6.74 0.532784 6.20722 0 5.55 0H1.19ZM2 13.27V10.53H4.74V13.27H2ZM1.19 8.53C0.532778 8.53 0 9.06278 0 9.72V14.08C0 14.7372 0.532778 15.27 1.19 15.27H5.55C6.20723 15.27 6.74 14.7372 6.74 14.08V9.72C6.74 9.06279 6.20723 8.53 5.55 8.53H1.19ZM8.96 3.39C8.96 2.83772 9.40771 2.39 9.96 2.39H22.51C23.0623 2.39 23.51 2.83772 23.51 3.39C23.51 3.94228 23.0623 4.39 22.51 4.39H9.96C9.40771 4.39 8.96 3.94228 8.96 3.39ZM9.96 10.9C9.40771 10.9 8.96 11.3477 8.96 11.9C8.96 12.4523 9.40771 12.9 9.96 12.9H22.51C23.0623 12.9 23.51 12.4523 23.51 11.9C23.51 11.3477 23.0623 10.9 22.51 10.9H9.96Z" fill={modifyList ? '#3B82F6' : 'black'}/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="catalog__block">
                        {errorMessage}
                        {spinner}
                        {fiteredContent}
                    </div>
                    <button 
                        disabled={newItemLoading}
                        className="error__btn more__btn"
                        style={{'display' : itemEnded || error || !chosenList.length ? 'none' : 'block'}}
                        onClick={() => {onUpdateList(activeCount + 6, false)}}><span>Ещё</span></button>
                </div>
            </div>
        </div>
    )
};

export default CatalogList;