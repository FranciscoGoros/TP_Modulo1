// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class MenuScene extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("menuscene");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    // load assets
    this.load.image("menu", "./public/assets/Fondos/MenuPreliminar.png");
    this.load.image("logo", "./public/assets/Texto/Ninja-Moncho-Logo.png");
    this.load.image("red", "./public/assets/particles/red.png");
  }

  create() {
    // create game objects
    this.add.image(960, 540, "menu");

    const logo = this.add.image(420, 220, "logo");
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    // emmit particles from logo
    const emitter = this.add.particles(0, 0, "red", {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    emitter.startFollow(logo);
  }

  update() {
    // update game objects
  }
}
