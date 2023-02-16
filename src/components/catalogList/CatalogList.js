import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import useShopService from "../../services/ShopService";

import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErorrMessage";
import ProductListItem from "../productListItem/ProductListItem";

const CatalogList = () => {
    const [catalog, setCatalog] = useState([])
    const [activeName, setActiveName] = useState([])
    const {comicId} = useParams()

    const {getCatalogItems, error, loading} = useShopService();

    useEffect(() => {
        getCatalogItems(comicId)
            .then(onCatalogLoaded)
    }, [comicId])
    
    const onCatalogLoaded = (catalog) => {
        setCatalog(catalog.itemList)
        setActiveName(catalog.activeTab)
    }

    const catalogList = catalog.map((item, i) => {
        return (
            <ProductListItem catalog={item} key={i}/>
        )
    })

    const catalogTitle = activeName.map(({activeTab}, i) => {
        return (
            <h1 key={i}>{activeTab}</h1>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content =  !(loading || error) ? catalogList : null

    return (
        <div>
            {catalogTitle}
            <div>
                {errorMessage}
                {spinner}
                {content}
            </div>
        </div>
    )
};

export default CatalogList;