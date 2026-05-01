import { axiosInstance } from "shared/api/axios";
import type {
    ProductListItem,
    Game,
    OtherProduct,
    ProductCategory,
    ProductFilter,
} from "../model/types";

// ── POST /newsAndProducts/listOfNewsOrProducts ─────────────────────────────────

export const productsApi = {
    /**
     * Fetch a paginated list of products/news.
     * Backend filters by `page` index or applies a filter object.
     */
    getList: async (
        type: ProductCategory,
        index?: string,
        filter?: ProductFilter,
    ): Promise<ProductListItem[]> => {
        const { data } = await axiosInstance.post<ProductListItem[]>(
            "/newsAndProducts/listOfNewsOrProducts",
            { type, ...(filter ? { filter } : { index }) },
        );
        return data;
    },

    /** Fetch items by favorite IDs (used in user's wishlist) */
    getFavorites: async (type: ProductCategory): Promise<ProductListItem[]> => {
        const { data } = await axiosInstance.post<ProductListItem[]>(
            "/newsAndProducts/listOfNewsOrProducts",
            { type, favorite: true },
        );
        return data;
    },

    // ── POST /newsAndProducts/page ────────────────────────────────────────────

    /**
     * Fetch the full detail page of a single product.
     * Returns Game for type="games", OtherProduct for everything else.
     */
    getDetail: async (type: "games", name: string): Promise<Game[]>;
    getDetail: async (type: Exclude<ProductCategory, "games">, name: string): Promise<OtherProduct>;
    getDetail: async (type: ProductCategory, name: string): Promise<Game[] | OtherProduct> => {
        const { data } = await axiosInstance.post<Game[] | OtherProduct>(
            "/newsAndProducts/page",
            { type, name },
        );
        return data;
    },
};
