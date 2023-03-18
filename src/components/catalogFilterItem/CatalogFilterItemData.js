import { useState } from "react";

import './catalogFilterItemData.scss'

const CatalogFilterItemData = ({item, filteredList}) => {
    const [styleFilter, setStyleFilter] = useState(false)

    const onFilterActive = () => {
        setStyleFilter(styleFilter => !styleFilter)
    }

    return (
        <div onClick={() => {onFilterActive(); filteredList(item.filterNameProgram)}} className={`filter__list-chek ${styleFilter ? 'filter__list-chek--active' : ''}`}>{item.filterName}</div>
    )
};

export default CatalogFilterItemData;