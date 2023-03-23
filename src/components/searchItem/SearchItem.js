import { useMemo } from "react";
import { Link } from "react-router-dom";

import raitingPlus from '../../resources/img/raitingPlus.svg';
import raitingNone from '../../resources/img/raitingNone.svg';
import availableImg from '../../resources/img/available.svg';
import notAvailableImg from '../../resources/img/notavailable.svg';

import './searchItem.scss'


const SearchItem = ({catalog, onRenderItem}) => {

    const {name, price, raiting, available, sale, saleCount, id} = catalog

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
    const saleColor = sale && available ? '#DC2626' : '#000000'
    const availableColor = !available ? '#D1D5DB' : saleColor
    const saleChek = sale && available ? 'flex' : 'none'

    return (
        <div className="search__item">
            <div className="search__item-left">
                <Link to={`/fittings/${id}`} onClick={() => {onRenderItem(id)}} className="list__item-text">{name}</Link>
                <div className="modify__item-flex">
                    <div className="modify__item-photo">
                        <img src={available ? availableImg : notAvailableImg} alt="" />
                    </div>
                    <div className="modify__item-available">{available ? 'В наличии' : 'Нет в наличии'}</div>
                </div>
            </div>
            <div className="search__item-right">
                <div className="search__item-raiting">
                    {stars}
                </div>
                <div className="search__price">
                    <div className="search__item-price" style={{color: availableColor}}>{`${price} ₽`}</div>
                    <div className="list__item-oldPrice" style={{display: saleChek}}>{(price * (1 + saleCount / 100)).toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
};

export default SearchItem;