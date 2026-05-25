const Phaser = window.Phaser;

export function SpawnFiguras(scene) {
    const x = Phaser.Math.Between(50, 1850);
    const tipos = ['Cuadrado', 'Triangulo', 'Rombo'];
    const tipoSeleccionado = Phaser.Utils.Array.GetRandom(tipos);

    const item = scene.itemsRecolectables.create(x, 0, tipoSeleccionado);
    item.setBounce(Phaser.Math.FloatBetween(0.1, 0.3));
    item.setCollideWorldBounds(true);
}
