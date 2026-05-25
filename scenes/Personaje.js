const Phaser = window.Phaser;

export default class Personaje extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setScale(1);
        scene.add.existing(this);

        scene.physics.add.existing(this);
        this.setMaxVelocity(300, 600);
        this.setCollideWorldBounds(true);
        this.vida = 3;
        this.velocidad = 100;
    }

}