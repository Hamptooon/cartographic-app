import React, { useState, useEffect } from "react";
import { Coordinate } from "../../types";
import * as styles from "./CoordinateInput.module.scss";

interface CoordinateInputProps {
    label: string;
    coordinate: Coordinate;
    onUpdate: (coord: Coordinate) => void;
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({
    label,
    coordinate,
    onUpdate,
}) => {
    const [lat, setLat] = useState(coordinate.lat.toString());
    const [lng, setLng] = useState(coordinate.lng.toString());

    useEffect(() => {
        setLat(coordinate.lat.toString());
        setLng(coordinate.lng.toString());
    }, [coordinate]);

    const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLat(e.target.value);
    };

    const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLng(e.target.value);
    };

    const handleLatBlur = () => {
        const parsedLat = parseFloat(lat);
        if (!isNaN(parsedLat)) {
            onUpdate({ ...coordinate, lat: parsedLat });
        } else {
            setLat(coordinate.lat.toString());
        }
    };

    const handleLngBlur = () => {
        const parsedLng = parseFloat(lng);
        if (!isNaN(parsedLng)) {
            onUpdate({ ...coordinate, lng: parsedLng });
        } else {
            setLng(coordinate.lng.toString());
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        type: "lat" | "lng"
    ) => {
        if (e.key === "Enter") {
            if (type === "lat") {
                handleLatBlur();
            } else {
                handleLngBlur();
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <div className={styles.inputGroup}>
                <div className={styles.inputWrapper}>
                    <label>Широта</label>
                    <input
                        type="text"
                        value={lat}
                        onChange={handleLatChange}
                        onBlur={handleLatBlur}
                        onKeyDown={(e) => handleKeyDown(e, "lat")}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label>Долгота</label>
                    <input
                        type="text"
                        value={lng}
                        onChange={handleLngChange}
                        onBlur={handleLngBlur}
                        onKeyDown={(e) => handleKeyDown(e, "lng")}
                    />
                </div>
            </div>
        </div>
    );
};

export default CoordinateInput;
