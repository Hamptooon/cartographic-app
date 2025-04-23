import React, { useEffect, useRef, useState } from "react";
import { Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
    updateMarker1,
    updateMarker2,
    toggleRoute,
    resetMarkers,
} from "../../store/slices/mapSlice";
import { CITY_CENTER } from "../../utils/mapUtils";
import CoordinateInput from "../CoordinateInput/CoordinateInput";
import * as styles from "./MapWidget.module.scss";

const MapWidget: React.FC = () => {
    const ymaps = useYMaps(["Map"]);
    const dispatch = useDispatch();
    const { marker1, marker2, showRoute } = useSelector(
        (state: RootState) => state.map
    );
    const mapRef = useRef<any>(null);
    const routeRef = useRef<any>(null);
    const [routeInfo, setRouteInfo] = useState<{
        distance: string;
        duration: string;
    } | null>(null);

    useEffect(() => {
        if (!mapRef.current || !showRoute) return;

        const updateRoute = () => {
            if (routeRef.current) {
                mapRef.current.geoObjects.remove(routeRef.current);
            }

            const multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                    referencePoints: [
                        [marker1.lat, marker1.lng],
                        [marker2.lat, marker2.lng],
                    ],
                    params: { routingMode: "pedestrian" },
                },
                { boundsAutoApply: true, wayPointVisible: false }
            );
            mapRef.current.geoObjects.add(multiRoute);
            routeRef.current = multiRoute;
        };

        updateRoute();

        return () => {
            if (routeRef.current) {
                mapRef.current.geoObjects.remove(routeRef.current);
            }
        };
    }, [showRoute, marker1, marker2]);

    const handleToggleRoute = () => {
        dispatch(toggleRoute());
    };

    const handleResetMarkers = () => {
        dispatch(resetMarkers());
        setRouteInfo(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <button onClick={handleToggleRoute}>
                    {showRoute ? "Скрыть маршрут" : "Построить маршрут"}
                </button>
                <button onClick={handleResetMarkers}>Новые точки</button>
            </div>

            <div className={styles.coordinateInputs}>
                <CoordinateInput
                    label="Точка A"
                    coordinate={marker1}
                    onUpdate={(coord) => dispatch(updateMarker1(coord))}
                />
                <CoordinateInput
                    label="Точка B"
                    coordinate={marker2}
                    onUpdate={(coord) => dispatch(updateMarker2(coord))}
                />
            </div>

            <div className={styles.mapContainer}>
                <Map
                    instanceRef={mapRef}
                    defaultState={{
                        center: [CITY_CENTER.lat, CITY_CENTER.lng],
                        zoom: 12,
                    }}
                    width="100%"
                    height="600px"
                    options={{
                        autoFitToViewport: "always",
                        suppressMapOpenBlock: true,
                    }}
                >
                    <Placemark
                        geometry={[marker1.lat, marker1.lng]}
                        options={{
                            preset: "islands#redDotIcon",
                            draggable: true,
                        }}
                        properties={{ balloonContent: "Точка A" }}
                        onDragEnd={(e: any) => {
                            const coords = e
                                .get("target")
                                .geometry.getCoordinates();
                            dispatch(
                                updateMarker1({
                                    lat: coords[0],
                                    lng: coords[1],
                                })
                            );
                        }}
                    />
                    <Placemark
                        geometry={[marker2.lat, marker2.lng]}
                        options={{
                            preset: "islands#blueDotIcon",
                            draggable: true,
                        }}
                        properties={{ balloonContent: "Точка B" }}
                        onDragEnd={(e: any) => {
                            const coords = e
                                .get("target")
                                .geometry.getCoordinates();
                            dispatch(
                                updateMarker2({
                                    lat: coords[0],
                                    lng: coords[1],
                                })
                            );
                        }}
                    />
                </Map>
            </div>
        </div>
    );
};

export default MapWidget;
