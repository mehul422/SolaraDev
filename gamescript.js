const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MainMenu, GameScene], // Scenes to be used in the game
};

const game = new Phaser.Game(config);

// Main Menu Scene
class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Load assets like background, buttons, etc.
        this.load.image('background', 'assets/images/background.png');
        this.load.image('startButton', 'assets/images/start_button.png');
        this.load.image('exitButton', 'assets/images/exit_button.png');
    }

    create() {
        // Add background image to the scene
        this.add.image(400, 300, 'background');

        // Start button
        const startButton = this.add.sprite(400, 250, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene'); // Switch to the game scene
        });

        // Hover effect for startButton
        startButton.on('pointerover', () => {
            startButton.setScale(1.1); // Slightly enlarge button on hover
        });
        startButton.on('pointerout', () => {
            startButton.setScale(1); // Reset size when not hovered
        });

        // Exit button
        const exitButton = this.add.sprite(400, 350, 'exitButton').setInteractive();
        exitButton.on('pointerdown', () => {
            this.game.destroy(true); // Quit the game (close the browser window or end session)
        });

        // Hover effect for exitButton
        exitButton.on('pointerover', () => {
            exitButton.setScale(1.1); // Slightly enlarge button on hover
        });
        exitButton.on('pointerout', () => {
            exitButton.setScale(1); // Reset size when not hovered
        });
    }
}

// Game Scene (where the actual gameplay happens)
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        // Add the game start message
        this.add.text(400, 300, 'Game Started!', {
            font: '32px Arial',
            fill: '#ffffff',
            align: 'center',
        }).setOrigin(0.5);

        // You can add more functionality or logic for the game here.
        // For now, we are displaying a simple text saying the game has started.
    }

    update() {
        // Game logic goes here, e.g., moving characters, updating scores, etc.
    }
}
