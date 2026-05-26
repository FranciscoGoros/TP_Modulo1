import Personaje from "./Personaje.js";
import { SpawnFiguras } from "./SpawnFiguras.js";
import { Timer } from "./Timer.js";
import { Verificar } from "./Verificar.js";

// El sistema de las figuras está en una escena aparte
// Así quedaba un poco más organizado...

export default class MainGameScene extends Phaser.Scene {
  constructor() {
    super("MainGameScene");
  }

  init() {

    // Añadí los 2 sistemas para que no se perdiera el array

    this.inventarioItems = [];
    this.puntaje = 0;
    this.tiempo = 30; 
  }

  preload() {
    this.load.audio('salto', './public/assets/sounds/JUMPSOUND.ogg');
    this.load.audio('win', './public/assets/sounds/win.mp3');
    this.load.audio('lose', './public/assets/sounds/lose.mp3');
    this.load.image("sky", "./public/assets/Fondos/sky2.png");
    this.load.image('Plataforma', './public/assets/Plataforma.png');
    this.load.image('Jugador', './public/assets/Personaje.png');

    this.load.image('Cuadrado', './public/assets/Figuras/Cuadrado.png');
    this.load.image('Triangulo', './public/assets/Figuras/Triangulo.png');
    this.load.image('Rombo', './public/assets/Figuras/Rombo.png');
    this.load.image('Piedra', './public/assets/Figuras/Piedra.png');
  }

  create() {

    
    this.add.image(960, 540, "sky");
    
    this.personaje = new Personaje(this, 900, 800, 'Jugador');
    
    this.plataformas = this.physics.add.staticGroup();

    this.plataformas.create(960, 1050, 'Plataforma');
    this.plataformas.create(2050, 850, 'Plataforma');
    this.plataformas.create(-200, 500, 'Plataforma');
    this.plataformas.create(2600, 500, 'Plataforma');
    this.plataformas.create(-2600, 700, 'Plataforma');
    this.physics.add.collider(this.personaje, this.plataformas);

    this.itemsRecolectables = this.physics.add.group();

    this.textoContador = this.add.text(16, 16, 'Items: C / 0 | T / 0 | R / 0', { fontSize: '34px', fill: '#fff' });
    this.textoTimer = this.add.text(1900, 16, `Tiempo: ${this.tiempo}`, { fontSize: '34px', fill: '#fff' }).setOrigin(1, 0);

    this.physics.add.collider(this.itemsRecolectables, this.plataformas, (obj1, obj2) => {
        
      // Culpa de phaser casi que esto no me funciona

        const item = (obj1.texture !== undefined) ? obj1 : obj2;

        if (item) {
            if (item.bounce === undefined) {
                item.bounce = 0;
            }
            // Acá se resta el valor, pero salta bastantes veces así que hay que ser rápido.
            item.valor -= 5;

            if (item.valor <= 0) {
                item.destroy();
            }
        }
    });

    this.textoPuntaje = this.add.text(16, 50, 'Puntaje: 0', { fontSize: '32px', fill: '#ffff00' });

    // Daba muchos errores pero esto al menos anda ahora

    this.physics.add.overlap(this.personaje, this.itemsRecolectables, (personaje, item) => {

        this.puntaje += item.valor;
        if (this.puntaje < 0) this.puntaje = 0;

        
        this.textoPuntaje.setText(`Puntaje: ${this.puntaje}`);
        this.Interfaz(); 

        this.inventarioItems.push(item.texture.key);
        item.destroy();
        this.Interfaz();
        Verificar(this);
    }, null, this);

    this.time.addEvent({ delay: 1000, callback: () => Timer(this), callbackScope: this, loop: true });

    this.time.addEvent({
        delay: 500,
        callback: () => SpawnFiguras(this),
        callbackScope: this,
        loop: true
    });
  }

Interfaz() {
    const cuadrados = this.inventarioItems.filter(tipo => tipo === 'Cuadrado').length;
    const triangulos = this.inventarioItems.filter(tipo => tipo === 'Triangulo').length;
    const rombos = this.inventarioItems.filter(tipo => tipo === 'Rombo').length;

    this.textoContador.setText(`Items: C ${cuadrados}/2 | T ${triangulos}/2 | R ${rombos}/2`);
  }
}


