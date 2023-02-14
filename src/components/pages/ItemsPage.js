import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import useShopService from "../../services/ShopService";

const ItemsPage = () => {
    const [catalog, setCatalog] = useState([])
    const {comicId} = useParams()

    const {getCatalogItems} = useShopService();

    useEffect(() => {
        getCatalogItems(comicId)
            .then(onCharLoaded)
    }, [catalog])

    const onCharLoaded = (catalog) => {
        setCatalog(catalog)
    }

    const catalogList = catalog.map(({text}, i) => {
        return (
            <div key={i}>
                <p>{text}</p>
            </div>
        )
    })

    return (
        <div>
            {catalogList}
        </div>
    )
};

export default ItemsPage;