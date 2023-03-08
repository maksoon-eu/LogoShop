import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './choseSlider.scss';

import Slider from "react-slick";
import { useState } from "react";

const ChoseSlider = ({photo}) => {
    const [nav1, setNav1] = useState()
    const [nav2, setNav2] = useState()

    const settings1 = {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: nav2,
        infinite: false,
        ref: slider => setNav1(slider)
    };

    const settings2 = {
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        asNavFor: nav1,
        swipeToSlide: true,
        focusOnSelect: true,
        infinite: false,
        ref: slider => setNav2(slider)
    };

    return (
        <div className="slider__container chose__slider">
            <Slider {...settings2} className="small__slider">
                <div>
                    <div className="shose__item-small">
                        <img src={photo} alt="" />
                    </div>
                </div>
                <div>
                    <div className="shose__item-small">
                        <img src={photo} alt="" />
                    </div>
                </div>
                <div>
                    <div className="shose__item-small">
                        <img src={photo} alt="" />
                    </div>
                </div>
                <div>
                    <div className="shose__item-small">
                        <img src={photo} alt="" />
                    </div>
                </div>
            </Slider>
            <Slider {...settings1} className="big__slider">
                <div>
                    <div className="shose__item-big">
                        <img src={photo} alt="" />
                    </div>
                </div>
                <div>
                    <div className="shose__item-big">
                        <img src={photo} alt="" />
                    </div>
                </div>
                <div>
                    <div className="shose__item-big">
                        <img src={photo} alt="" />
                    </div>
                </div>
                <div>
                    <div className="shose__item-big">
                        <img src={photo} alt="" />
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default ChoseSlider;