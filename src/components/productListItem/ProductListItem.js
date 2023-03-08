import { useState } from 'react';
import { NavLink } from "react-router-dom";

import raitingPlus from '../../resources/img/raitingPlus.svg';
import raitingNone from '../../resources/img/raitingNone.svg';
import minus from '../../resources/img/minus.svg';
import plus from '../../resources/img/plus.svg';

import './productListItem.scss'


const ProductListItem = ({catalog, comicId, onRenderItem}) => {

    const {photo, name, price, raiting, available, sale, saleCount, newItem, id} = catalog

    const [count, setCount] = useState(1)
    const [toBag, setToBag] = useState(false)

    const addToBag = () => {
        setToBag(toBag => !toBag)
    }

    const calcPlus = () => {
        if (count > 0) {
            setCount(count + 1)
        }
    }

    const calcMinus = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const yellowRaiting = []
    for (let i = 0; i < raiting; i++) {
        yellowRaiting.push(<img key={i} src={raitingPlus} alt="" />)
    }

    const grayRaiting = []
    for (let i = 5; i < 10 - raiting; i++) {
        grayRaiting.push(<img key={i} src={raitingNone} alt="" />)
    }

    const newChek = newItem ? 'flex' : 'none'
    const saleChek = sale && available ? 'flex' : 'none'
    const btnDisabled = available ? false : true
    const calcBtnDisabled = toBag || !available ? true : false
    const saleColor = sale && available ? '#DC2626' : '#000000'
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
                <img src={photo} alt="" />
            </div>
            <NavLink to={`/${comicId}/${id}`} end onClick={() => {onRenderItem(id)}} className="list__item-text">{name}</NavLink>
            <div className="list__item-raiting">
                {yellowRaiting}
                {grayRaiting}
            </div>
            <div className="list__price">
                <div className="list__item-price" style={{color: saleColor}}>{available ? price : 'Нет в наличии'}</div>
                <div className="list__item-oldPrice" style={{display: saleChek}}>{(price * (1 + saleCount / 100)).toFixed(2)}</div>
            </div>
            <div className="list__btn">
                <div className="calc">
                    <button disabled={calcBtnDisabled} className="calc__btn" onClick={calcMinus}>
                        <img src={minus} alt="" />
                    </button>
                    {count}
                    <button disabled={calcBtnDisabled} className="calc__btn" onClick={calcPlus}>
                        <img src={plus} alt="" />
                    </button>
                </div>
                <div className="list__btn">
                    <button onClick={addToBag} disabled={btnDisabled} style={{backgroundColor: bgBtnColor}} className='list__btn-item'><span>В корзину</span></button>
                </div>
            </div>
        </div>
    )
};

export default ProductListItem;