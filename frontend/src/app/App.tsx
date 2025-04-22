import React from "react";
import * as styles from "./App.module.scss";

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1>Карта</h1>
            </header>
            <main className={styles.main}>Карта</main>
            <footer className={styles.footer}>
                <p>Mini-проект карты © 2025</p>
            </footer>
        </div>
    );
};

export default App;
