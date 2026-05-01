import { useCartStore } from "@/entities/cart";
import type { AnyProduct } from "@/entities/product";

export const useAddedToCart = () => {
    const cartStore = useCartStore();

    const handleAddToCart = (product: AnyProduct) => {
        cartStore.addToCart(product);
    };

    return {
        handleAddToCart,
        connected
    };
};
