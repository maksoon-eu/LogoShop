import cookie from 'cookie';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import BagItem from "../bagItem/BagItem";

const Bag = ({bagList, onAddToBag, onTotalSum}) => {
    const cookies = cookie.parse(document.cookie)
    const value = useMemo(() => +(cookies.activeSum === undefined ? 0 : cookies.activeSum), [cookies.activeSum])
    
    
    const bagRenderList = bagList.map(item => {
        return (
            <BagItem onTotalSum={onTotalSum} onAddToBag={onAddToBag} catalog={item} key={item.id}/>
        )
    })

    return (
        <div>
            <h1 className="title">Корзина</h1>
            {!bagRenderList.length ? <h2 className="card__length">Корзина пуста</h2> : bagRenderList}
            <div className="bag__ready" style={{display: bagRenderList.length ? 'flex' : 'none'}}>
                <div className="bag__final">Итого</div>
                <div>
                    <div className="bag__sum">{`${value.toFixed(2)} ₽`}</div>
                    <NavLink to='/order' style={{backgroundColor: '#10B981'}} className='list__btn-item item__btn-item'><span>Оформить заказ</span></NavLink>
                </div>
            </div>
        </div>
    );
};

export default Bag;