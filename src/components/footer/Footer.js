import logo from '../../resources/img/logo-footer.svg'
import time from '../../resources/img/time.svg'
import phone from '../../resources/img/phone.svg'
import pay from '../../resources/img/pay.svg'

import './footer.scss'

const Footer = () => {
    return (
        <footer>
            <div className="footer__block">
                <div className="footer__block-item">
                    <img src={logo} alt="logo" />
                </div>
                <div className="footer__block-item">
                    <div className="contact">
                        <span className="contact__text">Время работы:</span>
                        <span className="contact__info--footer">
                            <img src={time} alt="time" />
                            Пн-Вс 10-19
                        </span>
                    </div>
                </div>
                <div className="footer__block-item">
                    <div className="contact">
                        <span className="contact__text">Время работы:</span>
                        <span className="contact__info--footer">
                            <img src={phone} alt="phone" />
                            <a href="tel:+74952128506">+7 (495) 212 85 06</a>
                        </span>
                    </div>
                </div>
                <div className="footer__block-item">
                    <div className="account">
                        <a href="#">
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.43325 13.7368C4.6956 15.0756 6.40771 15.8277 8.19293 15.8277C8.38677 15.8277 8.57267 15.9094 8.70973 16.0547C8.84679 16.2001 8.92379 16.3972 8.92379 16.6028C8.92379 16.8084 8.84679 17.0055 8.70973 17.1509C8.57267 17.2963 8.38677 17.3779 8.19293 17.3779C6.02003 17.3779 3.93613 16.4625 2.39966 14.833C0.863182 13.2035 0 10.9934 0 8.68896C0 6.3845 0.863182 4.17443 2.39966 2.54494C3.93613 0.915441 6.02003 0 8.19293 0C8.38677 0 8.57267 0.0816623 8.70973 0.227023C8.84679 0.372384 8.92379 0.569536 8.92379 0.775108C8.92379 0.980679 8.84679 1.17783 8.70973 1.32319C8.57267 1.46855 8.38677 1.55022 8.19293 1.55022C6.40771 1.55022 4.6956 2.30233 3.43325 3.6411C2.1709 4.97987 1.46172 6.79565 1.46172 8.68896C1.46172 10.5823 2.1709 12.398 3.43325 13.7368ZM13.574 5.46211L16.2408 8.16726C16.3722 8.30826 16.4428 8.49133 16.4384 8.67981C16.434 8.86829 16.3551 9.04823 16.2173 9.18357L13.5504 11.9709C13.4098 12.1162 13.2145 12.2025 13.0072 12.2109C12.7999 12.2193 12.5976 12.1491 12.4445 12.0158C12.2984 11.8757 12.2164 11.6863 12.2164 11.4889C12.2164 11.2915 12.2984 11.1021 12.4445 10.9621L13.8956 9.4227H6.42048C6.21245 9.4227 6.01294 9.34396 5.86585 9.20382C5.71875 9.06368 5.63611 8.87361 5.63611 8.67542C5.63611 8.47722 5.71875 8.28715 5.86585 8.14701C6.01294 8.00687 6.21245 7.92814 6.42048 7.92814H13.8642L12.4445 6.48589C12.36 6.41824 12.2914 6.33437 12.2433 6.23975C12.1951 6.14513 12.1685 6.0419 12.1651 5.93681C12.1617 5.83171 12.1816 5.72711 12.2235 5.62984C12.2655 5.53258 12.3285 5.44484 12.4084 5.37237C12.4884 5.29989 12.5835 5.24431 12.6876 5.20925C12.7916 5.17419 12.9023 5.16045 13.0123 5.16892C13.1223 5.17739 13.2292 5.20788 13.326 5.2584C13.4228 5.30893 13.5073 5.37834 13.574 5.46211Z" fill="#fff"/>
                            </svg>
                        </a>
                        <a href="#">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.38348 18.0641C6.00547 19.1478 7.91241 19.7263 9.86316 19.7263C12.4457 19.7124 14.9198 18.6916 16.7603 16.8831L16.7803 16.8787C16.8764 16.8595 16.9677 16.822 17.049 16.7682C17.1304 16.7145 17.2 16.6456 17.2541 16.5654C17.3082 16.4853 17.3457 16.3955 17.3643 16.3012C17.3696 16.2746 17.3733 16.2477 17.3755 16.2208C18.8759 14.4502 19.7137 12.2011 19.7263 9.86315C19.7263 7.9124 19.1478 6.00547 18.0641 4.38348C16.9803 2.7615 15.4398 1.4973 13.6376 0.750784C11.8353 0.00426649 9.85221 -0.191047 7.93895 0.189524C6.02569 0.570096 4.26823 1.50946 2.88885 2.88884C1.50946 4.26823 0.57009 6.02568 0.189518 7.93894C-0.191053 9.8522 0.00428372 11.8353 0.750801 13.6376C1.49732 15.4399 2.7615 16.9803 4.38348 18.0641ZM16.6269 14.7382C16.6845 14.6583 16.7407 14.5773 16.7955 14.4952C17.7117 13.1241 18.2007 11.5122 18.2007 9.86315C18.1966 7.65314 17.3169 5.5348 15.7542 3.97208C14.1915 2.40937 12.0732 1.52965 9.86316 1.52562C8.21415 1.52562 6.60217 2.01461 5.23108 2.93075C3.85998 3.84689 2.79133 5.14904 2.16028 6.67252C1.52923 8.196 1.36413 9.8724 1.68583 11.4897C1.94407 12.788 2.50667 14.0013 3.32169 15.0326C4.05996 14.0406 5.84991 12.6811 10.0554 12.6811C10.0696 12.6811 10.0837 12.6815 10.0978 12.6823C10.1119 12.6815 10.1261 12.6811 10.1404 12.6811C13.953 12.6811 15.7711 13.7966 16.6269 14.7382ZM15.6437 15.8714C14.8975 16.5894 14.0202 17.1657 13.0538 17.566C11.5303 18.1971 9.85389 18.3622 8.23657 18.0405C6.80661 17.756 5.4796 17.1023 4.38542 16.1487C4.69519 15.5869 5.89594 14.1571 10.0554 14.1571C10.1032 14.1571 10.1505 14.1526 10.1967 14.1438C13.7733 14.155 15.149 15.2299 15.6437 15.8714ZM8.0366 10.2484C8.57726 10.6096 9.21291 10.8025 9.86316 10.8025C10.7345 10.8005 11.5696 10.4535 12.1857 9.83735C12.8019 9.22121 13.1489 8.38611 13.1509 7.51476C13.1509 6.86451 12.958 6.22887 12.5968 5.68821C12.2355 5.14754 11.7221 4.72614 11.1213 4.4773C10.5206 4.22847 9.85951 4.16336 9.22176 4.29022C8.584 4.41708 7.99819 4.7302 7.53839 5.19C7.0786 5.64979 6.76546 6.2356 6.6386 6.87335C6.51174 7.51111 6.57687 8.17216 6.82571 8.77291C7.07455 9.37366 7.49594 9.88713 8.0366 10.2484ZM8.86497 6.02086C9.16044 5.82344 9.50781 5.71807 9.86316 5.71807C10.3391 5.72003 10.7949 5.90996 11.1314 6.24648C11.468 6.583 11.6579 7.03885 11.6598 7.51476C11.6598 7.87011 11.5545 8.21748 11.357 8.51295C11.1596 8.80841 10.879 9.03869 10.5507 9.17468C10.2224 9.31066 9.86116 9.34625 9.51263 9.27692C9.16411 9.2076 8.84398 9.03648 8.59271 8.78521C8.34144 8.53394 8.17031 8.2138 8.10098 7.86527C8.03166 7.51675 8.06724 7.15549 8.20323 6.82719C8.33922 6.49889 8.56951 6.21829 8.86497 6.02086Z" fill="#fff"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer__pay">
                <div className="footer__pay-item footer__pay--text">
                    <div className="pay__subtitle">© 2003–2022 «МАГАЗИН»</div>
                    <p className="pay__text">При полном или частичном использовании материалов с сайта ссылка на источник обязательна.</p>
                    <p className="pay__text">Продолжая работу с сайтом, вы даете согласие на использование сайтом cookies и обработку персональных данных в целях функционирования сайта, проведения ретаргетинга, статистических исследований, улучшения сервиса и предоставления релевантной рекламной информации на основе ваших предпочтений и интересов.</p>
                </div>
                <div className="footer__pay-item">
                    <div className="pay__title">Мы принимаем к оплате</div>
                    <div className="pay__img">
                        <img src={pay} alt="" />
                    </div>
                </div>
                <div className="footer__pay-item"></div>
            </div>
        </footer>
    );
};

export default Footer;