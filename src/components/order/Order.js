import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';

import Tabs from '../tabs/Tabs';
import OrderChose from './OrderChose';
import OrderChoseLimited from './OrderChoseLimited';

import './order.scss'
import payImg from '../../resources/img/pay.svg'
import location from '../../resources/img/location.svg'

const Order = ({totalSum, bagList}) => {

    const [orderInp, setOrderInp] = useState(['', '', '', '', '', ''])
    const [chekInp, setChekInp] = useState([false, false, false, false, false])
    const [showPassword, setShowPassword] = useState(false)
    const [activeInput, setActiveInput] = useState()
    const [chekChekbox, setChekChekbox] = useState([false, false])
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [chosePay, setChosePay] = useState('')

    const cartList = bagList.map((item, i) => {
        return (
            <div key={i} className="inner__list">
                <div className="inner__list-name">{item.name}</div>
                <div className="inner__list-price">{`${item.price} ₽`}</div>
            </div>
        )
    })

    useEffect(() => {
        onInputExit(activeInput)
    }, [activeInput, orderInp])

    useEffect(() => {
        onSubmit()
    }, [chekInp, orderInp, showPassword, chosePay, chekChekbox])

    const onValueChange = (e) => {
        if (e.target.value.charAt(0) === ' ') {
            e.target.value = ''
        }
        
        setActiveInput(+e.target.name)
        setOrderInp(orderInp.map((item, i) => i === +e.target.name ? e.target.value : item))
    }

    const onChekChekbox = (number) => {
        setChekChekbox(chekChekbox.map((item, i) =>{
            if (i === number) {
                if (!item) {
                    return true
                } else {
                    return false
                }
            } else {
                return item
            }
        }))
    }

    const onShowPassword = () => {
        setShowPassword(showPassword => !showPassword)
    }

    const onSubmit = () => {
        if (!chekInp.includes(true) && !orderInp.slice(0,3).includes('') && !orderInp[1].includes('_') && chosePay !== '' && !chekChekbox.includes(false) && totalSum !== '0.00') {
            if (showPassword) {
                if (!orderInp.slice(4,6).includes('')) {
                    setBtnDisabled(false)
                } else {
                    setBtnDisabled(true)
                }
            } else {
                setBtnDisabled(false)
            }
        } else {
            setBtnDisabled(true)
        }
    }

    const onInputExit = (number) => {
        switch (number) {
            case 0:
                if (orderInp[0].length >= 6) {
                    setChekInp(chekInp.map((item, i) => i === 0 ? false : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 0 ? true : item))
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
            case 4:
                if (orderInp[4].length < 7) {
                    setChekInp(chekInp.map((item, i) => i === 3 ? true : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 3 ? false : item))
                }
                break
            case 5:
                if (orderInp[4] !== orderInp[5]) {
                    setChekInp(chekInp.map((item, i) => i === 4 ? true : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 4 ? false : item))
                }
                break
        }
    }

    const onChosePay = (payNew) => {
        setChosePay(pay => pay === payNew ? '' : payNew)
    }

    return (
        <div className="order">
            <h1 className="title">Оформить заказ</h1>
            <div className="summaryInformation">
                <div className="summaryInformation__inner">
                    <div className="inner__location">
                        <div className="inner__location-img">
                            <img src={location} alt="" />
                        </div>
                        <div className="inner__location-text">Магазин: адрес</div>
                    </div>
                    <div className="inner__title">Ваш заказ</div>
                    {cartList}
                    <div className="inner__line"></div>
                    <div className="inner__total">
                        <div className="inner__total-text">Итого:</div>
                        <div className="inner__total-cost">{`${totalSum} ₽`}</div>
                    </div>
                </div>
            </div>
            <Tabs/>
            <div className="order__block">
                <div className="order__title">2. Контактная информация</div>
                <form className="order__column">
                    <div className="order__group">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="name">ФИО или Организация:</label>
                            <input onChange={onValueChange}
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
                <div onClick={onShowPassword} className="showPassword">
                    <OrderChose item={'Создайте личный кабинет и получите доступ ко всем возможностям сайта'}/>
                </div>
                <form style={{display: showPassword ? 'block' : 'none'}}>
                    <div className="order__group order__group--password">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="password">Пароль*:</label>
                            <input onChange={onValueChange}
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
                <div className="order__flex order__flex--pay">
                    <OrderChoseLimited chosePay={chosePay} onChosePay={onChosePay} item={'В магазине (наличными и картой)'}/>
                    <OrderChoseLimited chosePay={chosePay} onChosePay={onChosePay} item={'Оплата картой и по QR-коду'}/>
                    <div className="order__block-img">
                        <img src={payImg} alt="" />
                    </div>
                </div>
            </div>
            <div className="order__block">
                <div className="order__title">4.Подтверждение заказа</div>
                <div className="order__flex order__flex--pay">
                    <div className="order__flex-left">
                        <div onClick={() => {onChekChekbox(0)}} className="chekChekbox">
                            <OrderChose item={'Согласен на обработку моих'}/>
                            <Link className="orderChose__link" to="/info"> персональных данных*</Link>
                        </div>
                        <div onClick={() => {onChekChekbox(1)}} className="chekChekbox">
                            <OrderChose item={'Согласен с'}/>
                            <Link className="orderChose__link" to="/info"> правилами оказания услуг*</Link>
                        </div>
                        <OrderChose item={'Согласен получать новости и спецпредложения'}/>
                        <div className="main__pole">* Обязательные поля</div>
                    </div>
                    <div className="order__flex-right">
                        <div className="bag__final">Итого</div>
                        <div>
                            <div className="bag__sum">{`${totalSum} ₽`}</div>
                            <button disabled={btnDisabled} style={{backgroundColor: '#10B981'}} className='list__btn-item item__btn-item'><span>Перейти к оплате</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;