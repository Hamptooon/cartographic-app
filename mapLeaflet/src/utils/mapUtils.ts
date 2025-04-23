import { Coordinate } from "@/types";
// export const generateRandomCoordinates = (
//     centerLat: number,
//     centerLng: number,
//     radiusKm: number
// ): Coordinate => {
//     // Earth's radius in kilometers
//     const earthRadius = 6371;

//     // Convert radius from kilometers to radians
//     const radiusInRadian = radiusKm / earthRadius;

//     // Generate a random distance within the radius
//     const randomDistance = Math.random() * radiusInRadian;

//     // Generate a random angle in radians
//     const randomAngle = Math.random() * Math.PI * 2;

//     // Calculate the random coordinate
//     const lat =
//         Math.asin(
//             Math.sin(centerLat * (Math.PI / 180)) * Math.cos(randomDistance) +
//                 Math.cos(centerLat * (Math.PI / 180)) *
//                     Math.sin(randomDistance) *
//                     Math.cos(randomAngle)
//         ) *
//         (180 / Math.PI);

//     const lng =
//         (centerLng * (Math.PI / 180) +
//             Math.atan2(
//                 Math.sin(randomAngle) *
//                     Math.sin(randomDistance) *
//                     Math.cos(centerLat * (Math.PI / 180)),
//                 Math.cos(randomDistance) -
//                     Math.sin(centerLat * (Math.PI / 180)) *
//                         Math.sin(lat * (Math.PI / 180))
//             )) *
//         (180 / Math.PI);

//     return { lat, lng };
// };

// // Example: Moscow city center coordinates and approximate radius
// export const CITY_CENTER = { lat: 55.7558, lng: 37.6173 }; // Moscow
// export const CITY_RADIUS_KM = 15;

export const generateRandomCoordinates = (
    centerLat: number,
    centerLng: number,
    radiusKm: number
): Coordinate => {
    // Earth's radius in kilometers
    const earthRadius = 6371;

    // Convert radius from kilometers to radians
    const radiusInRadian = radiusKm / earthRadius;

    // Generate a random distance within the radius
    const randomDistance = Math.random() * radiusInRadian;

    // Generate a random angle in radians
    const randomAngle = Math.random() * Math.PI * 2;

    // Calculate the random coordinate
    const lat =
        Math.asin(
            Math.sin(centerLat * (Math.PI / 180)) * Math.cos(randomDistance) +
                Math.cos(centerLat * (Math.PI / 180)) *
                    Math.sin(randomDistance) *
                    Math.cos(randomAngle)
        ) *
        (180 / Math.PI);

    const lng =
        (centerLng * (Math.PI / 180) +
            Math.atan2(
                Math.sin(randomAngle) *
                    Math.sin(randomDistance) *
                    Math.cos(centerLat * (Math.PI / 180)),
                Math.cos(randomDistance) -
                    Math.sin(centerLat * (Math.PI / 180)) *
                        Math.sin(lat * (Math.PI / 180))
            )) *
        (180 / Math.PI);

    return { lat, lng };
};

// Пример: координаты центра Москвы и приблизительный радиус
export const CITY_CENTER = { lat: 55.7558, lng: 37.6173 }; // Москва
export const CITY_RADIUS_KM = 15; // 15км радиус вокруг центра города
