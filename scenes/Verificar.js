
const Phaser = window.Phaser;

export function Verificar(scene) {
    const cuadrados = scene.inventarioItems.filter(tipo => tipo === 'Cuadrado').length;
    const triangulos = scene.inventarioItems.filter(tipo => tipo === 'Triangulo').length;
    const rombos = scene.inventarioItems.filter(tipo => tipo === 'Rombo').length;



    if (scene.puntaje > 100) {
        scene.scene.start("End", { 
            mensaje: "GANASTE",
            total: scene.inventarioItems.length,
            puntaje: scene.puntaje
        });
        return; 
    }

    if (scene.tiempo <= 0 && (cuadrados < 2 || triangulos < 2 || rombos < 2 || scene.puntaje < 100)) {
        scene.scene.start("End", { 
            mensaje: "PERDISTE",
            total: scene.inventarioItems.length,
            puntaje: scene.puntaje

            
        });
    }
}
