import Order from "../order/Order";

const OrderPage = ({totalSum, bagList}) => {
    return (
        <Order bagList={bagList} totalSum={totalSum}/>
    );
};

export default OrderPage;