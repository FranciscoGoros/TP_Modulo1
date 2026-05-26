const Phaser = window.Phaser;

export default class Personaje extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setScale(0.7);
        scene.add.existing(this);

        scene.physics.add.existing(this);
        this.setMaxVelocity(600, 900);
        this.setCollideWorldBounds(true);
        this.vida = 3;
        this.velocidad = 500;

        this.teclas = scene.input.keyboard.createCursorKeys();
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        if (this.teclas.left.isDown) {
            this.setVelocityX(-this.velocidad);
        } else if (this.teclas.right.isDown) {
            this.setVelocityX(this.velocidad);
        } else {
            this.setVelocityX(0);
        }
        if (this.teclas.up.isDown && this.body.touching.down) {
            this.setVelocityY(-1100);
            this.scene.sound.play('salto', { volume: 0.1 });
         }
    }
}