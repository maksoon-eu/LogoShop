import car from '../../resources/img/car.svg'
import './rideBanner.scss'

const RideBanner = () => {
    return (
        <div className="ride-banner">
            <div className="email-banner__img">
                <img src={car} alt="" />
            </div>
            <div className="ride-banner__text">
                <div className="ride-banner__text-title">Доставка во все регионы России!</div>
                <div className="ride-banner__text-subtitle">Вы делаете покупки, а мы с любовью доставляем ваш заказ в любой уголок нашей необъятной родины. А за заказ от 2 500 рублей доставка будет абсолютно бесплатной.</div>
            </div>
            <div className="ride-banner__btn">
                <button className="blue__btn">Подробнее</button>
            </div>
        </div>
    );
};

export default RideBanner;