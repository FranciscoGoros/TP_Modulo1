const Phaser = window.Phaser;
// Pantalla de final
export default class End extends Phaser.Scene {
    constructor() {
        super("End");
    }   

init (data) {
    this.mensaje = data.mensaje;
    this.total = data.total || 0;
    this.puntaje = data.puntaje || 0;
}

create() {
        this.cameras.main.setBackgroundColor('#1a1a1a');

        this.add.text(960, 400, this.mensaje, { 
            fontSize: '100px', 
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(960, 500, `Figuras recolectadas: ${this.total}`, { 
            fontSize: '32px', 
            fill: '#ffffff' 
        }).setOrigin(0.5);

        this.add.text(960, 600, `Puntaje Final: ${this.puntaje}`, { 
            fontSize: '45px', fill: '#ffff00' 
        }).setOrigin(0.5);


        this.add.text(960, 800, 'CLICK PARA REINICIAR', { 
            fontSize: '40px', 
            fill: '#00fff2' 
        }).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}


