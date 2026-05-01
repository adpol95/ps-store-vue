import { z } from "zod";

// ── Base ──────────────────────────────────────────────────────────────────────

export type ProductCategory = "games" | "consoles" | "accessories" | "news";

// ── List-item schema (fields returned by /newsAndProducts/listOfNewsOrProducts) ─

export const ProductListItemSchema = z.object({
    _id: z.string(),
    title: z.string(),
    img: z.string(),
    Genre: z.string().optional(),
    Price: z.number().optional(),
    Developer: z.string().optional(),
});

// ── Game schema (ModelOfGames.js) ─────────────────────────────────────────────

export const GameSchema = z.object({
    _id: z.string(),
    title: z.string(),
    img: z.string(),
    page: z.string(),
    Cover: z.string(),
    BackgroundImg: z.string(),
    Developer: z.string(),
    Rating: z.number(),
    Price: z.number(),
    Compatibility: z.array(z.string()),
    Age: z.record(z.string(), z.unknown()),
    GameInfo: z.array(z.unknown()),
    AdditionalInfo: z.record(z.string(), z.unknown()),
    Genre: z.string(),
    Platform: z.string(),
});

// ── Console / Accessory / News schema (ModelOfNewsOrConsOrAccess.js) ──────────

export const OtherProductSchema = z.object({
    _id: z.string(),
    title: z.string(),
    img: z.string(),
    page: z.string(),
    value: z.record(z.string(), z.unknown()).optional(),
    Price: z.number().optional(),
    Developer: z.string().optional(),
    Rating: z.number().optional(),
    Genre: z.string().optional(),
});

// ── TypeScript types ──────────────────────────────────────────────────────────

export type ProductListItem = z.infer<typeof ProductListItemSchema>;
export type Game = z.infer<typeof GameSchema>;
export type OtherProduct = z.infer<typeof OtherProductSchema>;
export type AnyProduct = Game | OtherProduct;

// ── Legacy interface types (kept for compatibility) ───────────────────────────

export interface BaseProduct {
    title: string;
    img: string;
    page: string;
    price?: string | number;
    _id: string;
}

interface FeatureBlock {
    img: string[];
    title: string;
    descript: string[];
}

export interface GameProduct extends BaseProduct {
    cover: string;
    backgroundImg: string;
    developer: string;
    rating: number;
    compatibility: string[];
    age: { ratingImg: string; descriptors: string[] };
    gameInfo: { label: string; value: string }[];
    genre: string;
    platform: string;
}

interface BaseNonGame extends BaseProduct {
    realiseDate: string;
    previewText: string;
    terms: string[];
    mainText: FeatureBlock[];
}

interface ProductWithoutColors extends BaseNonGame {
    mainCover: string;
    descriptionImgs: string[];
    whatInTheBox: string[];
}

interface ProductWithColors extends BaseNonGame {
    allImgsAndTitles: { colorName: string; images: string[] }[];
}

export type ConsoleProduct = ProductWithoutColors | ProductWithColors;
export type AccessoryProduct = ProductWithoutColors | ProductWithColors;

// ── Filter / Request ──────────────────────────────────────────────────────────

export interface ProductFilter {
    vary: string;
    value: string;
}

export interface ProductListRequest {
    type: ProductCategory;
    index?: string;
    filter?: ProductFilter;
    favorite?: boolean;
}
