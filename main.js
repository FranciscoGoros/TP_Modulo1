import MainGameScene from "./scenes/MainGameScene.js";
import MenuScene from "./scenes/MenuScene.js";
import End from "./scenes/End.js";
// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1920,
      height: 1080,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [MenuScene, MainGameScene, End],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
