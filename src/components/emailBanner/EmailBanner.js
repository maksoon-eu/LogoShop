import email from '../../resources/img/email.svg'
import '../../style/btn.scss'
import './emailBanner.scss'

const EmailBanner = () => {
    return (
        <div className="email-banner">
            <div className="email-banner__img">
                <img src={email} alt="" />
            </div>
            <div className="email-banner__text">
                <div className="email-banner__text-title">Подпишитесь на нашу рассылку</div>
                <div className="email-banner__text-subtitle">Подпишитесь на рассылку новостей, чтобы быть в курсе акций и скидок</div>
            </div>
            <div className="email-banner__input">
                <input type="text" placeholder="Ваша почта"/>
            </div>
            <div className="email-banner__btn">
                <button className="blue__btn">Подписаться</button>
            </div>
        </div>
    );
};

export default EmailBanner;