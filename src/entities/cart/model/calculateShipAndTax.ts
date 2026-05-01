export const COUNTRIES = [
    "Argentina",
    "Australia",
    "Austria",
    "Bahrain",
    "Belgium",
    "Bolivia Plurinational State of",
    "Brazil",
    "Bulgaria",
    "Canada",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Ecuador",
    "ElSalvador",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Guatemala",
    "Honduras",
    "HongKong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Korea",
    "Kuwait",
    "Lebanon",
    "Luxembourg",
    "Mainland China",
    "Malaysia",
    "Malta",
    "Mexico",
    "Netherlands",
    "NewZealand",
    "Nicaragua",
    "Norway",
    "Oman",
    "Panama",
    "Paraguay",
    "Peru",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "Spain",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Thailand",
    "Turkey",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay"
];

/**
 * Calculates shipping and tax based on the provided country name.
 * Mirrors legacy logic: [index * 10, index]
 *
 * @param country The country name
 * @returns A tuple of [shippingCost, taxCost]
 */
export function calculateShipAndTax(country: string): [number, number] {
    if (!country) return [0, 0];

    const prime = Math.max(0, COUNTRIES.indexOf(country));

    // Legacy logic: prime * 10 for shipping, prime for tax
    return [prime * 10, prime];
}
