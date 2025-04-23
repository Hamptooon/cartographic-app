import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import MapContainer from "@/components/Map/MapContainer";
import * as styles from "./App.module.scss";
const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1>🗺️ Cartographic-app (Yandex Map API)</h1>
            </header>
            <main className={styles.main}>
                <Provider store={store}>
                    <MapContainer />
                </Provider>
            </main>
            <footer className={styles.footer}>
                <p>Mini-проект Cartographic-app © 2025</p>
            </footer>
        </div>
    );
};

export default App;
