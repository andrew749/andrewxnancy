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

const photos = [
    {
      src: 'https://lh3.googleusercontent.com/2H3GAGFi7StjD7lx91MeF0eFaB8_OyVy-iZlVX5mdE60QBc8Z1AeSPerJJy36DgrwsX4T3YwKTBmgolZdCzlM9aZAYj-yudy8CvPvIdbGkhxRGg0SWqZ6Ike4OznDaQQ-tNg7AIoS02S6mVFfdnn8vp41PD0UvdgRpzdtQIKwBwPAEtaObioOt3WxyBVUAxQp8EiER6ncdtKFIlCNuQxCc1gCjPUSVxuegeDcj1_cDuJHz5wrT80-yIb8M5NL-hDIC9njAZW_GkIVKYdZosNEG8bUPyXS2TlU6Eai22rkQ2dC_nxogB3b5nmAK92XpJ_oUe6LHfYegIctnrmfnp5oxvLMXnS3w9w6xx8ID7sZvTClGeMqj3Ko1VtQtQnNApydb2A-FvO2knpP6kIlsKtjHNG8L-rGt5n8sMGFfJZ_Yx9ncg9K6ND79ZH2-unUMOo76BEzk0KXYMMZ2OBFdQkbKY03oSS5uSGyUgWxmKqgOYeB0rRfwmeyrPfcFW_DZjydykW9d04P_krhNnzKsoGDfjVD-uvYwUCnYsZUr2iNJBUchE60xsDtHUvdywzZEFgYavRcorvHiZhUGtDN2clS2HrKgIyCWyxjxLGh99JfsVgmDkXy4hh1BmO3kXb92533x6aGTEY4LcCxavpaNsONCN8jvOBlVDED7GSx93WyWUJfQ5X8ta0mDSLg1guyBFUHJ80OkJCImhd_r56McMjxUl3qy3Swh2bF_ZaO24OwC37ItOt1i6HNG6tQbypj4gaR_jqAKaQshru7TqH0TQE372IVf8BblhjlUN1z4m6mn9pcONp7k1bmcRIR3pzGZu70RqAA_avz7zTey8-ustw1GlfXeEL-8j4CcDbP-eCeXgZBt-r-vuOHTIlGiY-JMuroAuJknnFca5xugMn9Cw6OpskXVxENDyMOCi-sfm49F5UZx9D5-sbtZxVsMLiyQKqGdS6fy74TeqiVrBmR3_CweQ=w2670-h2004-no?authuser=0',
      width: 4,
      height: 3
    },
    {
      src: 'https://lh3.googleusercontent.com/5-iGZGQG2wuejL1P07m75UPPQtlurJA33i7IDGJcYCLySsE3H_uH2Egxc_apaM0E3s58MNpokDqf2XIqGgoXGiXuudtFA_-W693vC67ZsZfJkwXFGwJBFDO1Li0huRTh0WhVZZKFN7ejmp09uhZgMninrI5B26vUtbkt_269HTP0slBsHFXzf7V7iWK0cy5X3A4dVzh4lbp72wYN1ttS3TDZkdAZ987uriEtbuJO8aFP2e7KaE31RXpy-q0DNVGWr0FfqzPyCpzIYy2CHLoihmDvZgPJTAkkl5FtN7iE3fI8-9RZC15mMQLlRFElvYJAogiJvpQYGau302REyk4k28lgFK0v-MOI28WirSLrxYyOfaKtD3TV176oE2yJziH2BwOZua6PdBKAHoNhoXKPT5IDhyOTpXrP6-Sw856U9VQUaJCtMnfgXt4ihLkM2bsAfnr6N2PotBRMyplJAAjvphXi1XwtE0DYVMjodevSDqfEGX8TMNofbPqg4doNRBHfKfkwwW2GbGTnlSxkpFmbL3roJZDHRvXforsUoM_8b9UaivIEyRFnPuh1TYvKBL8vECeeURY1qs_KwUuJkHVLkvArPzjxdra2OFuQoEOQQf6RBcU0OBHB-i-cr_2ypMONrQUMoxXkXrSNifUiIkQMKNn-HG_MU9XfDh42oD9Glqaau3GpYJscWK2ZGAQWdntlEXlDTWPfrV6PebC5ZTkqpym6tdG2u_h-qJt6UpAI7_tVmqh-MpfrXR7GLnMlRR6yZ_vI07t8s_5VBvUa1jbVOXYTlYT5XvdFfPkQ3h7vs4_3GwDmO0IE3WBNw-f9TsZnF_gZiGkKmyOYif8YMrh7-ZRDQdti9aavap-9oJ2sJJbURVHwPMRnr54yzlBoFPUdCAVtRKlogaRwCyMNNy7Ptq9l1h4wHyGtKZtF4NuJ0--wBClDyw8uo515rNZA9S9kQGDlH8UshAYH2BxyFfmU3e8=w173-h231-no?authuser=0',
      width: 3,
      height: 4
    },
    {
        src: 'https://lh3.googleusercontent.com/LaXUL32feBxe-LleqPedwa17H1Eqg7qhqdQYfusxIRHmz9CxI39fVtrycPt7o11t0sPG3HG1iDWPtbq5AnHcM2co3ru1XWqFdmlTGj0Xkd-04d43g4WIKS0qSzJvXWac9a-ZirebAty9-_8rzH-7U2Mjy5KiRgEbn7VUXMZNTFVDOHdww6H87yqdlU8XDHHO2ASN9VTNTCDLKQP5QwpGlzdPGBFW9HVZ73N35J8DDdolYbXBEQyAbGU0nOtIRfA2HvgyRQpRCcYCd3dxg5PA564iYISDkdTgWQcYF0fAe6I_HBxFVjSC0swbHm_J9-R8HTWOHZQVX2ZWr-iAs6J1UVpc5_UNl0cefzYlpC-DNzio8z4LjuEaCpDgzmxYnyTfiiAYX_DN4QKmRAQZQLHVe20bTYIxTHttC4pz9ocOV9_wL2HsFnPGNPC8BG0sLxH6166jltfGEnWmcgTzYl5g4byflqCuIN9DDWlYHUq9qQPIm9C7E-du54GH18PGfOdOrTfLKg3E_G3rw7c4jqPc8h97b-_A6zvyViSrAe0gGVCga1eNI5mJq3WW_8uLFnJZRr4hDTjQFW1ssWb9W-raS-t9ni8lwYCeL57cV62gZBersm4p5HIWi00_JGWqPWJlITPQIZbrOUue8MiOVABz951BA39THStfL-JcSp05DRywLjvR9koWBRjJXA5TWlCiKh6179S9X3HvWhDRhqgimdqGCJLukOArtaMpSlYRBjFTh64oYjm5Gus85u0wpXDgXbAXmsCof8Vujdb8uawMkwKLLRk0cKydfzpDoIpivnwL1MXsnwPTOt_IfBWyVdkDt5BswAp8tXQLNTNwRkhKkOj7cIP3dt69M8DJaGUJ7KvTnR0CgxSg5MUBUmtUNA40xEjpY-JJzX5ie16ZrZtvh8jnnt1KMrM_ujpIRJevZMFlkagbrMyXsoZPrHhe_5OCFfb97pZJKPf29LG1awm0xIw=w1502-h2002-no?authuser=0',
        width: 3,
        height: 4
    },
    {
        src: 'https://lh3.googleusercontent.com/GfmzvYq1Ct7xQBEa-BqjRazJpk9IUkadvZ1UBv2Q0FaytIQeVtH_LKLjC9KQeuook3tCIwhdlxAOoBxDNIbs5xlsXjY8fthFjlk_8td_I8HvLUcy4s3WzAykffZgaGn4qzUOqRJtxZbFH9XeQMc1jtHYXXlep3qPvet19CIMuCx99sS-Z4ghhJ8nyF6P2I78ozhlNAaTY3A3UKt0u_CgvgZP47JWHQVSwVneHQWT3g5ZkI77t1pfEq_uAXOXMo3sQMRpXWALUY0UeflTXGdvXNX_c0jCTGiONmcM2LxFs375tAbm0GXL1QBpw_XUF-yDh6WSZrzMjIw0EBoqpPAGHbVJwwpgnTka-GZ_ZeLHnQEWKnq3uEJJd0eThDcIZEQKaT8AJWvts47Z2nfHN2ZbEKqeLqHeQ_jxs04eKCB8nVUZJ1grgSoh9fvz6iqUbYKG1ggG9KNOYPBhNALiR3u-6_EG8dXO59rgG83D_K7jH5lszqSIKPA4--x3mgo9le2A4YEHxBMrVHuMoxdkfYOzuzKHe_8yaUkztVarhd4zJHe80UfobApe4j1xKQwAam3QC9kYph00biVKL9VHh-cbIah-nQA43cxYuo5wvkh_a-zRlB8X30pNHlKiP_OtwB2LzB6QMsOWOGptE0UwokLOGEPdNXzZgsz0AgVHcBpgcZv6Tp_4uad_n1QKZvD81JK4mp4WltV8GA7g4ycVtEY2Znt9bt6e1wzpelWrjFdePLTKFMnGRiAtQ4L7lCvrCYU-S4W7IATKaxILePGexLiZwa7ehHwx8PKcDQm9yeNL5r6MENYI3xYBDs9IOj7koAn3WMJxdxSoDJqwAy8BTsA3VjKMf3D2VQ37R5NJbzSxZwsHtwryku3t5fAuxcexXtXrctqZT2q61E7jGI4jSKXmMAWChsB3RXIY3_iTDzH7vFd4uMw-_KxgU6gQzZSs2qvVgNYJv7yiN6S_HI0qjU37O24=w2670-h2004-no?authuser=0',
        width: 4,
        height: 3
    },
    {
        src: 'https://lh3.googleusercontent.com/29Ty4yuNOCmlU5YzdeMmck99_cbncivIVcGoJz1ZcMtr3ETEgEwg_9LD4PA_zo2gUkVWY-SrNCz5RO_iy55Q-nYf1owMN_QnLHd8pMEyPaoUhZu6Ez_iIznIsUYDtDYt3J9-d_PCiUobo1qtXBqyrm4uOtDY6A48LRpxpv1F_urFcn0t3M69nACsJ0m2yyp6GFEPauZ3ORa6rA48oLmiiY695G5DF5RS9NBu-9ZJ8lS4RiXN2C3jD-_RRMFkRpKmBx1kxotI0VNZ2clJpXCIHO-Y6QEM0OXOkDg-j7qcgoJvE8NvHpt_vTlOZoyBxYd6CbHhsoviYR4oE92yyVmRGK0SHYRk874d7D8QRGJRWATCdnyaAAGZuPoFkwcScDuOKvZwl89CV9I1ToZ0oeVLmx5hV3NkgKxHudJSqDrIF-66EjuOb09Gg38fiGSKrW_l1evXteI_sC2FUf73j0UXbExxk6BH4vuPqL1TTtX8zQYWZKqzonSO1tcGJmj0n7Ga_EpE3mTNCnEsUZdMda1VQ7F8ieWMq1OhmxmnqymFE_-QZF6k24P373kQufZ0LhzA-VLdKFR6P1WWrU6Vdm29zP3kNkgzHpxZqTz0rNDjrpKWLtXkljrAmODRSxqo4-IU_inDPxbe-cl7pN2PbDl58NEAGiS93D_n_tHOQvkDXlZRir8Rx-jExeo8zDplpAm596zrNYSwJlv1x22uWhGvlu7BoEdlcHueU_IX6A7vO_JIWm5CUAq31-8IRnGvcNVEMlY1Z0guU3cVLmRNLA3BCoJhEJGCBM_lPqDHMMyIRpxmEDBfrj9XsDYV4XBfZo3zUW5IJjoDCUj2eitaNWxDxY4YytTAK7GvM2XCTp2JtNorWJBmmYgeZUpp1pJt4K8z09NRA7YNp1VPKm3y9V3beQ081rB1e8RoFacxads8X2rSJcIuSPAKXbJBTkGz0Pn_d8gfHgoJk3P_NIdXMNraQ-o=w2670-h2004-no?authuser=0',
        width: 4,
        height: 3,
    },
    {
        src: 'https://lh3.googleusercontent.com/YitHYWltbV9Js-a46Ha76Coi1M2V4zde3X6uq7Ab9ecQC86IL8Mffqv9GpZ5O6WiYUV6cO32m-KFslJySWobomIMmPc8OrmFPcnGXlqQTl4IE5NNMH9QWZ5rGLw4JjBJVIwfq3hBU6Yx9OgEfvo8Mg7DvsjVNyvrz5plYLAAxuHh_9SiCgEYP3O_q2dPOgipIIe3gr44yDaMFNDD5P9luOTvlFkv2nIC4lXyB9qBiWqH5WGDSzZEMxoZR6DaPaNshtHeZkUtSvDKm8dNTFca_VLQk3tEohwD43aN_9QEjq46qVxe0GnMH-kR2W9k_xf5U5enfKn2STICEcic1REVv5WDjALEHiXNUPioKyDOpv13sXNt-dVRTsY_OvtdIipSCGEO6si-FUeG_EwLbe-BA7oUI359FhEF3SdIsPUAXtkjklYv0g58JzX4XfwfcBLilq3FCkOCozmfcybpqDs59KXgGR8TF0FhBaWLwEfb_M58TiK-OCc8osom72pR6BFKiOG3UzqoGDF2WOibFDYAyhsRAAKCZGA2B1ZGF51GvnZ5oT0KhPFP3p-yGseHd01zH5E6Kamm2L-T_d2Ocbs8DnNjCmHt70oKw_RbvBoUCobjCgSIGL2_6ECmuAN2vJTB6YGmbz1WBRLOHYnVvY8j3wEY_yoYwhdsD6C5ZOy4jrP9RWQMVpEdo37qjImp7fHmdRS8WWVdxklgHiCM-ENOmzaUp2YhNL_2d_t7T8ehIzUkfC7KPMDoI5Cuxb3k-2Vh6sapkljJ5zVTIQa_2r_o2WGgkNfjc7xqGP_k0z5WMwDHf__kwrcfXbVXJh-_93MP5rHFvQId_kX60cetI1X4OoPIoLAQ1R26sgkVJRKC8I-wltVXw69Pwq13ViLKo6_ixqCoddgDxJAUfXHIyhf4n8ufUe_xFilGxuksuUYNcUaiaRsNSi0-HMJEzI6G0SO3CsgjJBzJTi86y6f-n6af7kQ=w2670-h2004-no?authuser=0',
        width: 4,
        height: 3
    },
    {
        src: 'https://lh3.googleusercontent.com/bhMWvz2dzRVD-ZfUBK-O5ir8jbxQtrfE2qeLaGX5koDp5H533ksVZ0cPqKznPteu8w6ai8yeY5_Q5lFJpmV_lICu9H3plADAzqFzHk2H9qB2wO63ZQqBD1OF5qvEOxhuObKT519WuHxIj1RklQ67vjPoMIld2QFmXFqMvtwTmk5PxUIfv59EsfVjPSG1M0sLKiwlpXEf7SLLuDPO_pfVaKQ2hvPZV-Op77Gwk4ddKfvTxPmGPG4fQjnSfS7vHALrjGDPA6q4oTm84dFRcxKR1rGtX09xcqUGpfiW14mOXE-GT21z8hVklkEbLnP8fgjiAwwpvGjCFARJpj3OT7dF7xDKbL4OTPzSMwL7-k8hgvfc4gtef-6eOhsnYtP70ZwdPKD8-q9KCYqZ3W_lE85ZTrLfV6xMcFAJkuOfELt8vlsR0gQNJM5ZRx_2RtHw1Xe1yDRU0llefJK6bzA6TJLnl6HwzPopnWFedWnMRANHFEEHs4Ro4PcVH0pgO4Iy0D03Q-_ynwr5ItHxZ29xoj86Ox1MDhsyHu6Kydzg4mKsCesO6T9jJOxR-OmD3TP5LX1XaaKBKNKZuHrsxhMgRNtwKv3yMCnP3KpQyAh7_6XOZoqLFj1n65EGmACiCE-5i2CTUsWTOx2Q_1j4B7kw2p-ZRjF9SeCsIBi6My7Vs3iLI8y3LQeO0j5yYKAvaUDd7FcZeXG4YjiKiKLROQtOUDQDLndLkfndzVPP6ymim4KO9efvITJWK3YFlGiEjW2CEunkMaYTmlKtWPJAFi3ZZG0aS_h0SNNHRI96cK87sVA-Tz47MvtMixw47Ga4IXDRl807A7KFnkqAsZUNV9Vg3v8li-ZB6no2LUG8YDEn1zpUGIjgHYJP1GVPo9sS5GIkLfCgq2G5Y0ojm3KjFQ0o-bC1ziXjUM3Q0QDTg8hOxyhoiAfrboWWK5apWSaCY2s62EC6d6yLcixN6UHKs9rWNY-B-fg=w1502-h2002-no?authuser=0',
        width: 3,
        height: 4
    },
    {
        src: 'https://lh3.googleusercontent.com/l6AvJSRq1FNF-Zp6wrh9RBaxIBqyQBJxGxDIIhvKpTxpGYODX66c7S5yOIP0HTKARc_OVQ4VDqx5FZH41g-kiAeAf12MCufLgJRrmhaOw6zKlXgViTxIJQ6HxGA-BR4O9x03Q5XIqgM1SfVAObExdk8ZtdjgyWI2Co26Pxc004AWLcg-HphLsv-pI01nRsDmzozBT5y0B9Cpylg6Ie0XCsvccl6wy_BY_seWcu4Qwg93ltX8JE1hyb7SHc4TX4ezLX4AI4VxVp6CO8-rdr-SpE7pCzjGcxuT6orIZEYWGNrk1sRi8z5O2fabV_g0BUo82JAqeyTnsyIEzYdo17JT65HDhv34bSialSaSgJZyjjl2D2wY99dZOVztcNAE5CQfG9nll2ZbYVOfvBzhnXpKGzYfR1s1Ac9RyhZwYI717tUzo6he_LO7WGaajfkb_ClQckbxBOZCrR1nU8Yhoaccy1iyUcNsOIkoBgynIptgw7KrcvSox5YeQPLxPs7abocj_wcPyStVi1XDVcZhKHRqDQ_hSiaij-Y0Xm3j9W6DYowd17H-rP1XoAeDMB7tZYB4pDQW_8yTukUEAm2cxLc7CKDTDw4PC56X18xhJlolETDnGDEoys2ukOsUCw4Itb2a9U8mfamhQvzIJ7s6WDTFb2Lb0gKt7jOwi0AMH5MC5LfYVIYLCJX-RPJQK0pmRHfs2hj-af1Ud9cJO8BJYeD0jMbU0oO6MLH9s_0iyBw2wTJjWEP1xq0Gp4U_6D2LTPxl3zRrogaELjDVheGtgt_B6gQEMGJXtbI0FDAJV6rjzob9QTnhKkfJdYeaEbG6K1aSpgAq1foTwxtuHHOAwArbJbxQEmSedU7HkTz7NXBQeyyyNMS73d8a-0HIMhOT-aoQoFlgpaDS3gx-t7tQUHqM36Di0nhyrh0e-k-KjA_tjqI0MmTtF1tGWoPQevReAssSSDjjktTO_sSQZHqpl9j7YH0=w2670-h2004-no?authuser=0',
        width: 4,
        height: 3
    },
    {
        src: 'https://lh3.googleusercontent.com/tBUvpKHWMH9d0wYyFdp1fNiR12pXbghT5EZ1HBLNy132eu5zAjEpFqENn52I15qOdVYeYf4JXmt1vZGfg4kGOKbNP_giXg897L8w3XgpUok6bKFtTRKjm2JTvsoBbk76GeLNqM09n5F6canwVF7o8W1xPHHExQHXhyGVPtcbqSB7cs556l6dGjKy54l7V9EdHmbkPwDX_TX2pnBnzh02kYWMd4w2ZCtonUOrTEfr5rxyYX82_FUk5ohEBcXQhpoX-vO6zFLYNbpiTBlPGL3pTkEgMerq4yYPiCmxuQsWomNi2kLfl3BX9nNl5UdklsV0exQNvtAoC_wqoETzFMlsFv1ssAwLTItmpp-Et9obvEuGDvHdc3T08YtGKIlG7OKPj1lKe3eUhDlr9OxYQxHNzGA04eHhN9ajDaSQ0iC6e0NByY77IUZ0YsnZwxB009tUxrUSgpzjgBgeD_fhrevEbeGWZADl_Vj1_gQ3RTAhmXl5_jCevWcV9jF3j08JsXYzjJNJFazvO_Aqs2yhZtYa_Gd2kfkIWjIrtqT_mRi5CwzIUSfBUKEi3ElZI8uCvX75SrRShyKAIv4lEg4A2BTe5pMpA2jINuhTi4wP-z6z5sd4U_LrDIbFKvIhgxxjvRbGwW8lBsxHWUO0DLy_xepP4KWRxwicpIdUAlDcftwCPTii5DeE7wh1hLoorUnh4VqffivZHhieRVtA6hi9nFZwGHWF7e6hsYpfuDm_HS5NzokxdavLF0xrSnjcWCtn1fL1OkB6gxRzswWfcBd-1rP0XhwfiMAQkPOo3Y5BLtKUmx_5iONul7J4XXHClNxpRqgJMFaIAWnxoszoxUEqtBA8cjSRPS3dbXh6Gm2fv06eWpXpmdiLcW5Kj2n0vr82DacouovdzZWU0O_a8UAitm06JAe2qDr9ywqU5myiX4kYp8OI89bkdcj64nwnj13S-Nt6n-pANVZzoWGk75bjreMP0Z0=w1502-h2002-no?authuser=0',
        width: 3,
        height: 4
    },
    {
        src: 'https://lh3.googleusercontent.com/K4AbJCyzgx2a969qQSOrZWsp38CcyXA_3ZXEzUigiuKGJ89ovSOf-v2CqIucIx6xeMSz24kUMmYKvp1oKjjiWBWAdcOXewOhkv94n_hwaH6YFLQt8sJqM0ly12beB6c7jIYsHGK27nccsdfuyArYeUxQlsAhUmbC-gpOxo3iLJrsoyDQcq4pzdbtiHC4hJ0IXXc1NRHu0FJaEscuBGsJSwArVLVZ3OSsTn_EyqyS7xB340jH15nhwBcVxVjhFusgtGD591sNo3GO-0LFfJ5TPzToJ4Ku6RCKEutOrhgIITlAx3mbk9zILA1yC3J1cq9Co-7lvMOieaLh_4NLXMTVGFxmCtRNIjU68fbtV-qZMyWE7bN1PcDM2PPrD1LhzieeG_EEgyN9LkvXZOq-mAJ7uxmNaEtdCFNr1tt5VWT686aeTIaAnh9xZZECK1WZ0QlYgoD1AEVpzj8QbDcpE_xS4j4eQILamk6_eUdEon19cKAFZ1_hbbtpxdFVxQErZd1b7JlnwuTVwjg08kCwjEAVpSY2uU7V7kukbMA9PbYbK13G0Q7bXDJ68H2JLia6tijdQVaBRzGnh3OAKWCQ9wGF_LLMyHcKqF6pUoU9UroMbRDftF3v9_v9qIgjFcKVYecxuiiXs-VPk2CvOLQw0Zlwo52o8AQqXYDiEZf-6kmNrL0xNnLUbUasK6SXfYYkwlTt4SxmwjMRbNhdj8h3H7zfcU1u61a7DREK3r2i-bOto3T6WZUf0aj84uFlEwar-5XA3iu0Lz5FOCjuy3aR5XqWn6xnjBEJ-OPDMiTj1NQf9eQIRy-NB8cAiQYwz5VJZeNU815EhNaPaOhmyywUB_aLho6HWKYcxxKWSimmjvN47Gd-V78U7EJRlaa4gY7rn4Zu2_e-yBb2m_toexnjiQxlcBhg-zvcDvC1MvH55IoR-38cfvb2GagdbbutwYGdJyw2mz4XiA3Vsa8Cdn8swxibWRI=w2670-h2004-no?authuser=0',
        width: 4,
        height: 3
    },
    {
        src: 'https://lh3.googleusercontent.com/LFNYVduOHLxYIJAFuhCvDECCoJK9fB8D4-fz9aqMmrHhZhQHRdo8lKEuEW3jQcgmwtMuY3F9x4cj6AtChTFuJlOD-WPwTcm9xYeAk_sPB6gtF7isFCE5fDgv-9yDHI8jYtAp9lWRZ0XxXh3Pw2bz3Fk-K8Qprxvzdy5MC913P_b8t8om_Vo7h5wcTjiv8bAcp0nDxCJ3s87PQNrCyjFOdcrc0OPapJHDxQfWn9PGCtOLniH17JHmdElTEgfIzNw0ScDEJdFvnZtdS6h3IBim4IZK7KG9L9JuPuik1hpPR3ERS3ogkF9BRHwT8YJabs8D_NLrn5px8ltyB5ji-cojnAO_lYh7P5oTr-pX_iLdRKEBj3-nG9vmWcOtlQ2oX3F1fJaTQ5XaWyqY0p7sA42bW2WW-NeyBru3ikcU2EW-F0zGZiDHPydhvMvmuMxwio9ut7UK6Z1R7Q6B89spTorivVkEa1lBssVzpYzXujJz2VzBkh3Aj4-ZqAON-vCeVMTx34IDvYwSMIMB0qzwhMse2dNv8_RcoHdsEhv9DpN_ppFLm4eXDyZQtXtwWQ5RssWqEisTaeYuAEW9V7jcKl01vGPA19qHOnYiyj7mglZeE5L46dNYIgzbLf6XpLXnWXs4DTNfzPWGMukLZGBWbLmlSbs2R_ZICsdZAdQTDmU_iau-AjnvITayKSZnHc3xzrtP5gQnZpU-V1UwETfEdQ8vmcMIrQzwmIkE78jaoZQBbniFnyqakBtyOIkvkO_oihpuag4C4OJMBdLCVgL5pKzqkTyJTUG15C7ZEOYcIaJXvUeySIS5-xSq3LEbW6i8aCk5C0JbezWujHkQMxtnXpr6OlytucrMZwS85-fh5dlxSunuq6Jf1nNVo52SQ3Dt36PBiRFUFXpTBZ29oF6byMK6qeRJSk4ujotglYg_r7OhWoeYFZFwmHS-NHVCws8cWDSbr-bEsNCeyd6djK5q7B_cUdU=w2670-h2004-no?authuser=0',
        width: 4,
        height: 3
    }

  ];

export default function HomePage() {

    return (
        <div className={styles.container}>
        <div className={styles.imageBackground}>
            <Gallery photos={photos} direction={"column"}/>
            <Gallery photos={photos} direction={"column"}/>
        </div>
        <Container className={styles.mainBody}>
            <Row>
                <Header />
            </Row>
            <Row>
                <Article article={getArticleFromDb(2022)}/>
            </Row>
        </Container>
        </div>
    );
}