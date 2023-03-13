import Bag from "../bag/Bag";
import RideBanner from "../rideBanner/RideBanner";

const BagPage = ({bagList, onAddToBag, onTotalSum}) => {
    return (
        <>
            <Bag onTotalSum={onTotalSum} onAddToBag={onAddToBag} bagList={bagList}/>
            <RideBanner/>
        </>
    );
};

export default BagPage;