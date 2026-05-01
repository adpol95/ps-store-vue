import type { GameProduct } from "./types";

export const MOCK_PRODUCTS: GameProduct[] = [
    {
        _id: "1",
        title: "Resident Evil 9",
        genre: "SURVIVAL HORROR",
        price: "4999 ₽",
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202512/1205/79661d7a2bdb9784749b4e57e1456ca89f7ac7bed8615aee.png?w=620&thumb=false",
        developer: "Capcom",
        platform: "PS5",
        rating: 4.8,
        page: "/games/1",
        compatibility: ["PS5", "PS4 (Pro)"],
        age: {
            ratingImg: "https://www.esrb.org/wp-content/uploads/2019/05/M.svg",
            descriptors: [
                "MATURE 17+",
                "Blood and Gore",
                "Intense Violence",
                "Strong Language"
            ]
        },
        gameInfo: [
            { label: "Release Date", value: "2026-05-15" },
            { label: "Publisher", value: "Capcom" },
            { label: "Languages", value: "English, Russian, Japanese" },
            {
                label: "Description",
                value: "Experience the next chapter of survival horror in the terrifying world of Resident Evil 9."
            }
        ],
        cover: "https://image.api.playstation.com/vulcan/ap/rnd/202512/1205/79661d7a2bdb9784749b4e57e1456ca89f7ac7bed8615aee.png?w=1920&thumb=false",
        backgroundImg:
            "https://image.api.playstation.com/vulcan/ap/rnd/202512/1205/79661d7a2bdb9784749b4e57e1456ca89f7ac7bed8615aee.png?w=1920&thumb=false"
    },
    {
        _id: "2",
        title: "God of War Ragnarök",
        genre: "ACTION-ADVENTURE",
        price: "5499 ₽",
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/47Qp9vR9uU9v9R9v9R9v9R9v.png?w=620&thumb=false",
        developer: "Santa Monica Studio",
        platform: "PS5",
        rating: 4.9,
        page: "/games/2",
        compatibility: ["PS5", "PS4"],
        age: {
            ratingImg: "https://www.esrb.org/wp-content/uploads/2019/05/M.svg",
            descriptors: [
                "MATURE 17+",
                "Blood and Gore",
                "Intense Violence",
                "Strong Language"
            ]
        },
        gameInfo: [
            { label: "Release Date", value: "2022-11-09" },
            { label: "Publisher", value: "Sony Interactive Entertainment" },
            { label: "Languages", value: "English, Russian, French" },
            {
                label: "Description",
                value: "Join Kratos and Atreus on a mythic journey for answers before Ragnarök arrives."
            }
        ],
        cover: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/47Qp9vR9uU9v9R9v9R9v9R9v.png?w=1920&thumb=false",
        backgroundImg:
            "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/47Qp9vR9uU9v9R9v9R9v9R9v.png?w=1920&thumb=false"
    },
    {
        _id: "3",
        title: "The Last of Us Part II Remastered",
        genre: "ACTION-ADVENTURE",
        price: "3999 ₽",
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202311/1717/99a46359392e276063b4685e12f00889.png?w=620&thumb=false",
        developer: "Naughty Dog",
        platform: "PS5",
        rating: 4.7,
        page: "/games/3",
        compatibility: ["PS5"],
        age: {
            ratingImg: "https://www.esrb.org/wp-content/uploads/2019/05/M.svg",
            descriptors: [
                "MATURE 17+",
                "Blood and Gore",
                "Intense Violence",
                "Strong Language",
                "Sexual Content"
            ]
        },
        gameInfo: [
            { label: "Release Date", value: "2024-01-19" },
            { label: "Publisher", value: "Sony Interactive Entertainment" },
            { label: "Languages", value: "English, Russian, Spanish" },
            {
                label: "Description",
                value: "Experience the winner of over 300 Game of the Year awards, now remastered for PS5."
            }
        ],
        cover: "https://image.api.playstation.com/vulcan/ap/rnd/202311/1717/99a46359392e276063b4685e12f00889.png?w=1920&thumb=false",
        backgroundImg:
            "https://image.api.playstation.com/vulcan/ap/rnd/202311/1717/99a46359392e276063b4685e12f00889.png?w=1920&thumb=false"
    },
    {
        _id: "4",
        title: "Marvel's Spider-Man 2",
        genre: "ACTION",
        price: "5499 ₽",
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1501/7efd287019183416e9d0c64c767e764724a25927.png?w=620&thumb=false",
        developer: "Insomniac Games",
        platform: "PS5",
        rating: 4.8,
        page: "/games/4",
        compatibility: ["PS5"],
        age: {
            ratingImg: "https://www.esrb.org/wp-content/uploads/2019/05/T.svg",
            descriptors: ["TEEN", "Blood", "Mild Language", "Violence"]
        },
        gameInfo: [
            { label: "Release Date", value: "2023-10-20" },
            { label: "Publisher", value: "Sony Interactive Entertainment" },
            { label: "Languages", value: "English, Russian, German" },
            {
                label: "Description",
                value: "Spider-Men, Peter Parker and Miles Morales, return for an exciting new adventure."
            }
        ],
        cover: "https://image.api.playstation.com/vulcan/ap/rnd/202306/1501/7efd287019183416e9d0c64c767e764724a25927.png?w=1920&thumb=false",
        backgroundImg:
            "https://image.api.playstation.com/vulcan/ap/rnd/202306/1501/7efd287019183416e9d0c64c767e764724a25927.png?w=1920&thumb=false"
    },
    {
        _id: "5",
        title: "Elden Ring",
        genre: "ACTION RPG",
        price: "4599 ₽",
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/a7v9v9v9v9v9v9v9v9v9v9v9.png?w=620&thumb=false",
        developer: "FromSoftware",
        platform: "PS5",
        rating: 4.9,
        page: "/games/5",
        compatibility: ["PS5", "PS4"],
        age: {
            ratingImg: "https://www.esrb.org/wp-content/uploads/2019/05/M.svg",
            descriptors: [
                "MATURE 17+",
                "Blood and Gore",
                "Language",
                "Suggestive Themes",
                "Violence"
            ]
        },
        gameInfo: [
            { label: "Release Date", value: "2022-02-25" },
            { label: "Publisher", value: "Bandai Namco Entertainment" },
            { label: "Languages", value: "English, Russian, Japanese" },
            {
                label: "Description",
                value: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring."
            }
        ],
        cover: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/a7v9v9v9v9v9v9v9v9v9v9v9.png?w=1920&thumb=false",
        backgroundImg:
            "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/a7v9v9v9v9v9v9v9v9v9v9v9.png?w=1920&thumb=false"
    },
    {
        _id: "6",
        title: "Horizon Forbidden West",
        genre: "ACTION RPG",
        price: "3999 ₽",
        img: "https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/H8Bv9v9v9v9v9v9v9v9v9v9v.png?w=620&thumb=false",
        developer: "Guerrilla Games",
        platform: "PS5",
        rating: 4.8,
        page: "/games/6",
        compatibility: ["PS5", "PS4"],
        age: {
            ratingImg: "https://www.esrb.org/wp-content/uploads/2019/05/T.svg",
            descriptors: ["TEEN", "Blood", "Mild Language", "Use of Alcohol", "Violence"]
        },
        gameInfo: [
            { label: "Release Date", value: "2022-02-18" },
            { label: "Publisher", value: "Sony Interactive Entertainment" },
            { label: "Languages", value: "English, Russian, Italian" },
            {
                label: "Description",
                value: "Explore distant lands, fight bigger and more awe-inspiring machines."
            }
        ],
        cover: "https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/H8Bv9v9v9v9v9v9v9v9v9v9v.png?w=1920&thumb=false",
        backgroundImg:
            "https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/H8Bv9v9v9v9v9v9v9v9v9v9v.png?w=1920&thumb=false"
    }
];
