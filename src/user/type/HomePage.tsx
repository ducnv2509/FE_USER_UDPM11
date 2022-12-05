export interface IHomePage {
    key: React.Key;
    id:number,
    name: string;
    image: string;
    wholesale_price: number;
}


export interface ICategory {
    id:number,
    name: string;
    description: string;
}

export interface IInfo {
    key: React.Key;
    id: number,
    product_id:number,
    name: string;
    image: string;
    price: number;
    quantity: number;
    option1:string;
    option2:string;
    option3:string;
    wholesale_price:number
}

// export interface IOption1 

// export interface IOption2 {
//     key: React.Key;
//     id:number,
//     name: string;
//     image: string;
//     wholesale_price: number;

// }

// export interface IOption3 {
//     key: React.Key;
//     id:number,
//     name: string;
//     image: string;
//     wholesale_price: number;

// }