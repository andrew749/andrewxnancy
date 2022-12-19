var CryptoJS = require("crypto-js");
import {PBKDF2, AES} from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import { useState, useEffect } from 'react';
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

function Header() {
    return (
        <div>
            <Head>
                <title>Andrew ❤️ Nancy</title>
            </Head>
            <h1 className={styles.mainTitle}>Andrew ❤️ Nancy 🤗</h1>
        </div>
    );
}

const ENCRYPTION_PARAMS = {
    salt: "2022",
    keySize: 128/32,
    keyIterations: 2000,
    iv: "0000000000000000"
}

/**
 * 
 * @param {*} datum JSON structured input frame.
 * @param {*} password Password to decrypt this json layer.
 * @returns 
 */
function decryptLayer(datum, password) {
    if (datum.index == 0) return {"index": 0, "answer": Utf8.stringify(Base64.parse(datum.answer))};
    const decodedCt = Base64.parse(datum.encoded);
    const decrypted = decrypt(decodedCt, password);
    const jsonRaw = Utf8.stringify(Base64.parse(Utf8.stringify(decrypted)));
    return JSON.parse(jsonRaw);
}


function decrypt(encryptedContent, password) {
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
    return fetch(`/letters/${articleName}`).then((resp) => {
            return resp.text();
        }).then((text) => {
            return Base64.parse(text);
        }).then((b64) => {
            return Utf8.stringify(b64);
        }).then((utf) => {
            return JSON.parse(utf);
        });
}

function Article({articleName}) {
    const [decryptedContent, updateDecryptedContent] = useState();
    const [decryptionError, updateDecryptionError] = useState();
    const [showDecryptionSuccess, setShowDecryptionSuccess] = useState(false);
    const [encryptedFrames, updateEncryptedFrames] = useState([]);

    useEffect(() => {
        getArticleFromDb(articleName).then((resp) => {
            updateEncryptedFrames([resp]);
        })
    }, []);

    useEffect(() => {
        if (encryptedFrames.length > 0 && encryptedFrames.at(-1).answer) {
            updateDecryptedContent(Utf8.stringify(Base64.parse(encryptedFrames.at(-1).answer)));
            setShowDecryptionSuccess(true);
            setTimeout(() => {
                setShowDecryptionSuccess(false);
            }, 3000);
        }
    }, [encryptedFrames]);

    const passwordInputHandler = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const nextIndexToDecrypt = encryptedFrames.length - 1;
        const nextPassword = data.get(nextIndexToDecrypt).toLowerCase();
        try {
            const decryptedLayer = decryptLayer(encryptedFrames[nextIndexToDecrypt], nextPassword);
            if (decryptedLayer) {
                updateEncryptedFrames(encryptedFrames.concat(decryptedLayer));
                updateDecryptionError(null);
            }
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
            {decryptedContent == null && <QuestionForm encryptedFrames={encryptedFrames} passwordInputHandler={passwordInputHandler} />}
            <pre className={styles.letterContainer}>{decryptedContent}</pre>
            {decryptionError && <Alert key="error" variant="danger">
                Incorrect!
            </Alert>}
        </div>
    );
}

function QuestionForm({encryptedFrames, passwordInputHandler}) {
    return (<div>
        <Form onSubmit={passwordInputHandler}>
            {encryptedFrames.map((element, index, array) =>
                <QuestionBox key={index} index={index} encryptedFrames={encryptedFrames} />
            )} 
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </div>);
}

function QuestionBox({ index, encryptedFrames }) {
    return (
        <Form.Group className="mb-3" controlId="formBasicAnswer">
            <Form.Label>{encryptedFrames[index].question}</Form.Label>
            <Form.Control name={index} type="answer" placeholder="Answer" />
        </Form.Group>
    );
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
    27: ImageConfig.ConfigPortrait,
    28: ImageConfig.ConfigLandscape,
    29: ImageConfig.ConfigPortrait,
    30: ImageConfig.ConfigPortrait,
    31: ImageConfig.ConfigPortrait,
    32: ImageConfig.ConfigLandscape,
    33: ImageConfig.ConfigPortrait,
    34: ImageConfig.ConfigPortrait,
    35: ImageConfig.ConfigPortrait,
    36: ImageConfig.ConfigLandscape,
    37: ImageConfig.ConfigPortrait,
    38: ImageConfig.ConfigPortrait,
    39: ImageConfig.ConfigPortrait,
    40: ImageConfig.ConfigPortrait,
    41: ImageConfig.ConfigLandscape,
    42: ImageConfig.ConfigLandscape,
    43: ImageConfig.ConfigLandscape,
    44: ImageConfig.ConfigLandscape,
    45: ImageConfig.ConfigPortrait,
    46: ImageConfig.ConfigLandscape,
    47: ImageConfig.ConfigPortrait,
    48: ImageConfig.ConfigPortrait,
    49: ImageConfig.ConfigLandscape,
    50: ImageConfig.ConfigLandscape,
    51: ImageConfig.ConfigLandscape,
}

const photos = Array.from(new Array(52), (x, i) => {return {
    src: `/images/img${i}.jpeg`, 
    height: imgConfigIndex[i].height, 
    width: imgConfigIndex[i].width,
}});

export default function HomePage() {
    

    return (
        <div className={styles.container}>
            <div className={styles.imageBackground}>
                <Gallery photos={photos} direction={"column"} />
            </div>
            <Container className={styles.mainBody}>
            <Row>
                <Header />
            </Row>
            <Row>
                <Article articleName={"christmas_2022"}/>
            </Row>
            <audio src="audio/background.mp3" autoPlay muted controls/>
        </Container>
        </div>
    );
}