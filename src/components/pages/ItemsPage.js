import CatalogList from "../catalogList/CatalogList";

const ItemsPage = ({name, onRenderItem, onAddToBag, bagList}) => {
    return (
        <CatalogList bagList={bagList} onAddToBag={onAddToBag} onRenderItem={onRenderItem} name={name}/>
    )
};

export default ItemsPage;