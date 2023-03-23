import { useState, useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import raitingPlus from '../../resources/img/raitingPlus.svg';
import raitingNone from '../../resources/img/raitingNone.svg';
import plus from '../../resources/img/plus.svg';
import minus from '../../resources/img/minus.svg';
import loading from '../../resources/img/loading.svg';

import './productListItem.scss'


const ProductListItem = ({catalog, comicId, onRenderItem, onAddToBag, bagList, onTotalSum}) => {

    const {photo, name, price, raiting, available, sale, saleCount, newItem, id} = catalog

    const [cookies, setCookie, removeCookie] = useCookies([id]);
    const [toBag, setToBag] = useState(false)
    const activeCount = useMemo(() => +(cookies[id] === undefined ? 1 : cookies[id]), [cookies[id]])
    const [count, setCount] = useState(activeCount);

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

    const onSetActiveCount = (count) => {
        count === +cookies[id] ? removeCookie(id) : setCookie(id, count)
    }

    const calcPlus = () => {
        if (count > 0) {
            if (toBag) {
                onTotalSum(price)
                setCookie(id, activeCount + 1)
            }
            setCount(count => count + 1)
        }
    }

    const calcMinus = () => {
        if (count > 1) {
            if (toBag) {
                onTotalSum(-price)
                setCookie(id, activeCount - 1)
            }
            setCount(count => count - 1)
        }
    }

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
                    width='220' height='144'
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
                <div className="calc">
                    <button className="calc__btn" onClick={calcMinus}>
                        <img src={minus} alt="" />
                    </button>
                    {count}
                    <button className="calc__btn" onClick={calcPlus}>
                        <img src={plus} alt="" />
                    </button>
                </div>
                <button onClick={() => {onAddToBag(catalog, price*count); onSetActiveCount(count)}} disabled={btnDisabled} style={{backgroundColor: bgBtnColor}} className='list__btn-item'><span>В корзину</span></button>
            </div>
        </div>
    )
};

export default ProductListItem;