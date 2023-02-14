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
            <ProductList title={'Арматура'} />
            <EmailBanner/>
            <ProductList title={'Вентиляция и кондиционирование'} />
            <ProductList title={'Изоляционные материалы'} />
            <Manufacturer/>
            <ProductList title={'Вам может понадобиться'} />
            <RideBanner/>
        </>
    );
};

export default MainPage;