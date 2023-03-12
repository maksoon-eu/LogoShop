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

    const getCatalogItems = async (id, startCount = 0, endCount) => {
        const res = await request('http://localhost:3000/db.json');
        const listArr = res.catalogItems.find(item => item.id === id)
        endCount = endCount === undefined ? listArr.itemList.lenght : endCount
        
        return {
            itemList: listArr.itemList.slice(startCount, endCount).map(_transformCatalogItems),
            activeTab: listArr.activeTab.map(_transformCatalogName)
        }
    }

    const getCatalogElem = async (id) => {
        const res = await request('http://localhost:3000/db.json');
        let listArr = res.catalogItems.map(item => {
            return item.itemList.find(elem => elem.id === id)
        })
        listArr = listArr.filter(item => item !== undefined)
        return listArr.map(_transformCatalogItems)
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
            category: item.category,
            id: item.id
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

    return {getCatalog, getCatalogItems, getCatalogElem, loading, error}
}

export default useShopService;