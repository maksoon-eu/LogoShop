import { useState, useEffect, useMemo } from 'react';
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import raitingPlus from '../../resources/img/raitingPlus.svg';
import raitingNone from '../../resources/img/raitingNone.svg';
import loading from '../../resources/img/loading.svg';

import './productListItem.scss'


const ProductListItem = ({catalog, comicId, onRenderItem, onAddToBag, bagList}) => {

    const {photo, name, price, raiting, available, sale, saleCount, newItem, id} = catalog

    const [toBag, setToBag] = useState(false)

    useEffect(() => {
        if (bagList.length > 0) {
            if (bagList.some(item => item.id === catalog.id)) {
                setToBag(true)
            } else {
                setToBag(false)
            }
        } else {
            setToBag(false)
        }
    }, [bagList])

    const addAllRaiting = () => {
        const allRaiting = []
        for (let i = 0; i < raiting; i++) {
            allRaiting.push(<img key={i} src={raitingPlus} alt="" />)
        }
        for (let i = 5; i < 10 - raiting; i++) {
            allRaiting.push(<img key={i} src={raitingNone} alt="" />)
        }
        return allRaiting
    }

    const stars = useMemo(() => addAllRaiting(raiting), []);
    const newChek = newItem ? 'flex' : 'none'
    const saleChek = sale && available ? 'flex' : 'none'
    const btnDisabled = available ? false : true
    const saleColor = sale && available ? '#DC2626' : '#000000'
    const availableColor = !available ? '#D1D5DB' : saleColor
    const twoItemActive = sale && newItem ? '108px' : '11px'

    let bgBtnColor = '#10B981'
    if (available === false) {
        bgBtnColor = '#F3F4F6'
    } 
    if (toBag) {
        bgBtnColor = '#064E3B'
    }

    return (
        <div className="list__item">
            <div className="list__item-sale" style={{display: saleChek, right: twoItemActive}}>{`-${saleCount}%`}</div>
            <div className="list__item-new" style={{display: newChek}}>Новинка</div>
            <div className="list__item-img">
                <LazyLoadImage 
                    width='100%' height='100%'
                    src={photo}
                    placeholderSrc={loading}
                    alt="Item img"
                />
            </div>
            <NavLink to={`/${comicId}/${id}`} onClick={() => {onRenderItem(id)}} className="list__item-text">{name}</NavLink>
            <div className="list__item-raiting">
                {stars}
            </div>
            <div className="list__price">
                <div className="list__item-price" style={{color: availableColor}}>{`${price} ₽`}</div>
                <div className="list__item-oldPrice" style={{display: saleChek}}>{(price * (1 + saleCount / 100)).toFixed(2)}</div>
            </div>
            <div className="list__item-available">{available ? '' : 'Нет в наличии'}</div>
            <div className="list__btn">
                <button onClick={() => {onAddToBag(catalog, price)}} disabled={btnDisabled} style={{backgroundColor: bgBtnColor}} className='list__btn-item'><span>В корзину</span></button>
            </div>
        </div>
    )
};

export default ProductListItem;