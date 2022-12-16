var CryptoJS = require("crypto-js");
import {PBKDF2, AES} from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import { useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.css';

const articleDb = {
    2022: CryptoJS.enc.Base64.parse("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")
};

function Header() {
    return (
        <div>
            <Head>
                <title>Andrew X Nan</title>
            </Head>
            <h1 className={styles.mainTitle}>Andrew X Nan 🤗</h1>
            <h2>
                I wanted to give you something permanent. They say a picture is worth a thousand words, and I'm terrible at drawing anything but a potato. So I decided to give you pictures that you could use whenever.
            </h2>
        </div>
    );
}

function decryptLetter(encryptedContent, password) {
    const salt = Base64.stringify(Utf8.parse("2022"));
    const keySize = 128 / 32;
    const keyIterations = 2;
    const key = PBKDF2(
        password,
        salt,
        { keySize: keySize, iterations: keyIterations, hasher: CryptoJS.algo.SHA256 }
    );
    const iv = Utf8.parse("0000000000000000");

    const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: encryptedContent,
        key: key,
        iv: iv,
        salt: salt,
        algorithm: CryptoJS.algo.AES,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.PKCS7,
        blockSize: 4
    })

    const decrypt = AES.decrypt(
        cipherParams,
        key,
        {
            keySize: keySize,
            iv: iv
        }
    );
    return Utf8.stringify(decrypt);
}

function getArticleFromDb(articleName) {
    return articleDb[articleName];
}

function Article({articleName}) {
    const article = getArticleFromDb(articleName);
    const [decryptedContent, updateDecryptedContent] = useState();

    const passwordInputHandler = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const password = data.get('password');
        const decrypted = decryptLetter(article, password);
        if (decrypted) {
            updateDecryptedContent(decrypted);
        }
    };
    return (
        <div>
            <PasswordBox passwordInputHandler={passwordInputHandler} />
            <pre className={styles.letterContainer}>{decryptedContent}</pre>
        </div>
    );
}

function PasswordBox({ passwordInputHandler }) {
    return <div>
        <form onSubmit={passwordInputHandler}>
            <input type="password" name="password"></input>
            <button type="submit">Submit</button>
        </form>
    </div>;
}

export async function getStaticProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }

export default function HomePage() {

    return (
        <div className={styles.mainBody}>
            <Header />
            <Article articleName={2022}/>
        </div>
    );
}