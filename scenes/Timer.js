const Phaser = window.Phaser;
import { Verificar } from "./Verificar.js";

export function Timer(scene) {

    if (scene.tiempo <= 0) {
        return; 
    }

    scene.tiempo--;
    scene.textoTimer.setText(`Tiempo: ${scene.tiempo}`);
    


    Verificar(scene);


}