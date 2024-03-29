import { useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { LazyLoadImage } from "react-lazy-load-image-component";

import loading from '../../resources/img/loading.svg';
import minus from '../../resources/img/minus.svg';
import plus from '../../resources/img/plus.svg';

import './bagItem.scss'

const BagItem = ({catalog, onAddToBag, onTotalSum}) => {
    const {photo, name, price, id} = catalog
    const [cookies, setCookie, removeCookie] = useCookies([id]);

    const activeCount = useMemo(() => +(cookies[id] === undefined ? 1 : cookies[id]), [cookies[id]])

    const totalSum = useMemo(() => (price * activeCount), [price, cookies[id]]);

    const calcPlus = () => {
        if (activeCount > 0) {
            onTotalSum(price)
            setCookie(id, activeCount + 1)
        }
    }

    const calcMinus = () => {
        if (activeCount > 1) {
            onTotalSum(-price)
            setCookie(id, activeCount - 1)
        }
    }

    const removeCount = () => {
        removeCookie(id)
    }
    
    return (
        <div className="bagItem">
            <div className="bagItem__photo">
                <LazyLoadImage 
                    width='100' height='75'
                    src={photo}
                    placeholderSrc={loading}
                    alt="Item img"
                />
            </div>
            <div className="bagItem__name">
                <div className="bagItem__name-text">{name}</div>
                <div className="bagItem__name-id">{`Код: ${id}`}</div>
            </div>
            <div className="bagItem__price">{`${price} ₽`}</div>
            <div className="calc">
                <button className="calc__btn" onClick={calcMinus}>
                    <img src={minus} alt="" />
                </button>
                {activeCount}
                <button className="calc__btn" onClick={calcPlus}>
                    <img src={plus} alt="" />
                </button>
            </div>
            <div className="bagItem__price">{`${totalSum.toFixed(2)} ₽`}</div>
            <button className="bagItem__delete" onClick={() => {onAddToBag(catalog, totalSum); removeCount()}}>
                <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.1664 3.75742V2.50064C5.1664 1.83743 5.42789 1.20139 5.89335 0.732433C6.3588 0.263474 6.9901 1.2365e-05 7.64835 1.2365e-05H10.6611C10.9877 -0.00102238 11.3112 0.0628965 11.6133 0.188102C11.9153 0.313307 12.1898 0.497335 12.4211 0.729643C12.6524 0.961951 12.8359 1.23797 12.9612 1.54187C13.0864 1.84578 13.1508 2.17159 13.1508 2.50064V3.75742H17.5647C17.7643 3.75742 17.9557 3.83164 18.0968 3.96376C18.238 4.09588 18.3173 4.27508 18.3173 4.46193C18.3173 4.64877 18.238 4.82797 18.0968 4.96009C17.9557 5.09221 17.7643 5.16644 17.5647 5.16644H0.752557C0.552967 5.16644 0.361562 5.09221 0.22043 4.96009C0.079298 4.82797 0 4.64877 0 4.46193C0 4.27508 0.079298 4.09588 0.22043 3.96376C0.361562 3.83164 0.552967 3.75742 0.752557 3.75742H5.1664ZM11.5899 3.59368H6.72738V2.50064C6.72738 2.25455 6.82443 2.01853 6.99715 1.84452C7.16987 1.6705 7.40409 1.57274 7.64835 1.57274H10.6611C10.7827 1.5717 10.9032 1.59493 11.0159 1.6411C11.1285 1.68727 11.231 1.75545 11.3173 1.84172C11.4037 1.92798 11.4722 2.03063 11.519 2.14372C11.5658 2.25682 11.5899 2.37812 11.5899 2.50064V3.59368ZM12.7543 20.6655H5.57803C5.02592 20.6696 4.49168 20.4656 4.07719 20.0925C3.66271 19.7194 3.39699 19.2033 3.33075 18.6426L1.88501 7.4477C1.85919 7.24448 1.91335 7.03908 2.03557 6.8767C2.15779 6.71432 2.33805 6.60825 2.53672 6.58183C2.73539 6.55541 2.93618 6.61081 3.09492 6.73583C3.25367 6.86085 3.35737 7.04525 3.38319 7.24847L4.81394 18.4127C4.83257 18.6024 4.91967 18.7782 5.05818 18.9057C5.19669 19.0332 5.37668 19.1033 5.56303 19.1024H12.7393C12.9257 19.1033 13.1057 19.0332 13.2442 18.9057C13.3827 18.7782 13.4698 18.6024 13.4884 18.4127L14.9492 7.24847C14.9753 7.04742 15.0782 6.86515 15.2355 6.74162C15.3928 6.6181 15.5915 6.56339 15.7881 6.5895C15.9847 6.61621 16.1629 6.72154 16.2837 6.88241C16.4044 7.04328 16.4579 7.24656 16.4323 7.4477L14.9866 18.6426C14.9207 19.2007 14.6571 19.7147 14.2458 20.0874C13.8345 20.4602 13.3039 20.6658 12.7543 20.6655ZM11.4375 11.2722H6.40244C6.19919 11.2722 6.00427 11.198 5.86055 11.0658C5.71683 10.9337 5.63608 10.7545 5.63608 10.5677C5.63608 10.3808 5.71683 10.2016 5.86055 10.0695C6.00427 9.93739 6.19919 9.86317 6.40244 9.86317H11.4451C11.6484 9.86317 11.8433 9.93739 11.987 10.0695C12.1308 10.2016 12.2115 10.3808 12.2115 10.5677C12.2115 10.7545 12.1308 10.9337 11.987 11.0658C11.8433 11.198 11.6484 11.2722 11.4451 11.2722H11.4375ZM7.83522 15.4993H10.4821C10.6916 15.4993 10.8926 15.4003 11.0407 15.2242C11.1889 15.048 11.2722 14.8091 11.2722 14.5599C11.2722 14.3108 11.1889 14.0719 11.0407 13.8957C10.8926 13.7196 10.6916 13.6206 10.4821 13.6206H7.83522C7.62567 13.6206 7.42466 13.7196 7.27649 13.8957C7.12831 14.0719 7.04511 14.3108 7.04511 14.5599C7.04511 14.8091 7.12831 15.048 7.27649 15.2242C7.42466 15.4003 7.62567 15.4993 7.83522 15.4993Z" fill="#DC2626"/>
                </svg>
            </button>
        </div>
    )
};

export default BagItem;