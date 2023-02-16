import Slider from '../slider/Slider';
import InfoBlocks from '../infoBlocks/InfoBlocks'
import ProductList from '../productList/ProductList';
import EmailBanner from '../emailBanner/EmailBanner';
import RideBanner from '../rideBanner/RideBanner';
import Manufacturer from '../manufacturer/Manufacturer';

const MainPage = () => {
    return (
        <>
            <Slider/>
            <InfoBlocks/>
            <ProductList title={'Арматура'} comicId={'fittings'}/>
            <EmailBanner/>
            <ProductList title={'Вентиляция и кондиционирование'} comicId={'ventilation'}/>
            <ProductList title={'Изоляционные материалы'} comicId={'isolation'}/>
            <Manufacturer/>
            <ProductList title={'Вам может понадобиться'} comicId={'fittings'}/>
            <RideBanner/>
        </>
    );
};

export default MainPage;