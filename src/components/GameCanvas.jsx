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
          .setScale(1.2)
          .setOrigin(0.5);

        this.player.setCollideWorldBounds(true);
        this.player.setDamping(true);
        this.player.setDrag(300);
        this.player.setMaxVelocity(150);

        this.cursors = this.input.keyboard.createCursorKeys();
      }

      update() {
        const accel = 200;
        const player = this.player;

        if (this.cursors.left.isDown) {
          player.setAccelerationX(-accel);
          player.setRotation(-0.15);
        } else if (this.cursors.right.isDown) {
          player.setAccelerationX(accel);
          player.setRotation(0.15);
        } else {
          player.setAccelerationX(0);
        }

        if (this.cursors.up.isDown) {
          player.setAccelerationY(-accel);
        } else if (this.cursors.down.isDown) {
          player.setAccelerationY(accel);
        } else {
          player.setAccelerationY(0);
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
          player.setRotation(0);
        }
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
