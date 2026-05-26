
const Phaser = window.Phaser;

export function Verificar(scene) {
    const cuadrados = scene.inventarioItems.filter(tipo => tipo === 'Cuadrado').length;
    const triangulos = scene.inventarioItems.filter(tipo => tipo === 'Triangulo').length;
    const rombos = scene.inventarioItems.filter(tipo => tipo === 'Rombo').length;


    

    if (scene.puntaje > 100) {
        scene.sound.play('win', { volume: 0.1 });
        scene.scene.start("End", { 
            mensaje: "WIN!!!!!!!!!!!!!!!!!!",
            total: scene.inventarioItems.length,
            puntaje: scene.puntaje

        });
        return; 
    }

    if (scene.tiempo <= 0) {
        scene.sound.play('lose', { volume: 0.1 });
        scene.scene.start("End", { 
            mensaje: "PERDISTE",
            total: scene.inventarioItems.length,
            puntaje: scene.puntaje

            
        });
    }
}
