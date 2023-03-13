import Slider from '../slider/Slider';
import InfoBlocks from '../infoBlocks/InfoBlocks'
import ProductList from '../productList/ProductList';
import EmailBanner from '../emailBanner/EmailBanner';
import RideBanner from '../rideBanner/RideBanner';
import Manufacturer from '../manufacturer/Manufacturer';

const MainPage = ({onRenderItem, onAddToBag, bagList}) => {
    return (
        <>
            <Slider/>
            <InfoBlocks/>
            <ProductList onAddToBag={onAddToBag} bagList={bagList} onRenderItem={onRenderItem} title={'Арматура'} comicId={'fittings'}/>
            <EmailBanner/>
            <ProductList onAddToBag={onAddToBag} bagList={bagList} onRenderItem={onRenderItem} title={'Вентиляция и кондиционирование'} comicId={'ventilation'}/>
            <ProductList onAddToBag={onAddToBag} bagList={bagList} onRenderItem={onRenderItem} title={'Изоляционные материалы'} comicId={'isolation'}/>
            <Manufacturer/>
            <ProductList onAddToBag={onAddToBag} bagList={bagList} onRenderItem={onRenderItem} title={'Вам может понадобиться'} comicId={'fittings'}/>
            <RideBanner/>
        </>
    );
};

export default MainPage;