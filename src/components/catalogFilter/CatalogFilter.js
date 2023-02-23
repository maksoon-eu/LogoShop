import { useState, useEffect } from "react";
import useShopService from "../../services/ShopService";
import CatalogFilterItemData from "../catalogFilterItem/CatalogFilterItemData";
import CatalogFilterItem from "../catalogFilterItem/CataligFilterItem";

import "./catalogFIlter.scss"

const CatalogFilter = ({comicId, filteredList, updateCost, updateAvailable}) => {
    const [catalog, setCatalog] = useState([])
    const [filterInput, setFilterInput] = useState(['', ''])

    const filterAvaliable = [
        {filterName: "В наличии"}
    ]

    const filters = [
        {filterName: "Новинки", filterNameProgram: 'newItem'},
        {filterName: "Акции", filterNameProgram: 'sale'}
    ]

    useEffect(() => {
        getCatalog(comicId)
            .then(onCharLoaded)
    }, [comicId])

    useEffect(() => {
        updateCost(filterInput)
    }, [filterInput])

    const {getCatalog} = useShopService();

    const onCharLoaded = (catalog) => {
        setCatalog(catalog)
    }

    const onValueChange = (e) => {
        setFilterInput(filterInput.map((item, i) => i === +e.target.name ? e.target.value : item))
    }

    const filterDataList = catalog.map(({subdirectory}) => {
        return (
            <CatalogFilterItemData filteredList={filteredList} item={subdirectory} key={subdirectory.filterName} />
        )
    })

    const filterList = filters.map((item, i) => {
        return (
            <CatalogFilterItemData filteredList={filteredList} item={item} key={`${comicId}_${i}`} />
        )
    })

    const filterListAvaliable = filterAvaliable.map((item, i) => {
        return (
            <CatalogFilterItem updateAvailable={updateAvailable} item={item} key={`${comicId}_${i}`} />
        )
    })

    return (
        <div>
        <div className="filter__list">
            <div className="filter__name">Разновидности</div>
            {filterDataList}
            <span className="filter__line"></span>
            {filterList}
            {filterListAvaliable}
            <span className="filter__line"></span>
            <div className="filter__name">Цена</div>
            <div className="filter__price">
                <div className="filter__price-name">
                    <span className="filter__text">От</span>
                    <div className="filter__input">
                        <input 
                            onChange={onValueChange}
                            name="0"
                            value={filterInput[0]} 
                            className="filter__price-input" 
                            placeholder="100" 
                            type="number" /><span></span>
                    </div>
                </div>
                <div className="filter__price-name">
                    <span className="filter__text">До</span>
                    <div className="filter__input">
                        <input onChange={onValueChange}
                            name="1"
                            value={filterInput[1]} 
                            className="filter__price-input" 
                            placeholder="10000" 
                            type="number" /><span></span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CatalogFilter;