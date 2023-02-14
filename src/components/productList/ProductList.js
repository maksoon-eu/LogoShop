import './productList.scss'
import catalog from '../../resources/img/catalog.svg'

import ProductListItem from '../productListItem/ProductListItem';

const ProductList = ({title}) => {
    
    const items = [
        {photo: '/images/photo.svg', name: 'PRO AQUA PP-R Компенсатор Белый 20', raiting: 3, price: 1934.15, available: true, sale: true, saleCount: 10, newItem: false, id: 'a1'},

        {photo: '/images/photo.svg', name: 'PRO AQUA PP-R Компенсатор Белый 20', raiting: 1, price: 1934.15, available: false, sale: false, saleCount: 10, newItem: false, id: 'a2'},
        {photo: '/images/photo.svg', name: 'PRO AQUA PP-R Компенсатор Белый 20', raiting: 2, price: 1934.15, available: true, sale: false, saleCount: 10, newItem: true, id: 'a3'},
        {photo: '/images/photo.svg', name: 'PRO AQUA PP-R Компенсатор Белый 20', raiting: 0, price: 1204.15, available: true, sale: true, saleCount: 30, newItem: true, id: 'a4'}
        
    ]

    const list = items.map(item => {
        return (
            <ProductListItem
                key={item.id}
                item={item}
            />
        )
    })

    return (
        <>
            <div className="list__header">
                <h2 className="list__title">{title}</h2>
                <a href="#" className="nav__block-item nav__block-item--main">
                    <img src={catalog} alt="catalog" />
                    Все товары
                </a>
            </div>
            <div className='list'>
                {list}
            </div>
        </>
    );
};

export default ProductList;