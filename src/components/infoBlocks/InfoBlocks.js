import './infoBloks.scss';

import ride1 from '../../resources/img/ride1.svg';
import ride2 from '../../resources/img/ride2.svg';
import ride3 from '../../resources/img/ride3.svg';
import ride4 from '../../resources/img/ride4.svg';

import { useEffect, useState } from 'react';
import useShopService from "../../services/ShopService";
import { NavLink } from "react-router-dom";

import ErrorMessage from '../errorMessage/ErorrMessage';
import Skeleton from '../skeleton/Skeleton';


const InfoBlocks = () => {

    const [infoBlocks, setInfoBlocks] = useState([])

    const {getCatalog, error, loading} = useShopService();

    useEffect(() => {
        getCatalog()
            .then(onCatalogLoaded)
    }, [])
    
    const onCatalogLoaded = (catalog) => {
        setInfoBlocks(catalog)
    }

    const skeleton = () => {
        return (
            <>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </>
        )
    }

    const bloksList = infoBlocks.map(({name, photo, subdirectory, id}, i) => {
        const linkKey = subdirectory.map(({filterName}, i) => {
            return (
                <div className="blocks__list" key={i}>
                    <NavLink className="blocks__item-link" 
                    to={`/${id}`}>{filterName}
                    </NavLink>
                    <span style={{whiteSpace: 'pre', marginBottom: '2px'}}>{i === subdirectory.length - 1 ? '' : ',  '}</span>
                </div>
            )
        })

        return (
            <div key={i} className="blocks__item">
                <NavLink 
                    to={`/${id}`} 
                    end 
                    className="blocks__item-name">{name}</NavLink>
                <img rel="preload" src={photo} alt="" as="images"/>
                <div className="blocks__link">
                    {linkKey}
                </div>
            </div>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? skeleton() : null
    const content =  !(loading || error) ? bloksList : null

    return (
        <>
            <div className="blocks">
                {errorMessage}
                {spinner}
                {content}
            </div>
            <div className="info">
                <div className="info__item">
                    <div className="info__item-img">
                        <img rel="preload" src={ride1} alt="" />
                    </div>
                    <div className="info__item-title">Доставка</div>
                    <div className="info__item-text">Доставим ваш заказ в любой регион России, в удобное время и день. Работаем для вас, без выходных.</div>
                    <NavLink to='/info' className="info__item-link">Подробнее</NavLink>
                </div>
                <div className="info__item">
                    <div className="info__item-img">
                        <img rel="preload" src={ride2} alt="" />
                    </div>
                    <div className="info__item-title">Мы гарантируем</div>
                    <div className="info__item-text">Мы гордимся безупречной репутацией нашего магазина. Если товар не устроит вас, вы всегда сможете вернуть деньги.</div>
                    <NavLink to='/info' className="info__item-link">Подробнее</NavLink>
                </div>
                <div className="info__item">
                    <div className="info__item-img">
                        <img rel="preload" src={ride3} alt="" />
                    </div>
                    <div className="info__item-title">Как купить</div>
                    <div className="info__item-text">Мы с радостью подскажем как сделать покупки в интернете простыми и удобными.</div>
                    <NavLink to='/info' className="info__item-link">Подробнее</NavLink>
                </div>
                <div className="info__item">
                    <div className="info__item-img">
                        <img rel="preload" src={ride4} alt="" />
                    </div>
                    <div className="info__item-title">Всегда на связи</div>
                    <div className="info__item-text">Связаться с нами можно любым удобным для вас способом: e-mail, телефон, социальные сети и мессенджеры.</div>
                    <NavLink to='/info' className="info__item-link">Подробнее</NavLink>
                </div>
            </div>
        </>
    );
};

export default InfoBlocks;