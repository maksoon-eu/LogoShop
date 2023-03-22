const OrderChoseLimited = ({item, onChosePay, chosePay}) => {

    return (
        <div onClick={() => {onChosePay(item)}} className={`filter__list-chek ${chosePay === item ? 'filter__list-chek--active' : ''}`}>{item}</div>
    )
};

export default OrderChoseLimited;