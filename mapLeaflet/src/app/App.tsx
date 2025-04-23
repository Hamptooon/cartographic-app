import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import Map from "@/components/Map/Map";
import * as styles from "./App.module.scss";

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1>🗺️ Cartographic-app</h1>
            </header>
            <main className={styles.main}>
                <Provider store={store}>
                    <Map />
                </Provider>
            </main>
            <footer className={styles.footer}>
                <p>Mini-проект Cartographic-app © 2025</p>
            </footer>
        </div>
    );
};

export default App;
