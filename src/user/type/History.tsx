

export interface IHistory {
    key: React.Key;
    id: number,
    code: string,
    address_id: string,
    total_price: number,
    total_quantity: number;
    status: number;
    typePay: string;
    fee_money: number;
    created_time: string;
    totalPrice: number;
    order_item: IOrderItem[];
    isReturn: boolean;
    date_main: Date;

}


export interface IOrderItem {
    key: React.Key;
    id: number,
    id_order: number,
    image: string,
    name: string;
    option1: string;
    option2: string;
    option3: string;
    price: number;
    total_price: number;
    quantity: number;
    id_product: number

}
export interface IOrderReturn {
    key: React.Key;
    account_id: number;
    account_name: string;
    create_date: string;
    id: number;
    id_order_purchase: number;
    note: string;
    status_return: number;
    total_price_return: number;
    total_quantity_return: number;
    order_item: IOrderReturnItem[]

}
export interface IOrderReturnItem {
    image: string;
    name: string;
    optionProduct: string;
    price: number;
    quantity: number;
    totalPrice: number
}

