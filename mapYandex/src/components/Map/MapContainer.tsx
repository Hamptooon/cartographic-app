import React from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import MapWidget from "./MapWidget";

const MapContainer: React.FC = () => {
    return (
        <YMaps
            query={{
                apikey: process.env.YANDEX_MAPS_API_KEY,
                lang: "ru_RU",
                load: "package.full",
            }}
        >
            <MapWidget />
        </YMaps>
    );
};

export default MapContainer;
