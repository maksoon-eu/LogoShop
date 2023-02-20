import { useState, useEffect } from "react";
import useShopService from "../../services/ShopService";
import CatalogFilterItemData from "../catalogFilterItem/CatalogFilterItemData";

const CatalogFilter = ({comicId, filteredList}) => {
    const filters = [
        "В наличии",
        "Новинки",
        "Акции"
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
        return Object.keys(subdirectory).map((item) => {
            return (
                <CatalogFilterItemData filteredList={filteredList} item={item} key={item} />
            )
        })
    })

    const filterList = filters.map((item, i) => {
        return (
            <CatalogFilterItemData filteredList={filteredList} item={item} key={`${comicId}_${i}`} />
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