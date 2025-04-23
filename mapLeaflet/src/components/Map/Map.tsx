import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RootState } from "@/store";
import {
    updateMarker1,
    updateMarker2,
    toggleLine,
    resetMarkers,
} from "@/store/slices/mapSlice";
import { CITY_CENTER } from "@/utils/mapUtils";
import CoordinateInput from "@/components/CoordinateInput/CoordinateInput";
import * as styles from "./Map.module.scss";

const Map: React.FC = () => {
    const dispatch = useDispatch();
    const { marker1, marker2, showLine } = useSelector(
        (state: RootState) => state.map
    );
    const mapRef = useRef<L.Map | null>(null);
    const marker1Ref = useRef<L.Marker | null>(null);
    const marker2Ref = useRef<L.Marker | null>(null);
    const lineRef = useRef<L.Polyline | null>(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map").setView(
                [CITY_CENTER.lat, CITY_CENTER.lng],
                12
            );

            L.tileLayer(
                "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
                {
                    attribution:
                        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                }
            ).addTo(mapRef.current);
            marker1Ref.current = L.marker([marker1.lat, marker1.lng], {
                draggable: true,
                title: "Marker 1",
                icon: L.icon({
                    iconUrl:
                        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
                    shadowUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                }),
            }).addTo(mapRef.current);

            marker2Ref.current = L.marker([marker2.lat, marker2.lng], {
                draggable: true,
                title: "Marker 2",
                icon: L.icon({
                    iconUrl:
                        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
                    shadowUrl:
                        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                }),
            }).addTo(mapRef.current);

            marker1Ref.current.on("dragend", () => {
                const position = marker1Ref.current?.getLatLng();
                if (position) {
                    dispatch(
                        updateMarker1({ lat: position.lat, lng: position.lng })
                    );
                }
            });

            marker2Ref.current.on("dragend", () => {
                const position = marker2Ref.current?.getLatLng();
                if (position) {
                    dispatch(
                        updateMarker2({ lat: position.lat, lng: position.lng })
                    );
                }
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (marker1Ref.current) {
            marker1Ref.current.setLatLng([marker1.lat, marker1.lng]);
        }

        if (marker2Ref.current) {
            marker2Ref.current.setLatLng([marker2.lat, marker2.lng]);
        }

        if (showLine && lineRef.current && mapRef.current) {
            lineRef.current.setLatLngs([
                [marker1.lat, marker1.lng],
                [marker2.lat, marker2.lng],
            ]);
        }
    }, [marker1, marker2]);

    useEffect(() => {
        if (mapRef.current) {
            if (showLine) {
                if (lineRef.current) {
                    mapRef.current.removeLayer(lineRef.current);
                }

                lineRef.current = L.polyline(
                    [
                        [marker1.lat, marker1.lng],
                        [marker2.lat, marker2.lng],
                    ],
                    { color: "purple", weight: 3 }
                ).addTo(mapRef.current);
            } else if (lineRef.current) {
                mapRef.current.removeLayer(lineRef.current);
                lineRef.current = null;
            }
        }
    }, [showLine, marker1, marker2]);

    const handleToggleLine = () => {
        dispatch(toggleLine());
    };

    const handleResetMarkers = () => {
        dispatch(resetMarkers());
    };

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <button onClick={handleToggleLine}>
                    {showLine ? "Скрыть маршрут" : "Построить маршрут"}
                </button>
                <button onClick={handleResetMarkers}>Новые точки</button>
            </div>

            <div className={styles.coordinateInputs}>
                <CoordinateInput
                    label="Точка А"
                    coordinate={marker1}
                    onUpdate={(coord) => dispatch(updateMarker1(coord))}
                />
                <CoordinateInput
                    label="Точка Б"
                    coordinate={marker2}
                    onUpdate={(coord) => dispatch(updateMarker2(coord))}
                />
            </div>

            <div id="map" className={styles.mapContainer}></div>
        </div>
    );
};

export default Map;
