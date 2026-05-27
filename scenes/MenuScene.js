// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class MenuScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("MenuScene");
  }

  init() {


  }

  preload() {
    this.load.image("menu", "./public/assets/Sky.png");
    this.load.image("logo", "./public/assets/Texto/Ninja-Moncho-Logo.png");
  }

  create() {
    this.add.image(960, 540, "menu");
    const logo = this.add.image(960, 450, "logo");
    const rectangle_button = this.add.rectangle(960, 800, 300, 100, 0x08888).setOrigin(0.5);
    const button = this.add.text(960, 800, "Comenzar", {
      fontSize: "48px",
      fill: "#000000",
    }).setOrigin(0.5);

    rectangle_button.setInteractive();
    rectangle_button.on("pointerdown", () => {
      this.scene.start("MainGameScene");
    });
  }
}

