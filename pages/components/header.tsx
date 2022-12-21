import Head from "next/head";
import React from "react";
import styles from '../styles.module.css';

export default function Header() {
    return (
        <div>
            <Head>
                <title>Andrew ❤️ Nancy</title>
            </Head>
            <h1 className={styles.mainTitle}>Andrew ❤️ Nancy 🤗</h1>
        </div>
    );
}