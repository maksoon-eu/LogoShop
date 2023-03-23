import { useState, useEffect } from 'react';

import './account.scss'

const Account = () => {
    const [accountInp, setAccountInp] = useState(['', '', '', ''])
    const [chekInp, setChekInp] = useState([false, false, false, false])
    const [activeInput, setActiveInput] = useState()
    const [btnDisabled, setBtnDisabled] = useState(true)

    useEffect(() => {
        onInputExit(activeInput)
    }, [accountInp])

    useEffect(() => {
        onSubmit()
    }, [chekInp, accountInp])

    const onValueChange = (e) => {
        if (e.target.value.charAt(0) === ' ') {
            e.target.value = ''
        }
        
        setActiveInput(+e.target.name)
        setAccountInp(accountInp.map((item, i) => i === +e.target.name ? e.target.value : item))
    }

    const onSubmit = () => {
        if (!chekInp.includes(true) && !accountInp.includes('')) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    }

    const onInputExit = (number) => {
        switch (number) {
            case 0:
                if (accountInp[0].length >= 6) {
                    setChekInp(chekInp.map((item, i) => i === 0 ? false : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 0 ? true : item))
                }
                break
            case 1:
                if (accountInp[1].length >= 3) {
                    setChekInp(chekInp.map((item, i) => i === 1 ? false : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 1 ? true : item))
                }
                break
            case 2:
                if (accountInp[2].length < 7) {
                    setChekInp(chekInp.map((item, i) => i === 2 ? true : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 2 ? false : item))
                }
                break
            case 3:
                if (accountInp[2] !== accountInp[3]) {
                    setChekInp(chekInp.map((item, i) => i === 3 ? true : item))
                } else {
                    setChekInp(chekInp.map((item, i) => i === 3 ? false : item))
                }
                break
        }
    }

    return (
        <>
            <h1 className="title">Регистрация</h1>
            <div className="registr">
                <form className="order__column">
                    <div className="order__group">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="name">ФИО или Организация*:</label>
                            <input onChange={onValueChange}
                                id="name" type="text"
                                className="order__input"
                                name='0'
                                value={accountInp[0]}/>
                        </div>
                        <div className="error__message" style={{color: chekInp[0] ? '#EF4444' : 'transparent'}}>Введите больше 6 символов</div>
                    </div>
                    <div className="order__group">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="login">Логин*:</label>
                            <input onChange={onValueChange}
                                id="login" type="text"
                                className="order__input"
                                name='1'
                                value={accountInp[1]}/>
                        </div>
                        <div className="error__message" style={{color: chekInp[1] ? '#EF4444' : 'transparent'}}>Введите больше 3 символов</div>
                    </div>
                    <div className="order__group order__group--password">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="password">Пароль*:</label>
                            <input onChange={onValueChange}
                                id="password" type="password" 
                                className="order__input order__input--short"
                                name='2'
                                value={accountInp[2]}/>
                        </div>
                        <div className="error__message" style={{color: chekInp[2] ? '#EF4444' : 'transparent'}}>Введите больше 7 символов</div>
                    </div>
                    <div className="order__group">
                        <div className="order__flex">
                            <label className="order__subtitle" htmlFor="passwordNew">Подтвердить пароль*:</label>
                            <input onChange={onValueChange}
                                id="passwordNew" type="password"
                                className="order__input order__input--short"
                                name='3'
                                value={accountInp[3]}/>
                        </div>
                        <div className="error__message" style={{color: chekInp[3] ? '#EF4444' : 'transparent'}}>Пароли не совпадают</div>
                    </div>
                </form>
                <button disabled={btnDisabled} style={{backgroundColor: '#10B981'}} className='list__btn-item item__btn-item registr__btn'><span>Зарегистрироваться</span></button>
            </div>
        </>
    );
};

export default Account;