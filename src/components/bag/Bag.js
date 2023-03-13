import BagItem from "../bagItem/BagItem";

const Bag = ({bagList, onAddToBag, onTotalSum}) => {
    
    const bagRenderList = bagList.map(item => {
        return (
            <BagItem onTotalSum={onTotalSum} onAddToBag={onAddToBag} catalog={item} key={item.id}/>
        )
    })

    return (
        <div>
            {bagRenderList}
        </div>
    );
};

export default Bag;