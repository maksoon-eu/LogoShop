import { useHttp } from "../hooks/http.hook";

const useShopService = () => {

    const {loading, request, error} = useHttp()

    const getCatalog = async () => {
        const res = await request('http://localhost:3000/db.json');
        return res.catalog.map(_transformCatalog)
    }

    const getCatalogItemsCount = async (id, count = 4) => {
        const res = await request('http://localhost:3000/db.json');
        let listArr = res.catalogItems.find(item => item.id === id)
        
        return listArr.itemList.slice(0, count).map(_transformCatalogItems)
    }

    const getCatalogItems = async (id) => {
        const res = await request('http://localhost:3000/db.json');

        let listArr = res.catalogItems.find(item => item.id === id)
        return {
            itemList: listArr.itemList.map(_transformCatalogItems),
            activeTab: listArr.activeTab.map(_transformCatalogName)
        }
    }

    const _transformCatalogName = (item) => {
        return {
            activeTab: item.activeName,
        }
    }

    const _transformCatalogItems = (item) => {
        return {
            photo: item.photo, 
            name: item.name, 
            raiting: item.raiting, 
            price: item.price, 
            available: item.available, 
            sale: item.sale, 
            saleCount: item.saleCount, 
            newItem: item.newItem, 
            id: item.id
        }
    }

    const _transformCatalog = (item) => {
        return {
            name: item.name,
            id: item.id,
            photo: item.photo,
            subdirectory: item.subdirectory[0]
        }
    }

    return {getCatalog, getCatalogItems, getCatalogItemsCount, loading, error}
}

export default useShopService;