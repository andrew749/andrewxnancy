import { GetStaticProps } from 'next';
import styles from './styles.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Gallery from 'react-photo-gallery';
import ImageConfig from './image-config';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Article from './article';
import Header from './header';

export const getStaticProps: GetStaticProps = async () => {
    return {
      props: {}, // will be passed to the page component as props
    }
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