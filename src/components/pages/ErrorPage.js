import { Link } from "react-router-dom";

import error404 from '../../resources/img/404.png'

const ErrorPage = () => {
    return (
        <div>
            <div className="error__img">
                <img src={error404} alt="" />
                <div className="error__text">Такой страницы не существует</div>
            </div>
            <Link className="error__btn" to='/'><span>Главная</span></Link>
        </div>
    );
};

export default ErrorPage;