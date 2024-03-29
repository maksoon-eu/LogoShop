import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import useShopService from "../../services/ShopService";

import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErorrMessage";
import SearchItem from "../searchItem/SearchItem";

import logo from '../../resources/img/logo-header.svg'
import time from '../../resources/img/time.svg'
import phone from '../../resources/img/phone.svg'

import './header.scss'

const Header = ({bagList, totalSum, onRenderItem}) => {
    const [bagListLen, setBagListLen] = useState(0)
    const [inputSearch, setInputSearch] = useState('')
    const [catalog, setCatalog] = useState([])
    const [focusActive, setFocusActive] = useState(false)

    const {getCatalogItems, error, loading} = useShopService();
    
    useEffect(() => {
        getCatalogItems('fittings')
            .then(onCatalogLoaded)
    }, [])

    useEffect(() => {
        setBagListLen(bagList.length)
    }, [bagList])
    
    const onCatalogLoaded = (catalog) => {
        setCatalog(catalog.itemList)
    }

    const onUpdateSearch = (e) => {
        setInputSearch(e.target.value)
    }

    const searchItems = () => {
        if (inputSearch.length === 0) {
            return []
        }

        return catalog.filter(item => {
            return item.name.indexOf(inputSearch) > -1
        }).slice(0, 2)
    }

    const onFocusActive = (bool) => {
        if (!bool) {
            setTimeout(() => setFocusActive(bool), 120);
        } else {
            setFocusActive(bool)
        }
    }

    const searchedItems = useMemo(() => searchItems(), [inputSearch]);

    const searchList = searchedItems.map(item => {
        return (
            <SearchItem catalog={item} onRenderItem={onRenderItem} key={item.id}/>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const finalContent = !searchList.length ? <div className="search__error">Товары не найдены</div> : searchList
    const content = !(loading || error) ? finalContent : null

    return (
        <header className="header">
            <div className="header__block">
                <Link to='/' className="header__block-item">
                    <img rel="preload" src={logo} alt="logo" as="image" />
                </Link>
                <div className="header__block-item search">
                    <input 
                        value={inputSearch} 
                        onChange={onUpdateSearch} 
                        onFocus={() => {onFocusActive(true)}} 
                        onBlur={() => {onFocusActive(false)}} 
                        type="text" className="search__input" 
                        placeholder="Введите запрос..."/>
                    <div className="header__modal" style={{display: focusActive ? 'flex' : 'none'}}>
                        {errorMessage}
                        {spinner}
                        {content}
                    </div>
                </div>
                <div className="header__block-item">
                    <div className="contact">
                        <span className="contact__text">Время работы:</span>
                        <span className="contact__info">
                            <img rel="preload" src={time} alt="time" />
                            Пн-Вс 10-19
                        </span>
                    </div>
                </div>
                <div className="header__block-item">
                    <div className="contact">
                        <span className="contact__text">Время работы:</span>
                        <span className="contact__info">
                            <img rel="preload" src={phone} alt="phone" />
                            <a href="tel:+74952128506">+7 (495) 212 85 06</a>
                        </span>
                    </div>
                </div>
                <div className="header__block-item">
                    <div className="account">
                        <a href="#">
                            <svg rel="preload" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.43325 13.7368C4.6956 15.0756 6.40771 15.8277 8.19293 15.8277C8.38677 15.8277 8.57267 15.9094 8.70973 16.0547C8.84679 16.2001 8.92379 16.3972 8.92379 16.6028C8.92379 16.8084 8.84679 17.0055 8.70973 17.1509C8.57267 17.2963 8.38677 17.3779 8.19293 17.3779C6.02003 17.3779 3.93613 16.4625 2.39966 14.833C0.863182 13.2035 0 10.9934 0 8.68896C0 6.3845 0.863182 4.17443 2.39966 2.54494C3.93613 0.915441 6.02003 0 8.19293 0C8.38677 0 8.57267 0.0816623 8.70973 0.227023C8.84679 0.372384 8.92379 0.569536 8.92379 0.775108C8.92379 0.980679 8.84679 1.17783 8.70973 1.32319C8.57267 1.46855 8.38677 1.55022 8.19293 1.55022C6.40771 1.55022 4.6956 2.30233 3.43325 3.6411C2.1709 4.97987 1.46172 6.79565 1.46172 8.68896C1.46172 10.5823 2.1709 12.398 3.43325 13.7368ZM13.574 5.46211L16.2408 8.16726C16.3722 8.30826 16.4428 8.49133 16.4384 8.67981C16.434 8.86829 16.3551 9.04823 16.2173 9.18357L13.5504 11.9709C13.4098 12.1162 13.2145 12.2025 13.0072 12.2109C12.7999 12.2193 12.5976 12.1491 12.4445 12.0158C12.2984 11.8757 12.2164 11.6863 12.2164 11.4889C12.2164 11.2915 12.2984 11.1021 12.4445 10.9621L13.8956 9.4227H6.42048C6.21245 9.4227 6.01294 9.34396 5.86585 9.20382C5.71875 9.06368 5.63611 8.87361 5.63611 8.67542C5.63611 8.47722 5.71875 8.28715 5.86585 8.14701C6.01294 8.00687 6.21245 7.92814 6.42048 7.92814H13.8642L12.4445 6.48589C12.36 6.41824 12.2914 6.33437 12.2433 6.23975C12.1951 6.14513 12.1685 6.0419 12.1651 5.93681C12.1617 5.83171 12.1816 5.72711 12.2235 5.62984C12.2655 5.53258 12.3285 5.44484 12.4084 5.37237C12.4884 5.29989 12.5835 5.24431 12.6876 5.20925C12.7916 5.17419 12.9023 5.16045 13.0123 5.16892C13.1223 5.17739 13.2292 5.20788 13.326 5.2584C13.4228 5.30893 13.5073 5.37834 13.574 5.46211Z" fill="#5A616C"/>
                            </svg>
                        </a>
                        <Link to="/account">
                            <svg rel="preload" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.38348 18.0641C6.00547 19.1478 7.91241 19.7263 9.86316 19.7263C12.4457 19.7124 14.9198 18.6916 16.7603 16.8831L16.7803 16.8787C16.8764 16.8595 16.9677 16.822 17.049 16.7682C17.1304 16.7145 17.2 16.6456 17.2541 16.5654C17.3082 16.4853 17.3457 16.3955 17.3643 16.3012C17.3696 16.2746 17.3733 16.2477 17.3755 16.2208C18.8759 14.4502 19.7137 12.2011 19.7263 9.86315C19.7263 7.9124 19.1478 6.00547 18.0641 4.38348C16.9803 2.7615 15.4398 1.4973 13.6376 0.750784C11.8353 0.00426649 9.85221 -0.191047 7.93895 0.189524C6.02569 0.570096 4.26823 1.50946 2.88885 2.88884C1.50946 4.26823 0.57009 6.02568 0.189518 7.93894C-0.191053 9.8522 0.00428372 11.8353 0.750801 13.6376C1.49732 15.4399 2.7615 16.9803 4.38348 18.0641ZM16.6269 14.7382C16.6845 14.6583 16.7407 14.5773 16.7955 14.4952C17.7117 13.1241 18.2007 11.5122 18.2007 9.86315C18.1966 7.65314 17.3169 5.5348 15.7542 3.97208C14.1915 2.40937 12.0732 1.52965 9.86316 1.52562C8.21415 1.52562 6.60217 2.01461 5.23108 2.93075C3.85998 3.84689 2.79133 5.14904 2.16028 6.67252C1.52923 8.196 1.36413 9.8724 1.68583 11.4897C1.94407 12.788 2.50667 14.0013 3.32169 15.0326C4.05996 14.0406 5.84991 12.6811 10.0554 12.6811C10.0696 12.6811 10.0837 12.6815 10.0978 12.6823C10.1119 12.6815 10.1261 12.6811 10.1404 12.6811C13.953 12.6811 15.7711 13.7966 16.6269 14.7382ZM15.6437 15.8714C14.8975 16.5894 14.0202 17.1657 13.0538 17.566C11.5303 18.1971 9.85389 18.3622 8.23657 18.0405C6.80661 17.756 5.4796 17.1023 4.38542 16.1487C4.69519 15.5869 5.89594 14.1571 10.0554 14.1571C10.1032 14.1571 10.1505 14.1526 10.1967 14.1438C13.7733 14.155 15.149 15.2299 15.6437 15.8714ZM8.0366 10.2484C8.57726 10.6096 9.21291 10.8025 9.86316 10.8025C10.7345 10.8005 11.5696 10.4535 12.1857 9.83735C12.8019 9.22121 13.1489 8.38611 13.1509 7.51476C13.1509 6.86451 12.958 6.22887 12.5968 5.68821C12.2355 5.14754 11.7221 4.72614 11.1213 4.4773C10.5206 4.22847 9.85951 4.16336 9.22176 4.29022C8.584 4.41708 7.99819 4.7302 7.53839 5.19C7.0786 5.64979 6.76546 6.2356 6.6386 6.87335C6.51174 7.51111 6.57687 8.17216 6.82571 8.77291C7.07455 9.37366 7.49594 9.88713 8.0366 10.2484ZM8.86497 6.02086C9.16044 5.82344 9.50781 5.71807 9.86316 5.71807C10.3391 5.72003 10.7949 5.90996 11.1314 6.24648C11.468 6.583 11.6579 7.03885 11.6598 7.51476C11.6598 7.87011 11.5545 8.21748 11.357 8.51295C11.1596 8.80841 10.879 9.03869 10.5507 9.17468C10.2224 9.31066 9.86116 9.34625 9.51263 9.27692C9.16411 9.2076 8.84398 9.03648 8.59271 8.78521C8.34144 8.53394 8.17031 8.2138 8.10098 7.86527C8.03166 7.51675 8.06724 7.15549 8.20323 6.82719C8.33922 6.49889 8.56951 6.21829 8.86497 6.02086Z" fill="#4B5563"/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="header__block-item flex">
                    <Link to="/cart" className="bag">
                        <div className="bag__img">
                            <svg rel="preload" width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.75739 5.16649V5.01204C3.80914 3.66519 4.37608 2.39088 5.33931 1.45643C6.30255 0.521977 7.58725 0 8.92385 0C10.2604 0 11.5451 0.521977 12.5083 1.45643C13.4715 2.39088 14.0385 3.66519 14.0902 5.01204V5.16649H14.5959C15.1188 5.16662 15.6357 5.27651 16.1131 5.48901C16.5904 5.70151 17.0176 6.01186 17.3666 6.39983C17.7156 6.7878 17.9786 7.24469 18.1386 7.74074C18.2986 8.23679 18.352 8.76087 18.2953 9.27884L17.4181 17.3135C17.3289 18.2315 16.8998 19.0835 16.2145 19.7033C15.5291 20.3231 14.6366 20.6662 13.7111 20.6657H5.04632C4.16193 20.669 3.30562 20.3565 2.63256 19.7847C1.9595 19.213 1.51421 18.4199 1.37745 17.5491L0.0579117 9.51448C-0.0386893 8.97795 -0.014201 8.4267 0.129606 7.90078C0.273412 7.37485 0.532902 6.88745 0.889281 6.47393C1.23915 6.06439 1.67406 5.73541 2.16394 5.50968C2.65382 5.28395 3.18707 5.16686 3.72678 5.16649H3.75739ZM12.5399 5.01204H5.30771C5.35078 4.07411 5.75055 3.18898 6.42398 2.54059C7.09742 1.89221 7.99276 1.53042 8.92385 1.53042C9.85493 1.53042 10.7502 1.89221 11.4236 2.54059C12.0971 3.18898 12.4968 4.07411 12.5399 5.01204ZM2.80397 6.92777C3.09314 6.79419 3.40806 6.72493 3.72678 6.72478L14.5807 6.69437C14.8885 6.69589 15.1926 6.76167 15.4734 6.88745C15.7542 7.01323 16.0055 7.19623 16.211 7.42467C16.4165 7.65311 16.5717 7.92192 16.6666 8.21377C16.7615 8.50562 16.7941 8.81406 16.7621 9.11921L15.9002 17.1919C15.8418 17.7294 15.5859 18.2264 15.1817 18.5871C14.7775 18.9478 14.2537 19.1467 13.7111 19.1454H5.04632C4.5245 19.1464 4.01948 18.9616 3.62231 18.6243C3.22513 18.2871 2.96195 17.8195 2.88014 17.3059L1.5605 9.27123C1.50849 8.95786 1.5256 8.63696 1.6105 8.33081C1.6954 8.02466 1.84611 7.74059 2.05221 7.49831C2.25831 7.25603 2.51481 7.06134 2.80397 6.92777ZM5.63607 11.2722C6.15485 11.2722 6.57542 10.8517 6.57542 10.3329C6.57542 9.8141 6.15485 9.39354 5.63607 9.39354C5.11728 9.39354 4.69672 9.8141 4.69672 10.3329C4.69672 10.8517 5.11728 11.2722 5.63607 11.2722ZM13.1508 10.3329C13.1508 10.8517 12.7303 11.2722 12.2115 11.2722C11.6927 11.2722 11.2722 10.8517 11.2722 10.3329C11.2722 9.8141 11.6927 9.39354 12.2115 9.39354C12.7303 9.39354 13.1508 9.8141 13.1508 10.3329Z" fill="#4B5563"/>
                                {bagListLen > 0 ? <circle cx="17" cy="2" r="2" fill="#EF4444"/> : ''}
                            </svg>
                        </div>
                        <div className="bag__text">
                            <div className="contact__flex">
                                <span className="contact__text">Товаров </span> 
                                <span className="contact__info">{bagListLen}</span>
                            </div>
                            <span className="contact__info">{`${totalSum} ₽`}</span>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;