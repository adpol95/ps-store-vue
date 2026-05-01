import { axiosInstance } from "@/shared/api";

import type { News } from "../model/types";

export async function getNewsList(
    category: string | "all",
    page: number
): Promise<News[]> {
    const type = category === "all" ? "ps5" : category;
    const response = await axiosInstance.post<News[]>(
        "/newsAndProducts/listOfNewsOrProducts",
        {
            type,
            index: page.toString()
        }
    );
    return response.data;
}

export async function getNewsById(id: string, category: string): Promise<News> {
    // Legacy backend uses POST /newsAndProducts/page with category and index (id)
    const response = await axiosInstance.post<News>("/newsAndProducts/page", {
        type: category,
        index: id
    });
    return response.data;
}
