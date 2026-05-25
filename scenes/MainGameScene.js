import Personaje from "./Personaje.js";
import { SpawnFiguras } from "./SpawnFiguras.js";
import { Timer } from "./Timer.js";
import { Verificar } from "./Verificar.js";

export default class MainGameScene extends Phaser.Scene {
  constructor() {
    super("MainGameScene");
  }

  init() {
    this.inventarioItems = []; 
    this.tiempo = 30; 
  }

  preload() {
    this.load.image("sky", "./public/assets/Fondos/Sky.png");
    this.load.image('Plataforma', './public/assets/Plataforma.png');
    this.load.image('Jugador', './public/assets/Personaje.png');

    this.load.image('Cuadrado', './public/assets/Figuras/Cuadrado.png');
    this.load.image('Triangulo', './public/assets/Figuras/Triangulo.png');
    this.load.image('Rombo', './public/assets/Figuras/Rombo.png');
  }

  create() {
    this.add.image(960, 540, "sky");
    
    this.personaje = new Personaje(this, 900, 800, 'Jugador');
    
    this.plataformas = this.physics.add.staticGroup();

    this.plataformas.create(960, 1050, 'Plataforma');

    this.physics.add.collider(this.personaje, this.plataformas);

    this.itemsRecolectables = this.physics.add.group();

    this.textoContador = this.add.text(16, 16, 'Items: C:0 | T:0 | R:0', { fontSize: '24px', fill: '#fff' });
    this.textoTimer = this.add.text(1900, 16, `Tiempo: ${this.tiempo}`, { fontSize: '24px', fill: '#fff' }).setOrigin(1, 0);

    this.physics.add.collider(this.itemsRecolectables, this.plataformas);


    this.physics.add.overlap(this.personaje, this.itemsRecolectables, (personaje, item) => {
        this.inventarioItems.push(item.texture.key);
        item.destroy();
        this.Interfaz();
        Verificar(this);
    }, null, this);

    this.time.addEvent({ delay: 1000, callback: () => Timer(this), callbackScope: this, loop: true });

    this.time.addEvent({
        delay: 1000,
        callback: () => SpawnFiguras(this),
        callbackScope: this,
        loop: true
    });
  }

Interfaz() {
    const cuadrados = this.inventarioItems.filter(tipo => tipo === 'Cuadrado').length;
    const triangulos = this.inventarioItems.filter(tipo => tipo === 'Triangulo').length;
    const rombos = this.inventarioItems.filter(tipo => tipo === 'Rombo').length;

    this.textoContador.setText(`Items: C: ${cuadrados}/2 | T: ${triangulos}/2 | R: ${rombos}/2`);
  }
}


