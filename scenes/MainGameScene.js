export default class MainGameScene extends Phaser.Scene {
  constructor() {

    super("MainGameScene");
  }

  preload() {

    this.load.image("sky", "./public/assets/Fondos/Sky.png");

  }

    create() {
    this.add.image(960, 540, "sky");
    }
}
