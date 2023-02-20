import { NavLink } from 'react-router-dom'

import logo from '../../resources/img/logo-footer.svg'
import time from '../../resources/img/time.svg'
import phone from '../../resources/img/phone.svg'
import pay from '../../resources/img/pay.svg'

import './footer.scss'

const Footer = () => {
    return (
        <footer>
            <div className="footer__block">
                <NavLink to={'/'} className="footer__block-item">
                    <img src={logo} alt="logo" />
                </NavLink>
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
            </div>
        </footer>
    );
};

export default Footer;