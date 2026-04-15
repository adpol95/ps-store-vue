// 1. Общий интерфейс для всех товаров
export interface BaseProduct {
    title: string;
    img: string; // Главное превью
    page: string; // Ссылка/ID страницы
    price?: string | number;
    _id: string;
}

// Вспомогательный интерфейс для текстовых блоков
interface FeatureBlock {
    img: string[];
    title: string;
    descript: string[];
}

// 2. Игры
export interface GameProduct extends BaseProduct {
    cover: string;
    backgroundImg: string;
    developer: string;
    rating: number;
    compatibility: string[];
    age: {
        ratingImg: string;
        descriptors: string[];
    };
    gameInfo: {
        label: string;
        value: string;
    }[];
    genre: string;
    platform: string;
}

// 3. Общая логика для Консолей и Аксессуаров
// (так как у них общие шаблоны с цветами и без)
interface BaseNonGame extends BaseProduct {
    realiseDate: string;
    previewText: string;
    terms: string[];
    mainText: FeatureBlock[];
}

// Вариант БЕЗ цветов (Бандлы)
interface ProductWithoutColors extends BaseNonGame {
    mainCover: string;
    descriptionImgs: string[];
    whatInTheBox: string[];
}

// Вариант С цветами
interface ProductWithColors extends BaseNonGame {
    allImgsAndTitles: {
        colorName: string;
        images: string[];
    }[];
}

// Итоговые типы для экспорта
export type ConsoleProduct = ProductWithoutColors | ProductWithColors;
export type AccessoryProduct = ProductWithoutColors | ProductWithColors;

// Общий тип для всего каталога
export type AnyProduct = GameProduct | ConsoleProduct | AccessoryProduct;
