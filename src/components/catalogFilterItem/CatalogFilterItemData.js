import { useState } from "react";

import './catalogFilterItemData.scss'

const CatalogFilterItemData = ({item, filteredList}) => {
    const [styleFilter, setStyleFilter] = useState('')

    const onFilterActive = () => {
        setStyleFilter(styleFilter => !styleFilter)
    }

    return (
        <div onClick={() => {onFilterActive(); filteredList(item)}} className={`filter__list-chek ${styleFilter ? 'filter__list-chek--active' : ''}`}>{item}</div>
    )
};

export default CatalogFilterItemData;