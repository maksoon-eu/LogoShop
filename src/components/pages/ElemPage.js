import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useShopService from "../../services/ShopService";

import ChozeItem from "../choseItem/ChoseItem";
import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErorrMessage";

const ElemPage = ({onAddToBag, bagList, onTotalSum}) => {
    const {getCatalogElem, error, loading} = useShopService();

    const [catalog, setCatalog] = useState([])
    const {comicName} = useParams()

    useEffect(() => {
        getCatalogElem(comicName)
            .then(onCharLoaded)
    }, [comicName])

    const onCharLoaded = (catalog) => {
        setCatalog(catalog)
    }

    const choseElem = catalog.map(item => {
        return (
            <ChozeItem onTotalSum={onTotalSum} bagList={bagList} onAddToBag={onAddToBag} catalog={item} key={item.id}/>
        )
    })
    
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content =  !(loading || error) ? choseElem : null

    return (
        <div>
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

export default ElemPage;