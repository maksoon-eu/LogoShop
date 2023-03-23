import { Link } from "react-router-dom";

import slider1 from '../../resources/img/slider1.png'

import './slider.scss'
import '../../style/btn.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const SimpleSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 6000,
    };

    return (
        <div className="slider__container">
            <Slider {...settings}>
                <div>
                    <div className="slider__item">
                        <img src={slider1} alt="" />
                        <div className="slider__block">
                            <div className="slider__text">
                                <div className="slider__item-text">Скидки на инструмент</div>
                                <div className="slider__item-subtext">На все категории</div>
                            </div>
                            <Link to="/info" className="blue__btn">
                                <span>
                                    Подробнее об акции
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                <div className="slider__item">
                        <img src={slider1} alt="" />
                        <div className="slider__block">
                            <div className="slider__text">
                                <div className="slider__item-text">Скидки на инструмент</div>
                                <div className="slider__item-subtext">На все категории</div>
                            </div>
                            <Link to="/info" className="blue__btn">
                                <span>
                                    Подробнее об акции
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                <div className="slider__item">
                        <img rel="preload" src={slider1} alt="" />
                        <div className="slider__block">
                            <div className="slider__text">
                                <div className="slider__item-text">Скидки на инструмент</div>
                                <div className="slider__item-subtext">На все категории</div>
                            </div>
                            <Link to="/info" className="blue__btn">
                                <span>
                                    Подробнее об акции
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default SimpleSlider;