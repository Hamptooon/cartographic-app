import { Coordinate } from "@/types";

export const generateRandomCoordinates = (
    centerLat: number,
    centerLng: number,
    radiusKm: number
): Coordinate => {
    const earthRadius = 6371;

    const radiusInRadian = radiusKm / earthRadius;

    const randomDistance = Math.random() * radiusInRadian;

    const randomAngle = Math.random() * Math.PI * 2;

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

export const CITY_CENTER = { lat: 55.7558, lng: 37.6173 };
export const CITY_RADIUS_KM = 15;
