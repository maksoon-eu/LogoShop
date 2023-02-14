const useShopService = () => {
    
    const getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}, ${res}`);
        }

        return await res.json();
    }

    const getCatalog = async () => {
        const res = await getResource('http://localhost:3000/db.json');
        return res.catalog.map(_transformCatalog)
    }

    const getCatalogItems = async (id) => {
        const res = await getResource('http://localhost:3000/db.json');

        let listArr = res.catalogItems.find(item => item.id === id)
        return listArr.itemList.map(_transformCatalogItems)
    }

    const _transformCatalogItems = (item) => {
        return {
            text: item.text
        }
    }

    const _transformCatalog = (item) => {
        return {
            name: item.name,
            id: item.id
        }
    }

    return {getCatalog, getCatalogItems}
}

export default useShopService;