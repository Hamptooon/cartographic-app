// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Coordinate } from "@/types";
// import {
//     generateRandomCoordinates,
//     CITY_CENTER,
//     CITY_RADIUS_KM,
// } from "@/utils/mapUtils";

// interface MapState {
//     marker1: Coordinate;
//     marker2: Coordinate;
//     showLine: boolean;
// }

// const initialState: MapState = {
//     marker1: generateRandomCoordinates(
//         CITY_CENTER.lat,
//         CITY_CENTER.lng,
//         CITY_RADIUS_KM
//     ),
//     marker2: generateRandomCoordinates(
//         CITY_CENTER.lat,
//         CITY_CENTER.lng,
//         CITY_RADIUS_KM
//     ),
//     showLine: false,
// };

// const mapSlice = createSlice({
//     name: "map",
//     initialState,
//     reducers: {
//         updateMarker1: (state, action: PayloadAction<Coordinate>) => {
//             state.marker1 = action.payload;
//         },
//         updateMarker2: (state, action: PayloadAction<Coordinate>) => {
//             state.marker2 = action.payload;
//         },
//         toggleLine: (state) => {
//             state.showLine = !state.showLine;
//         },
//         resetMarkers: (state) => {
//             state.marker1 = generateRandomCoordinates(
//                 CITY_CENTER.lat,
//                 CITY_CENTER.lng,
//                 CITY_RADIUS_KM
//             );
//             state.marker2 = generateRandomCoordinates(
//                 CITY_CENTER.lat,
//                 CITY_CENTER.lng,
//                 CITY_RADIUS_KM
//             );
//             state.showLine = false;
//         },
//     },
// });

// export const { updateMarker1, updateMarker2, toggleLine, resetMarkers } =
//     mapSlice.actions;
// export default mapSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinate, MapState } from "../../types";
import {
    generateRandomCoordinates,
    CITY_CENTER,
    CITY_RADIUS_KM,
} from "../../utils/mapUtils";

const initialState: MapState = {
    marker1: generateRandomCoordinates(
        CITY_CENTER.lat,
        CITY_CENTER.lng,
        CITY_RADIUS_KM
    ),
    marker2: generateRandomCoordinates(
        CITY_CENTER.lat,
        CITY_CENTER.lng,
        CITY_RADIUS_KM
    ),
    showRoute: false,
};

const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        updateMarker1: (state, action: PayloadAction<Coordinate>) => {
            state.marker1 = action.payload;
        },
        updateMarker2: (state, action: PayloadAction<Coordinate>) => {
            state.marker2 = action.payload;
        },
        toggleRoute: (state) => {
            state.showRoute = !state.showRoute;
        },
        resetMarkers: (state) => {
            state.marker1 = generateRandomCoordinates(
                CITY_CENTER.lat,
                CITY_CENTER.lng,
                CITY_RADIUS_KM
            );
            state.marker2 = generateRandomCoordinates(
                CITY_CENTER.lat,
                CITY_CENTER.lng,
                CITY_RADIUS_KM
            );
            state.showRoute = false;
        },
    },
});

export const { updateMarker1, updateMarker2, toggleRoute, resetMarkers } =
    mapSlice.actions;
export default mapSlice.reducer;
