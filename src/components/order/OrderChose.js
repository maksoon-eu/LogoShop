import { useState } from "react";

const OrderChose = ({item}) => {
    const [styleFilter, setStyleFilter] = useState(false)

    const onFilterActive = () => {
        setStyleFilter(styleFilter => !styleFilter)
    }

    return (
        <div onClick={onFilterActive} className={`filter__list-chek ${styleFilter ? 'filter__list-chek--active' : ''}`}>{item}</div>
    )
};

export default OrderChose;