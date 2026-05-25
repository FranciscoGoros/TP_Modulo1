import Personaje from "../scenes/Personaje.js";


export default class MainGameScene extends Phaser.Scene {
  constructor() {

    super("MainGameScene");

  }

  preload() {

    this.load.image("sky", "./public/assets/Fondos/Sky.png");
    this.load.image('Plataforma', './public/assets/Plataforma.png');
    this.load.image('Jugador', './public/assets/Personaje.png');
  }

    create() {

    this.add.image(960, 540, "sky");
    this.personaje = new Personaje(this, 900, 800, 'Jugador');
    this.plataformas = this.physics.add.staticGroup();
    this.plataformas.create(960, 1050, 'Plataforma');
    

    this.physics.add.collider(this.personaje, this.plataformas);
    }
}
