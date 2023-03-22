import CatalogList from "../catalogList/CatalogList";

const ItemsPage = ({name, onRenderItem, onAddToBag, bagList, onTotalSum}) => {
    return (
        <CatalogList bagList={bagList} onTotalSum={onTotalSum} onAddToBag={onAddToBag} onRenderItem={onRenderItem} name={name}/>
    )
};

export default ItemsPage;