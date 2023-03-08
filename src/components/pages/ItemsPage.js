import CatalogList from "../catalogList/CatalogList";

const ItemsPage = ({name, onRenderItem}) => {
    return (
        <CatalogList onRenderItem={onRenderItem} name={name}/>
    )
};

export default ItemsPage;