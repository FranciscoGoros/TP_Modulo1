const Phaser = window.Phaser;

export function Verificar(scene) {
    const cuadrados = scene.inventarioItems.filter(tipo => tipo === 'Cuadrado').length;
    const triangulos = scene.inventarioItems.filter(tipo => tipo === 'Triangulo').length;
    const rombos = scene.inventarioItems.filter(tipo => tipo === 'Rombo').length;

    if (cuadrados >= 2 && triangulos >= 2 && rombos >= 2 || (scene.tiempo <= 0))     {
        scene.scene.start('End', { 
            mensaje: "¡YAY!",
            totalRecolectado: scene.inventarioItems.length 
        });
        return; 
    }
}
