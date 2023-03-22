import { useState, useEffect, useMemo } from 'react';
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCookies } from 'react-cookie';

import raitingPlus from '../../resources/img/raitingPlus.svg';
import raitingNone from '../../resources/img/raitingNone.svg';
import loading from '../../resources/img/loading.svg';
import plus from '../../resources/img/plus.svg';
import minus from '../../resources/img/minus.svg';
import availableImg from '../../resources/img/available.svg';
import notAvailableImg from '../../resources/img/notavailable.svg';

import './productListItem.scss'


const ProductListItemSecond = ({catalog, comicId, onRenderItem, onAddToBag, bagList, onTotalSum}) => {

    const {photo, name, price, raiting, available, sale, saleCount, newItem, id} = catalog

    const [cookies, setCookie] = useCookies([id]);
    const [toBag, setToBag] = useState(false)
    const activeCount = useMemo(() => +(cookies[id] === undefined ? 1 : cookies[id]), [cookies[id]])

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

    const calcPlus = () => {
        if (activeCount > 0) {
            if (toBag) {
                onTotalSum(price)
            }
            setCookie(id, activeCount + 1)
        }
    }

    const calcMinus = () => {
        if (activeCount > 1) {
            if (toBag) {
                onTotalSum(-price)
            }
            setCookie(id, activeCount - 1)
        }
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
        <div className="modify__item">
            <div className="modify__item-left">
                <div className="modify__item-id">{`Код: ${id}`}</div>
                <div className="modify__item-img">
                    <LazyLoadImage 
                        width='100%' height='100%'
                        src={photo}
                        placeholderSrc={loading}
                        alt="Item img"
                    />
                </div>
            </div>
            <div className="modify__item-descr">
                <NavLink to={`/${comicId}/${id}`} onClick={() => {onRenderItem(id)}} className="list__item-text modify__item-text">{name}</NavLink>
                <div className="modify__item-word">Тип товара: Арматура PPR; Бренд: Pro Aqua; Применение: описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание</div>
            </div>
            <div className="modify__item-right">
                <div className="modify__item-line"></div>
                <div className="modify__right-flex">
                    <div className="modify__item-flex">
                        <div className="list__item-sale modify__item-sale" style={{display: saleChek, right: twoItemActive}}>{`-${saleCount}%`}</div>
                        <div className="list__item-new modify__item-new" style={{display: newChek}}>Новинка</div>
                    </div>
                    <div className="modify__price">
                        <div className="modify__item-price" style={{color: availableColor}}>{`${price} ₽`}</div>
                        <div className="modify__item-oldPrice" style={{display: saleChek}}>{`${(price * (1 + saleCount / 100)).toFixed(2)} ₽`}</div>
                    </div>
                    <div className="list__item-raiting">
                        {stars}
                    </div>
                    <div className="modify__item-flex">
                        <div className="modify__item-photo">
                            <img src={available ? availableImg : notAvailableImg} alt="" />
                        </div>
                        <div className="modify__item-available">{available ? 'В наличии' : 'Нет в наличии'}</div>
                    </div>
                    <div className="list__btn">
                        <div className="calc">
                            <button className="calc__btn" onClick={calcMinus}>
                                <img src={minus} alt="" />
                            </button>
                            {activeCount}
                            <button className="calc__btn" onClick={calcPlus}>
                                <img src={plus} alt="" />
                            </button>
                        </div>
                        <button onClick={() => {onAddToBag(catalog, price*activeCount)}} disabled={btnDisabled} style={{backgroundColor: bgBtnColor}} className='list__btn-item'><span>В корзину</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductListItemSecond;