import './infoBloks.scss';

import ride1 from '../../resources/img/ride1.svg';
import ride2 from '../../resources/img/ride2.svg';
import ride3 from '../../resources/img/ride3.svg';
import ride4 from '../../resources/img/ride4.svg';

const InfoBlocks = () => {
    const bloks = [
        {name: 'Арматура', 
        photo: 'images/info1.svg', 
        links: {'PPR': '#', 'запорная арматура':'#', 'трубопроводная арматура':'#'}},
        {name: 'Вентиляция и кондиционирование', 
        photo: 'images/info2.svg', 
        links: {'Гибкие воздуховоды': '#', 'дренаж':'#', 'зимние комплекты':'#', 'сплит системы':'#'}},
        {name: 'Изоляция', 
        photo: 'images/info3.svg', 
        links: {'Защитные системы': '#', 'звукоизоляция':'#', 'техническа теплоизоляция':'#'}},
        {name: 'Инструмент', 
        photo: 'images/info4.svg',  
        links: {'Аксессуары': '#', 'горелки':'#', 'отрезной инструмент':'#', 'расходные материалы':'#'}},
        {name: 'Метизы и крепёж', 
        photo: 'images/info5.svg', 
        links: {'Анкер': '#', 'болты':'#', 'виброопоры':'#', 'гайка':'#'}},
        {name: 'Монтаж', 
        photo: 'images/info6.svg', 
        links: {'Ленты': '#', 'определение проточек':'#', 'пены клеи и герметики':'#', 'припои МАРР Газ':'#'}},
        {name: 'Огнезащита', 
        photo: 'images/info7.svg', 
        links: {'Огнезащита воздуховодов': '#', 'огнезащитные покрытия':'#', 'противопожарные муфты':'#'}},
        {name: 'Технические газы и жидкости', 
        photo: 'images/info8.svg',  
        links: {'Масла': '#', 'чладагенты':'#', 'чладоносители':'#'}},
        {name: 'Трубы и фиттинг', 
        photo: 'images/info9.svg', 
        links: {'PP-R': '#', 'медь':'#', 'нержавейка':'#', 'ПВХ':'#'}},
        {name: 'Холодоснабжение', 
        photo: 'images/info10.svg', 
        links: {'Автоматика': '#'}},
        {name: 'Электрика', 
        photo: 'images/info11.svg', 
        links: {'Гофра': '#', 'кабельная продукция':'#', 'системы прокладки кабеля':'#'}}
    ]

    const bloksList = bloks.map(({name, photo, links}, i) => {
        const linksList = Object.keys(links)
        const link = linksList.map((item, i) => {
            return <a key={i} className="blocks__item-link" href={links[item]}>{`${item}`}<span>{i === (linksList.length - 1) ? '' : ',  '}</span></a>
        })
        return (
            <div key={i} className="blocks__item">
                <div className="blocks__item-name">{name}</div>
                <img src={photo} alt="" />
                <div className="blocks__link">
                    {link}
                </div>
            </div>
        )
    })

    return (
        <>
            <div className="blocks">
                {bloksList}
            </div>
            <div className="info">
                <div className="info__item">
                    <div className="info__item-img">
                        <img src={ride1} alt="" />
                    </div>
                    <div className="info__item-title">Доставка</div>
                    <div className="info__item-text">Доставим ваш заказ в любой регион России, в удобное время и день. Работаем для вас, без выходных.</div>
                    <a href="#" className="info__item-link">Подробнее</a>
                </div>
                <div className="info__item">
                    <div className="info__item-img">
                        <img src={ride2} alt="" />
                    </div>
                    <div className="info__item-title">Мы гарантируем</div>
                    <div className="info__item-text">Мы гордимся безупречной репутацией нашего магазина. Если товар не устроит вас, вы всегда сможете вернуть деньги.</div>
                    <a href="#" className="info__item-link">Подробнее</a>
                </div>
                <div className="info__item">
                    <div className="info__item-img">
                        <img src={ride3} alt="" />
                    </div>
                    <div className="info__item-title">Как купить</div>
                    <div className="info__item-text">Мы с радостью подскажем как сделать покупки в интернете простыми и удобными.</div>
                    <a href="#" className="info__item-link">Подробнее</a>
                </div>
                <div className="info__item">
                    <div className="info__item-img">
                        <img src={ride4} alt="" />
                    </div>
                    <div className="info__item-title">Всегда на связи</div>
                    <div className="info__item-text">Связаться с нами можно любым удобным для вас способом: e-mail, телефон, социальные сети и мессенджеры.</div>
                    <a href="#" className="info__item-link">Подробнее</a>
                </div>
            </div>
        </>
    );
};

export default InfoBlocks;