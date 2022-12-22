export default class ImageConfig {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    static ConfigLandscape = new ImageConfig(4, 3);

    static ConfigPortrait = new ImageConfig(3, 4);
}