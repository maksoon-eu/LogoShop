import './infoBloks.scss';

import ride1 from '../../resources/img/ride1.svg';
import ride2 from '../../resources/img/ride2.svg';
import ride3 from '../../resources/img/ride3.svg';
import ride4 from '../../resources/img/ride4.svg';

import { useEffect, useState } from 'react';
import useShopService from "../../services/ShopService";
import { NavLink } from "react-router-dom";

import ErrorMessage from '../errorMessage/ErorrMessage';
import Spinner from '../spiner/Spiner';


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

    const bloksList = infoBlocks.map(({name, photo, subdirectory, id}, i) => {
        const linkKey = subdirectory.map(({filterName}, i) => {
            return (
                <div style={{display: 'flex', alignItems: 'center'}} key={i}>
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
                <img src={photo} alt="" />
                <div className="blocks__link">
                    {linkKey}
                </div>
            </div>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
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
                        <img src={ride1} alt="" />
                    </div>
                    <div className="info__item-title">????????????????</div>
                    <div className="info__item-text">???????????????? ?????? ?????????? ?? ?????????? ???????????? ????????????, ?? ?????????????? ?????????? ?? ????????. ???????????????? ?????? ??????, ?????? ????????????????.</div>
                    <a href="#" className="info__item-link">??????????????????</a>
                </div>
                <div className="info__item">
                    <div className="info__item-img">
                        <img src={ride2} alt="" />
                    </div>
                    <div className="info__item-title">???? ??????????????????????</div>
                    <div className="info__item-text">???? ???????????????? ?????????????????????? ???????????????????? ???????????? ????????????????. ???????? ?????????? ???? ?????????????? ??????, ???? ???????????? ?????????????? ?????????????? ????????????.</div>
                    <a href="#" className="info__item-link">??????????????????</a>
                </div>
                <div className="info__item">
                    <div className="info__item-img">
                        <img src={ride3} alt="" />
                    </div>
                    <div className="info__item-title">?????? ????????????</div>
                    <div className="info__item-text">???? ?? ???????????????? ?????????????????? ?????? ?????????????? ?????????????? ?? ?????????????????? ???????????????? ?? ????????????????.</div>
                    <a href="#" className="info__item-link">??????????????????</a>
                </div>
                <div className="info__item">
                    <div className="info__item-img">
                        <img src={ride4} alt="" />
                    </div>
                    <div className="info__item-title">???????????? ???? ??????????</div>
                    <div className="info__item-text">?????????????????? ?? ???????? ?????????? ?????????? ?????????????? ?????? ?????? ????????????????: e-mail, ??????????????, ???????????????????? ???????? ?? ??????????????????????.</div>
                    <a href="#" className="info__item-link">??????????????????</a>
                </div>
            </div>
        </>
    );
};

export default InfoBlocks;