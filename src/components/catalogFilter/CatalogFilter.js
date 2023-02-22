import { useState, useEffect } from "react";
import useShopService from "../../services/ShopService";
import CatalogFilterItemData from "../catalogFilterItem/CatalogFilterItemData";

const CatalogFilter = ({comicId, filteredList, getNewFilter}) => {
    const filters = [
        {filterName: "В наличии", filterNameProgram: 'available'},
        {filterName: "Новинки", filterNameProgram: 'newItem'},
        {filterName: "Акции", filterNameProgram: 'sale'}
    ]

    const [catalog, setCatalog] = useState([])

    useEffect(() => {
        getCatalog(comicId)
            .then(onCharLoaded)
    }, [comicId])

    const {getCatalog} = useShopService();

    const onCharLoaded = (catalog) => {
        setCatalog(catalog)
    }

    const filterDataList = catalog.map(({subdirectory}) => {
        return (
            <CatalogFilterItemData getNewFilter={getNewFilter} filteredList={filteredList} item={subdirectory} key={subdirectory.filterName} />
        )
    })

    const filterList = filters.map((item, i) => {
        return (
            <CatalogFilterItemData getNewFilter={getNewFilter} filteredList={filteredList} item={item} key={`${comicId}_${i}`} />
        )
    })

    return (
        <div>
            {filterDataList}
            {filterList}
        </div>
    );
};

export default CatalogFilter;