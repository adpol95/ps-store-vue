import type { AnyProduct } from "@/entities/product";

export interface CartProduct {
    item: AnyProduct;
    quantity: number;
}
