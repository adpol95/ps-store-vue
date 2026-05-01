export interface User {
    _id: string;
    userName: string;
    avatar: string;
    country: string;
    birthDay: string;
    wallet: number;
    isOnline: boolean;
    friends: Array<{
        _id: string;
        userName: string;
        avatar: string;
    }>;
    ownership: {
        games: Array<{ _id: string; name: string }>;
        consoles: Array<{ _id: string; name: string }>;
        accessories: Array<{ _id: string; name: string }>;
    };
    favorite: {
        studios: string[];
        games: Array<{ _id: string; img: string }>;
    };
}
