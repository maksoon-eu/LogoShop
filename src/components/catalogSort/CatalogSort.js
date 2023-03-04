import './catalogSort.scss'

const CatalogSort = ({item, sortCatalog, sortItem}) => {
    return (
        <div onClick={() => {sortCatalog(item.sortDataName)}} className={`sort__item ${sortItem === item.sortDataName ? 'sort__item--active' : ''}`}>{item.sortName}</div>
    )
};

export default CatalogSort;