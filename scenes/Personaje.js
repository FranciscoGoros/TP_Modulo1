const Phaser = window.Phaser;

export default class Personaje extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setScale(1);
        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.vida = 3;
        this.velocidad = 100;


        preUpdate(time, delta) 
        {
        super.preUpdate(time, delta);

        if (this.teclas.left.isDown) {
            this.setVelocityX(-160);
        } else if (this.teclas.right.isDown) {
            this.setVelocityX(160);
        } else {
            this.setVelocityX(0);
        }
        if (this.teclas.up.isDown && this.body.touching.down) {
            this.setVelocityY(-330);
            }
        }
    }
}
