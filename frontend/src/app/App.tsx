import React from "react";
import * as styles from "./App.module.scss";

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1>⏱️ Таймер обратного отсчета</h1>
            </header>
            <main className={styles.main}>Карта</main>
            <footer className={styles.footer}>
                <p>Mini-проект таймера обратного отсчета © 2025</p>
            </footer>
        </div>
    );
};

export default App;
