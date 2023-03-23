import { useState, useEffect, useMemo } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import moment from 'moment'

import ChoseSlider from '../choseSlider/ChoseSlider';
import AddRewiewForm from '../addRewiewForm/AddRewiewForm';

import raitingPlus from '../../resources/img/raitingPlus.svg';
import raitingNone from '../../resources/img/raitingNone.svg';
import home from '../../resources/img/home.svg';
import ride from '../../resources/img/ride.svg';
import minus from '../../resources/img/minus.svg';
import plus from '../../resources/img/plus.svg';

import './choseItem.scss';

const ChozeItem = ({catalog, onAddToBag, bagList, onTotalSum}) => {
    const [toBag, setToBag] = useState(false)
    const {comicId} = useParams()

    const {photo, name, price, raiting, available, sale, saleCount, newItem, id} = catalog

    const [cookies, setCookie, removeCookie] = useCookies([id]);
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

    const [rewiew, setRewiew] = useState([
        {name: 'Игорь', text: 'Тут написан отзыв', adv: 'Достоинства', disadv: 'Недостатки', newRaiting: 3}
    ])

    const onAddRewiew = (name, text, adv, disadv, newRaiting) => {
        const newItem = {
            name, 
            text,
            adv,
            disadv,
            newRaiting
        }

        setRewiew(rewiew => rewiew.concat(newItem))
    }

    const addAllRaiting = (newRaining) => {
        const allRaiting = []
        for (let i = 0; i < newRaining; i++) {
            allRaiting.push(<img key={i} src={raitingPlus} alt="" />)
        }
        for (let i = 5; i < 10 - newRaining; i++) {
            allRaiting.push(<img key={i} src={raitingNone} alt="" />)
        }
        return allRaiting
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

    const onSetActiveCount = (count) => {
        count === +cookies[id] ? removeCookie(id) : setCookie(id, count)
    }

    const rewiewList = rewiew.map((item, i) => {
        const stars = addAllRaiting(item.newRaiting)

        return (
            <div key={`${comicId}_${i}`} className="rewiews__block-item">
                <div className="rewiews__item-name">{item.name}</div>
                <div className="rewiews__item-text">{item.text}</div>
                <div className="rewiews__item-name">Достоинства</div>
                <div className="rewiews__item-text">{item.adv}</div>
                <div className="rewiews__item-name">Недостатки</div>
                <div className="rewiews__item-text">{item.disadv}</div>
                <div className="rewiews__item-abs">
                    <div className="rewiews__item-data">{moment().format("DD.MM.YYYY")}</div>
                    <div className="rewiews__item-raiting">{stars}</div>
                </div>
            </div>
        )
    })

    let bgBtnColor = available ? '#10B981' : '#F3F4F6'
    bgBtnColor = toBag ? '#064E3B' : bgBtnColor

    const stars = useMemo(() => addAllRaiting(raiting), []);
    const newChek = newItem ? 'flex' : 'none'
    const saleChek = sale && available ? 'flex' : 'none'
    const btnDisabled = available ? false : true
    const saleColor = sale && available ? '#DC2626' : '#000000'

    return (
        <>
            <div className="item">
                <div className="item__left">
                    <div className="item__left-name">{name}</div>
                    <ChoseSlider photo={photo} />
                </div>
                <div className="item__right">
                    <div className="item__right-id">{`Код: ${id}`}</div>
                    <div className="item__right-mod">
                        <div className="item__right-sale">{`-${saleCount}%`}</div>
                        <div className="item__right-new" style={{display: newChek}}>Новинка</div>
                    </div>
                    <div className="item__right-price">
                        <div className="item__right-newPrice" style={{color: saleColor}}>{available ? `${price} ₽` : 'Нет в наличии'}</div>
                        <div className="item__right-oldPrice" style={{display: saleChek}}>{`${(price * (1 + saleCount / 100)).toFixed(2)} ₽`}</div>
                    </div>
                    <div className="item__right-raiting">
                        {stars}
                    </div>
                    <div className="list__btn items__btn">
                        <div className="calc">
                            <button className="calc__btn" onClick={calcMinus}>
                                <img src={minus} alt="" />
                            </button>
                            {count}
                            <button className="calc__btn" onClick={calcPlus}>
                                <img src={plus} alt="" />
                            </button>
                        </div>
                        <button onClick={() => {onAddToBag(catalog, price*count); onSetActiveCount(count)}} disabled={btnDisabled} style={{backgroundColor: bgBtnColor}} className='list__btn-item item__btn-item'><span>В корзину</span></button>
                    </div>
                    <div className="line"></div>
                    <div className="item__right-ride">
                        <div className="ride">
                            <div className="ride__img">
                                <img src={home} alt="" />
                            </div>
                            <div className="ride__text">
                                <NavLink to="/order">Самовывоз</NavLink> сегодня через 2 часа
                            </div>
                        </div>
                        <div className="ride">
                            <div className="ride__img">
                                <img src={ride} alt="" />
                            </div>
                            <div className="ride__text">
                                <NavLink to="/order">Доставка</NavLink> завтра до 18:00
                            </div>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="item__right-descr">
                        <div className="descr">
                            <div className="descr__text">Харакетристика</div>
                            <div className="descr__dash"></div>
                            <div className="descr__text">111</div>
                        </div>
                        <div className="descr">
                            <div className="descr__text">Харакетристика</div>
                            <div className="descr__dash"></div>
                            <div className="descr__text">222</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="translate">
                <div className="translate__title">Описание</div>
                <div className="translate__text">Тип товара: Арматура PPR; Бренд: Pro Aqua; Применение: описание описание описание описание описание описание описание описание описание описание описание описание описание описание описаниеТип товара: Арматура PPR; Бренд: Pro Aqua; Применение: описание описание описание описание описание описание описание описание описание описание описание описание описание описание описаниеТип товара: Арматура PPR; Бренд: Pro Aqua; Применение: описание описание описание описание описание описание описание описание описание описание описание описание описание описание описание</div>
            </div>
            <div className="modific">
                <div className="translate__title">Характеристики</div>
                <div className="item__right-descr modific__descr">
                    <div className="descr">
                        <div className="descr__text">Харакетристика</div>
                        <div className="descr__dash"></div>
                        <div className="descr__text">222</div>
                    </div>
                    <div className="descr">
                        <div className="descr__text">Харакетристика</div>
                        <div className="descr__dash"></div>
                        <div className="descr__text">222</div>
                    </div>
                    <div className="descr">
                        <div className="descr__text">Харакетристика</div>
                        <div className="descr__dash"></div>
                        <div className="descr__text">222</div>
                    </div>
                    <div className="descr">
                        <div className="descr__text">Харакетристика</div>
                        <div className="descr__dash"></div>
                        <div className="descr__text">222</div>
                    </div>
                    <div className="descr">
                        <div className="descr__text">Харакетристика</div>
                        <div className="descr__dash"></div>
                        <div className="descr__text">222</div>
                    </div>
                    <div className="descr">
                        <div className="descr__text">Харакетристика</div>
                        <div className="descr__dash"></div>
                        <div className="descr__text">222</div>
                    </div>
                </div>
            </div>
            <div className="rewiews">
                <div className="translate__title">Отзывы</div>
                <div className="rewiews__flex">
                    <div className="rewiews__block">
                        {rewiewList}
                    </div>
                    <div className="rewiew__form">
                        <AddRewiewForm onAddRewiew={onAddRewiew}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChozeItem;