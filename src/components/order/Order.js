import { useState } from 'react';
import InputMask from 'react-input-mask';

import Tabs from '../tabs/Tabs';
import OrderChose from './OrderChose';

import './order.scss'

const Order = () => {

    const [orderInp, setOrderInp] = useState(['', '', '', '', '', ''])
    const [chekInp, setChekInp] = useState([false, false, false, false, false])
    const [showPassword, setShowPassword] = useState(false)

    const onValueChange = (e) => {
        if (e.target.value.charAt(0) === ' ') {
            e.target.value = ''
        }
        
        setOrderInp(orderInp.map((item, i) => i === +e.target.name ? e.target.value : item))
    }

    const onShowPassword = () => {
        setShowPassword(showPassword => !showPassword)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!orderInp.includes('')) {
        }
    }

    const onInputExit = (number) => {
        switch (number) {
            case 0:
                if (orderInp[0].length < 6) {
                    setChekInp(chekInp.map((item, i) => i === 0 ? true : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 0 ? false : item))
                }
                break
            case 1:
                if (orderInp[1].includes('_')) {
                    setChekInp(chekInp.map((item, i) => i === 1 ? true : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 1 ? false : item))
                }
                break
            case 2:
                if (!orderInp[2].includes('@')) {
                    setChekInp(chekInp.map((item, i) => i === 2 ? true : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 2 ? false : item))
                }
                break
            case 3:
                if (orderInp[4].length < 7) {
                    setChekInp(chekInp.map((item, i) => i === 3 ? true : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 3 ? false : item))
                }
                break
            case 4:
                if (orderInp[4] !== orderInp[5]) {
                    setChekInp(chekInp.map((item, i) => i === 4 ? true : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 4 ? false : item))
                }
                break
        }
    }

    return (
        <div className="order">
            <h1 className="title">Оформить заказ</h1>
            <Tabs/>
            <div className="order__block">
            <div className="order__title">2. Контактная информация</div>
                <form className="order__column">
                    <div className="order__group">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="name">ФИО или Организация:</label>
                            <input onChange={onValueChange} 
                                onBlur={() => {onInputExit(0)}}
                                id="name" 
                                type="text"
                                className="order__input"
                                name='0'
                                value={orderInp[0]}/>
                        </div>
                        <div className="error__message" style={{color: chekInp[0] ? '#EF4444' : 'transparent'}}>Введите больше 6 символов</div>
                    </div>
                    <div className="order__group">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="tel">Телефон*:</label>
                            <InputMask onChange={onValueChange} 
                                    onBlur={() => {onInputExit(1)}} 
                                    mask="+7 (999) 999-99-99" 
                                    type="tel" id="tel" 
                                    className="order__input" name='1' 
                                    value={orderInp[1]}/>
                        </div>
                        <div className="error__message" style={{color: chekInp[1] ? '#EF4444' : 'transparent'}}>Введите корректный номер телефона</div>
                    </div>
                    <div className="order__group">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="mail">e-mail*:</label>
                            <input onChange={onValueChange} 
                                onBlur={() => {onInputExit(2)}}
                                id="mail" 
                                type="text" 
                                className="order__input"
                                name='2'
                                value={orderInp[2]}/>
                        </div>
                        <div className="error__message" style={{color: chekInp[2] ? '#EF4444' : 'transparent'}}>E-mail должен содержать "@"</div>
                    </div>
                    <div className="order__flex order__flex--none">
                        <label className="order__subtitle" htmlFor="comment">Комментарий к заказу:</label>
                        <textarea onChange={onValueChange}
                               id="comment" 
                               className="order__input order__input--comment"
                               name='3'
                               value={orderInp[3]}/>
                    </div>
                </form>
                <OrderChose onShowPassword={onShowPassword} item={'Создайте личный кабинет и получите доступ ко всем возможностям сайта'}/>
                <form style={{display: showPassword ? 'block' : 'none'}}>
                    <div className="order__group order__group--password">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="password">Пароль*:</label>
                            <input onChange={onValueChange} 
                                onBlur={() => {onInputExit(3)}}
                                id="password" 
                                type="password" 
                                className="order__input order__input--short"
                                name='4'
                                value={orderInp[4]}/>
                        </div>
                        <div className="error__message" style={{color: chekInp[3] ? '#EF4444' : 'transparent'}}>Введите больше 7 символов</div>
                    </div>
                    <div className="order__group">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="passwordNew">Подтвердить пароль*:</label>
                            <input onChange={onValueChange} 
                                onBlur={() => {onInputExit(4)}}
                                id="passwordNew" 
                                type="password"
                                className="order__input order__input--short"
                                name='5'
                                value={orderInp[5]}/>
                        </div>
                        <div className="error__message" style={{color: chekInp[4] ? '#EF4444' : 'transparent'}}>Пароли не совпадают</div>
                    </div>
                </form>
            </div>
            <div className="order__block">
            <div className="order__title">3. Способы оплаты</div>
            <OrderChose item={'В магазине (наличными и картой)'}/>
            <OrderChose item={'Оплата картой и по QR-коду'}/>
            </div>
        </div>
    );
};

export default Order;