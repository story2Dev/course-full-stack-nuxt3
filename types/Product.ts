import type { BaseModel, Term } from "./Term";

export interface Product extends BaseModel {
    name: string;
    price: number;
    cost: number;
    stock: number;
    description?: string;
    imageUrl?: string;
    categoryId?: number;
    category?: Term;
}

export interface ProductStock extends BaseModel {
    productId: number;
    quantity: number;
    stock: number;
    price: number;
    cost: number;
}
