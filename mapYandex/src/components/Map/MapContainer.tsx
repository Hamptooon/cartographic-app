import React from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import MapWidget from "./MapWidget";

const MapContainer: React.FC = () => {
    return (
        <YMaps
            query={{
                apikey: "fc8e3a37-cfc8-40f2-b4be-c8928aa01d9c",
                lang: "ru_RU",
                load: "package.full",
            }}
        >
            <MapWidget />
        </YMaps>
    );
};

export default MapContainer;
