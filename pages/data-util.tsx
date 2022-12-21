import { EncryptedFrame } from "./model";
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';


export function getArticleFromDb(articleName: string): Promise<EncryptedFrame> {
    return fetch(`/letters/${articleName}`).then((resp) => {
            return resp.text();
        }).then((text) => {
            return Base64.parse(text);
        }).then((b64) => {
            return Utf8.stringify(b64);
        }).then((utf) => {
            return JSON.parse(utf);
        }).then((json) => json as EncryptedFrame);
}