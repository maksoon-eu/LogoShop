import { useState } from "react";

import './catalogFilterItemData.scss'

const CatalogFilterItem = ({item, updateAvailable}) => {
    const [styleFilter, setStyleFilter] = useState(false)

    const onFilterActive = () => {
        setStyleFilter(styleFilter => !styleFilter)
    }

    return (
        <div onClick={() => {updateAvailable(); onFilterActive()}} className={`filter__list-chek ${styleFilter ? 'filter__list-chek--active' : ''}`}>{item.filterName}</div>
    )
};

export default CatalogFilterItem;