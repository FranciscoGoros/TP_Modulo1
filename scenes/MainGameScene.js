import Personaje from "../scenes/Personaje.js";

export default class MainGameScene extends Phaser.Scene {
  constructor() {
    super("MainGameScene");
  }

  init() {
    this.inventarioItems = []; 
    this.tiempoRestante = 30; 
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
    this.textoTimer = this.add.text(784, 16, `Tiempo: ${this.tiempoRestante}`, { fontSize: '24px', fill: '#fff' }).setOrigin(1, 0);

    this.physics.add.collider(this.itemsRecolectables, this.plataformas);


    this.physics.add.overlap(this.personaje, this.itemsRecolectables, (personaje, item) => {
        this.inventarioItems.push(item.texture.key);
        item.destroy();
        this.actualizarInterfaz();
        this.verificarCondicionVictoria();
    }, null, this);

    this.time.addEvent({ delay: 1000, callback: this.actualizarTimer, callbackScope: this, loop: true });

    this.time.addEvent({
        delay: 1000,
        callback: this.generarItemAleatorio,
        callbackScope: this,
        loop: true
    });
  }

  generarItemAleatorio() {
    const x = Phaser.Math.Between(50, 1850);
    const tipos = ['Cuadrado', 'Triangulo', 'Rombo'];
    const tipoSeleccionado = Phaser.Utils.Array.GetRandom(tipos);

    const item = this.itemsRecolectables.create(x, 0, tipoSeleccionado);
    item.setBounce(Phaser.Math.FloatBetween(0.1, 0.3));
    item.setCollideWorldBounds(true);
  }

  actualizarInterfaz() {
    const cuadrados = this.inventarioItems.filter(tipo => tipo === 'Cuadrado').length;
    const triangulos = this.inventarioItems.filter(tipo => tipo === 'Triangulo').length;
    const rombos = this.inventarioItems.filter(tipo => tipo === 'Rombo').length;

    this.textoContador.setText(`Items: Cuadrados: ${cuadrados}/2 | Triángulos: ${triangulos}/2 | Rombos: ${rombos}/2`);
  }

  verificarCondicionVictoria() {
    const cuadrados = this.inventarioItems.filter(tipo => tipo === 'Cuadrado').length;
    const triangulos = this.inventarioItems.filter(tipo => tipo === 'Triangulo').length;
    const rombos = this.inventarioItems.filter(tipo => tipo === 'Rombo').length;

    if (cuadrados >= 2 && triangulos >= 2 && rombos >= 2) {
        this.scene.start('VictoryScene', { 
            mensaje: "¡Misión Cumplida!",
            totalRecolectado: this.inventarioItems.length 
        });
    }
  }

  actualizarTimer() {
    this.tiempoRestante--;
    this.textoTimer.setText(`Tiempo: ${this.tiempoRestante}`);

    if (this.tiempoRestante <= 0) {
        this.scene.start('Victoria', { 
            mensaje: "¡¡¡FINAL!!!!",
            totalRecolectado: this.inventarioItems.length 
        });
    }
  }
}

