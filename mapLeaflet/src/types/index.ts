// export interface Coordinate {
//     lat: number;
//     lng: number;
// }

export interface Coordinate {
    lat: number;
    lng: number;
}

export interface MapState {
    marker1: Coordinate;
    marker2: Coordinate;
    showRoute: boolean;
}
