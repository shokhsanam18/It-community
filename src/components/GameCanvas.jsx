import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const GameCanvas = ({ width = 40, height = 40 }) => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    class GameScene extends Phaser.Scene {
      preload() {
        this.load.image(
          "player",
          "https://raw.githubusercontent.com/photonstorm/phaser3-examples/master/public/assets/sprites/mushroom16x16.png"
        );
      }

      create() {
        this.player = this.physics.add
          .sprite(width / 2, height / 2, "player")
          .setScale(1.2) // you can adjust scale as needed
          .setOrigin(0.5);
      }
    }

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width,
      height,
      parent: "phaser-container",
      backgroundColor: "transparent",
      transparent: true,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
      scene: GameScene,
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [width, height]);

  return (
    <div
      id="phaser-container"
      className="overflow-hidden rounded-full w-10 h-10 pointer-events-none"
    />
  );
};

export default GameCanvas;