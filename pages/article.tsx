import React, { useState, useEffect } from "react";
import { Collapse, Alert } from "react-bootstrap";
import { decryptLayer } from "./decryption-utils";
import { Datum, AnswerFrame } from "./model";
import { getArticleFromDb } from "./data-util";
import QuestionForm from "./question-form";
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import styles from './styles.module.css';

export default function Article({articleName}) {
    const [decryptedContent, updateDecryptedContent] = useState<string | null>();
    const [decryptionError, updateDecryptionError] = useState<string | null>();
    const [showDecryptionSuccess, setShowDecryptionSuccess] = useState<boolean>(false);
    const [encryptedFrames, updateEncryptedFrames] = useState<Array<Datum>>([]);

    useEffect(() => {
        getArticleFromDb(articleName).then((resp) => {
            updateEncryptedFrames([resp]);
        })
    }, []);

    useEffect(() => {
        if (encryptedFrames.length > 0 && encryptedFrames.at(-1) && (encryptedFrames.at(-1) as AnswerFrame)?.answer) {
            updateDecryptedContent(Utf8.stringify(Base64.parse((encryptedFrames.at(-1) as AnswerFrame)?.answer)));
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
        const nextPassword = (data.get(nextIndexToDecrypt.toString()) as string)?.toLowerCase();
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