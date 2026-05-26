const Phaser = window.Phaser;

export function SpawnFiguras(scene) {
    const x = Phaser.Math.Between(0, 1850);
    const tipos = ['Cuadrado', 'Triangulo', 'Rombo', 'Piedra'];
    const tipoSeleccionado = Phaser.Utils.Array.GetRandom(tipos);

    const item = scene.itemsRecolectables.create(x, 0, tipoSeleccionado);
    item.setBounce(Phaser.Math.FloatBetween(0.1, 0.5));
    item.setCollideWorldBounds(true);

    if (tipoSeleccionado === 'Cuadrado') item.valor = 10; 
        else if (tipoSeleccionado === 'Triangulo') item.valor = 15;
            else if (tipoSeleccionado === 'Rombo') item.valor = 20;
                else if (tipoSeleccionado === 'Piedra') item.valor = -15;
}
