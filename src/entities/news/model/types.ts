export interface News {
    id?: string;
    _id?: string;
    title: string;
    img: string;
    page: string;
    category: NewsCategory;
    content?: NewsContent;
}

export type NewsCategory = "ps5" | "ps-vr2" | "ps4" | "ps-store" | "ps-plus";

export interface NewsContent {
    titleTop: string;
    dataTime: string;
    topImg: string;
    headerTitle: string;
    authorName: string;
    authorDescription: string;
    mainImgs: string[];
    mainText: [string, string][];
}
