var CryptoJS = require("crypto-js");
import {PBKDF2, AES} from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import { useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import Gallery from 'react-photo-gallery';


// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const articleDb = {
    2022: {
        questions: [
            "Where was our first date?",
            "Where was our first trip together?",
            "What did you break in Tahoe?",
            "Where did we go for lunch on our second date?",
            "What did you get me for my birthday?"
        ],
        encryptedLetter: CryptoJS.enc.Base64.parse("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") 
    }
};

function Header() {
    return (
        <div>
            <Head>
                <title>Andrew X Nan</title>
            </Head>
            <h1 className={styles.mainTitle}>Andrew X Nan 🤗</h1>
        </div>
    );
}

const ENCRYPTION_PARAMS = {
    salt: "2022",
    keySize: 128/32,
    keyIterations: 2,
    iv: "0000000000000000"
}

function decryptLettersRecursive(article, passwords) {
    var message = article;
    for (const password of passwords) {
        const decryptedRaw = decryptLetter(message, password);
        const decryptedJson = JSON.parse(Utf8.stringify(decryptedRaw));
        
        if (decryptedJson.index == 0) {
            message = Utf8.stringify(Base64.parse(decryptedJson.encoded));
            break;
        }
        message = Base64.parse(decryptedJson.encoded);
    }
    return message;
}

function decryptLetter(encryptedContent, password) {
    const salt = Base64.stringify(Utf8.parse(ENCRYPTION_PARAMS.salt));
    const iv = Utf8.parse(ENCRYPTION_PARAMS.iv);

    const key = PBKDF2(
        password,
        salt,
        { keySize: ENCRYPTION_PARAMS.keySize, iterations: ENCRYPTION_PARAMS.keyIterations, hasher: CryptoJS.algo.SHA256 }
    );

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
            keySize: ENCRYPTION_PARAMS.keySize,
            iv: iv
        }
    );
    return decrypt;
}

function getArticleFromDb(articleName) {
    return articleDb[articleName];
}

function Article({article}) {
    const [decryptedContent, updateDecryptedContent] = useState();
    const [decryptionError, updateDecryptionError] = useState();
    const [showDecryptionSuccess, setShowDecryptionSuccess] = useState(false);

    const passwordInputHandler = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const passwords = [data.get("question::first-date"), data.get("question::trip")].reverse();
        try {
            const decrypted = decryptLettersRecursive(article.encryptedLetter, passwords);
            
            if (decrypted) {
                updateDecryptedContent(decrypted);
                updateDecryptionError(null);
                setShowDecryptionSuccess(true);
                setTimeout(() => {
                    setShowDecryptionSuccess(false);
                }, 3000);
            }
            return decrypted;
        } catch (e) {
            console.error(e);
            updateDecryptionError(e);
        }
    };
    return (
        <div>
            <Collapse in={showDecryptionSuccess}>
                <div>
                    <Alert key="decryption-successful" variant="success">
                        Succesfully Decrypted!
                    </Alert>
                </div>
            </Collapse>
            {decryptedContent == null ? <QuestionBox passwordInputHandler={passwordInputHandler} /> : ""}
            <pre className={styles.letterContainer}>{decryptedContent}</pre>
            {decryptionError && <Alert key="error" variant="danger">
                Incorrect!
            </Alert>}
        </div>
    );
}

function QuestionBox({ passwordInputHandler }) {
    return <div>
        <Form onSubmit={passwordInputHandler}>
            <Form.Group className="mb-3" controlId="formBasicAnswer">
                <Form.Label>Where was our first date?</Form.Label>
                <Form.Control name="question::first-date" type="answer" placeholder="Answer" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAnswer">
                <Form.Label>Where was our first overnight trip together?</Form.Label>
                <Form.Control name="question::trip" type="answer" placeholder="Answer" />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicAnswer">
                <Form.Label>What did you break on our first trip together?</Form.Label>
                <Form.Control name="question::break" type="answer" placeholder="Answer" />
            </Form.Group> */}

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </div>;
}

export async function getStaticProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
}

class ImageConfig {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    static ConfigLandscape = new ImageConfig(4, 3);

    static ConfigPortrait = new ImageConfig(3, 4);
}

const imgConfigIndex = {
    0: ImageConfig.ConfigLandscape,
    1: ImageConfig.ConfigLandscape,
    2: ImageConfig.ConfigLandscape,
    3: ImageConfig.ConfigLandscape,
    4: ImageConfig.ConfigLandscape,
    5: ImageConfig.ConfigLandscape,
    6: ImageConfig.ConfigLandscape,
    7: ImageConfig.ConfigLandscape,
    8: ImageConfig.ConfigPortrait,
    9: ImageConfig.ConfigLandscape,
    10: ImageConfig.ConfigLandscape,
    11: ImageConfig.ConfigLandscape,
    12: ImageConfig.ConfigLandscape,
    13: ImageConfig.ConfigLandscape,
    14: ImageConfig.ConfigLandscape,
    15: ImageConfig.ConfigPortrait,
    16: ImageConfig.ConfigLandscape,
    17: ImageConfig.ConfigLandscape,
    18: ImageConfig.ConfigLandscape,
    19: ImageConfig.ConfigLandscape,
    20: ImageConfig.ConfigPortrait,
    21: ImageConfig.ConfigPortrait,
    22: ImageConfig.ConfigPortrait,
    23: ImageConfig.ConfigLandscape,
    24: ImageConfig.ConfigLandscape,
    25: ImageConfig.ConfigPortrait,
    26: ImageConfig.ConfigPortrait,
}  
const photos = Array.from(new Array(27), (x, i) => {return {
    src: `/images/img${i}.jpeg`, 
    height: imgConfigIndex[i].height, 
    width: imgConfigIndex[i].width,
}});

export default function HomePage() {

    return (
        <div className={styles.container}>
            <div className={styles.imageBackground}>
                <Gallery photos={photos} direction={"column"} />
                <Gallery photos={photos} direction={"column"} />
            </div>
            <Container className={styles.mainBody}>
            <Row>
                <Header />
            </Row>
            <Row>
                <Article article={getArticleFromDb(2022)}/>
            </Row>
            <audio src="audio/background.mp3" autoplay="true" muted controls></audio>
        </Container>
        </div>
    );
}