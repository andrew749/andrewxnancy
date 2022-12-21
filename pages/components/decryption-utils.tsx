var CryptoJS = require("crypto-js");
import {PBKDF2, AES} from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import { Datum, AnswerFrame, EncryptedFrame } from './model';

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
export function decryptLayer(datum: Datum, password: string): Datum {
    if (datum.index == 0 && datum as AnswerFrame) return {"index": 0, "answer": Utf8.stringify(Base64.parse((datum as AnswerFrame).answer))};
    const encryptedFrame = datum as EncryptedFrame;
    const decodedCt = Base64.parse(encryptedFrame.encoded);
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