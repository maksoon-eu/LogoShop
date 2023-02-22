import { useHttp } from "../hooks/http.hook";

const useShopService = () => {

    const {loading, request, error} = useHttp()

    const getCatalog = async (id) => {
        const res = await request('http://localhost:3000/db.json');

        if (id === undefined) {
            return res.catalog.map(_transformCatalog)
        } else {
            const listArr = res.catalog.find(item => item.id === id)
            return listArr.subdirectory.map(_transformCatalogFilter)
        }
    }

    const getCatalogItems = async (id, count) => {
        const res = await request('http://localhost:3000/db.json');
        const listArr = res.catalogItems.find(item => item.id === id)
        count = count === undefined ? listArr.itemList.lenght : count
        
        return {
            itemList: listArr.itemList.slice(0, count).map(_transformCatalogItems),
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
            category: item.category
        }
    }

    const _transformCatalog = (item) => {
        return {
            name: item.name,
            id: item.id,
            photo: item.photo,
            subdirectory: item.subdirectory
        }
    }

    const _transformCatalogFilter = (item) => {
        return {
            subdirectory: item
        }
    }

    return {getCatalog, getCatalogItems, loading, error}
}

export default useShopService;