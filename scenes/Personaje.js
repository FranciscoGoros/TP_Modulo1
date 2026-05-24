export default class Personaje extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, "Personaje");

        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.vida = 3;
        this.velocidad = 100;
    }


    init() {



    }

    preload() {




    }



    create() {



    }

}