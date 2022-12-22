export interface ICartItem {
    key: React.Key;
    id_product_variant: number,
    id_cart_item: number,
    wholesale_price:number
    name: string;
    quantity: number;
    image: string;
    priceTotal: number;
    option1:string;
    option2:string;
    option3:string;
    sale_price: number
}