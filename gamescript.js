// Global settings that persist between scenes
const globalSettings = {
    brightness: 100, // percentage
    soundVolume: 80, // percentage
    musicVolume: 60  // percentage
};

// Main Menu Scene
class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        console.log("Preloading assets...");

        // Load assets
        this.load.image('background', 'assets/images/background.png');
        
        // Properly load the font
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'ARCADECLASSIC';
                src: url('assets/fonts/ARCADECLASSIC.ttf');
                font-weight: normal;
                font-style: normal;
            }
            
            /* Fix for black bars on various screens */
            html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            
            canvas {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        `;
        document.head.appendChild(style);
        
        // Create a hidden element to force font loading
        const fontPreloader = document.createElement('div');
        fontPreloader.style.fontFamily = 'ARCADECLASSIC, Arial';
        fontPreloader.style.position = 'absolute';
        fontPreloader.style.left = '-1000px';
        fontPreloader.style.visibility = 'hidden';
        fontPreloader.textContent = 'Font Preloader';
        document.body.appendChild(fontPreloader);
        
        // Log when assets finish loading
        this.load.on('complete', () => {
            console.log('Assets loaded successfully!');
            // Remove the preloader element once loading is complete
            document.body.removeChild(fontPreloader);
        });

        // Handle asset loading errors
        this.load.on('error', (file) => {
            console.error('Error loading file:', file);
        });
    }

    create() {
        console.log("MainMenu scene created...");

        // Add the background image
        this.background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background')
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Create a single-colored static title
        const titleText = 'SOLARA';
        
        // Change title color to white
        const titleColor = 0xFFFFFF; // White color instead of blue
        
        // Individual letter container to maintain proper spacing
        const lettersContainer = this.add.container(this.cameras.main.centerX, 100);
        
        // Letter positioning variables - maintain good spacing
        let currentX = -((titleText.length - 1) * 25); // Start position adjustment
        const letterSpacing = 50; // Good spacing between letters
        
        // Create individual letters all with the same color
        for (let i = 0; i < titleText.length; i++) {
            const letter = this.add.text(
                currentX + (i * letterSpacing), 
                0, 
                titleText[i], 
                {
                    fontFamily: 'ARCADECLASSIC, Arial',
                    fontSize: '82px',
                    fill: '#' + titleColor.toString(16),
                    align: 'center',
                    stroke: '#000000',
                    strokeThickness: 6,
                }
            ).setOrigin(0.5);
            
            lettersContainer.add(letter);
        }
        
        // Define exact colors for buttons - using explicit hex values
        const cosmicBlue = 0x4AA8C0;    // Cosmic light blue for Start
        const warmOrange = 0xFF8C42;    // Warm orange for Exit
        const mixedPurple = 0x9381FF;   // Appealing purple mix for Options
        
        // Create buttons with fixed size and colors
        const buttonWidth = 200;
        const buttonHeight = 50;
        
        // Create START button (cosmic blue)
        const startBg = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 50, 
            buttonWidth, 
            buttonHeight, 
            cosmicBlue
        );
        startBg.setStrokeStyle(4, 0xFFFFFF);
        
        const startText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 50, 
            'START', 
            {
                fontFamily: 'ARCADECLASSIC, Arial',
                fontSize: '32px',
                fill: '#FFFFFF',
                align: 'center',
            }
        ).setOrigin(0.5);
        
        // Make START button interactive
        startBg.setInteractive({ useHandCursor: true });
        startBg.on('pointerover', () => {
            startBg.setFillStyle(0x5BC8E0); // Lighter blue
            startText.setFill('#FFFF00'); // Yellow text
        });
        startBg.on('pointerout', () => {
            startBg.setFillStyle(cosmicBlue);
            startText.setFill('#FFFFFF');
        });
        startBg.on('pointerdown', () => {
            startBg.setFillStyle(0xFF0000); // Red when clicked
            this.time.delayedCall(100, () => {
                this.startGame();
            });
        });
        
        // Create OPTIONS button (purple)
        const optionsBg = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 30, 
            buttonWidth, 
            buttonHeight, 
            mixedPurple
        );
        optionsBg.setStrokeStyle(4, 0xFFFFFF);
        
        const optionsText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 30, 
            'OPTIONS', 
            {
                fontFamily: 'ARCADECLASSIC, Arial',
                fontSize: '32px',
                fill: '#FFFFFF',
                align: 'center',
            }
        ).setOrigin(0.5);
        
        // Make OPTIONS button interactive
        optionsBg.setInteractive({ useHandCursor: true });
        optionsBg.on('pointerover', () => {
            optionsBg.setFillStyle(0xB3A1FF); // Lighter purple
            optionsText.setFill('#FFFF00');
        });
        optionsBg.on('pointerout', () => {
            optionsBg.setFillStyle(mixedPurple);
            optionsText.setFill('#FFFFFF');
        });
        optionsBg.on('pointerdown', () => {
            optionsBg.setFillStyle(0xFF0000);
            this.time.delayedCall(100, () => {
                this.openOptions();
            });
        });
        
        // Create EXIT button (orange)
        const exitBg = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 110, 
            buttonWidth, 
            buttonHeight, 
            warmOrange
        );
        exitBg.setStrokeStyle(4, 0xFFFFFF);
        
        const exitText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 110, 
            'EXIT', 
            {
                fontFamily: 'ARCADECLASSIC, Arial',
                fontSize: '32px',
                fill: '#FFFFFF',
                align: 'center',
            }
        ).setOrigin(0.5);
        
        // Make EXIT button interactive
        exitBg.setInteractive({ useHandCursor: true });
        exitBg.on('pointerover', () => {
            exitBg.setFillStyle(0xFFAC62); // Lighter orange
            exitText.setFill('#FFFF00');
        });
        exitBg.on('pointerout', () => {
            exitBg.setFillStyle(warmOrange);
            exitText.setFill('#FFFFFF');
        });
        exitBg.on('pointerdown', () => {
            exitBg.setFillStyle(0xFF0000);
            this.time.delayedCall(100, () => {
                this.exitGame();
            });
        });
        
        // Apply brightness from global settings
        this.applyBrightness(globalSettings.brightness);
    }
    
    startGame() {
        console.log("Start button clicked");
        this.scene.start('GameScene');
    }
    
    openOptions() {
        console.log("Options button clicked");
        this.scene.start('OptionsScene');
    }
    
    exitGame() {
        console.log("Exit button clicked");
        
        // Attempt to close the tab
        window.close();
        
        // If window.close() doesn't work (due to browser security restrictions),
        // display a message and destroy the game as fallback
        this.time.delayedCall(100, () => {
            alert("Please close this tab manually. Some browsers prevent automatic tab closing for security reasons.");
            this.game.destroy(true);
        });
    }
    
    // Simplified brightness method without using WebGL shaders
    applyBrightness(value) {
        // Apply brightness effect to the background
        if (this.background) {
            // Map brightness value (0-100) to a visible range (0.2-1.5)
            // This ensures it's not completely black at 0% and can go brighter than normal at 100%
            const brightnessValue = 0.2 + (value / 100) * 1.3;
            this.background.setAlpha(brightnessValue);
            
            // For lower brightness, add a black overlay to darken everything else
            if (value < 50) {
                // Create or update the darkness overlay
                if (!this.darknessOverlay) {
                    this.darknessOverlay = this.add.rectangle(
                        this.cameras.main.centerX,
                        this.cameras.main.centerY,
                        this.cameras.main.width,
                        this.cameras.main.height,
                        0x000000
                    );
                    this.darknessOverlay.setDepth(1000); // Place it on top of everything
                }
                
                // Calculate opacity based on brightness (more transparent as brightness increases)
                // 0% brightness = 0.7 alpha (quite dark), 50% brightness = 0 alpha (invisible)
                const overlayAlpha = 0.7 - (value / 50) * 0.7;
                this.darknessOverlay.setAlpha(overlayAlpha);
            } else if (this.darknessOverlay) {
                // Hide the darkness overlay when brightness is 50% or higher
                this.darknessOverlay.setAlpha(0);
            }
        }
    }
}

// Options Scene with actual functionality
class OptionsScene extends Phaser.Scene {
    constructor() {
        super('OptionsScene');
        
        // Default keybinds
        this.keybinds = {
            attack: 'SPACE',
            jump: 'W',
            left: 'A',
            right: 'D',
            crouch: 'S'
        };
        
        // Use the global settings instead of local ones
        this.settings = globalSettings;
        
        // Currently selected keybind for remapping
        this.selectedKeybind = null;
        this.isRemapping = false;
    }
    
    create() {
        console.log("OptionsScene created...");
        
        // Add background
        this.background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background')
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
            
        // Add title
        this.add.text(this.cameras.main.centerX, 50, 'OPTIONS', {
            fontFamily: 'ARCADECLASSIC, Arial',
            fontSize: '48px',
            fill: '#FFFFFF', // Changed to white
            align: 'center',
            stroke: '#000000',
            strokeThickness: 6,
        }).setOrigin(0.5);
        
        // Add sections for different options
        this.createKeybindSection();
        this.createBrightnessSection();
        
        // Create BACK button (purple)
        const buttonWidth = 200;
        const buttonHeight = 50;
        const mixedPurple = 0x9381FF;
        
        const backBg = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.height - 50, 
            buttonWidth, 
            buttonHeight, 
            mixedPurple
        );
        backBg.setStrokeStyle(4, 0xFFFFFF);
        
        const backText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.height - 50, 
            'BACK', 
            {
                fontFamily: 'ARCADECLASSIC, Arial',
                fontSize: '32px',
                fill: '#FFFFFF',
                align: 'center',
            }
        ).setOrigin(0.5);
        
        // Make back button interactive
        backBg.setInteractive({ useHandCursor: true });
        backBg.on('pointerover', () => {
            backBg.setFillStyle(0xB3A1FF); // Lighter purple
            backText.setFill('#FFFF00');
        });
        backBg.on('pointerout', () => {
            backBg.setFillStyle(mixedPurple);
            backText.setFill('#FFFFFF');
        });
        backBg.on('pointerdown', () => {
            backBg.setFillStyle(0xFF0000);
            this.time.delayedCall(100, () => {
                this.scene.start('MainMenu');
            });
        });
        
        // Add keyboard listener for key binding
        this.input.keyboard.on('keydown', this.handleKeyDown, this);
        
        // Apply brightness when scene starts
        this.applyBrightness(this.settings.brightness);
    }
    
    createKeybindSection() {
        const startY = 120;
        const spacing = 50;
        
        // Create keybind buttons
        let i = 0;
        for (const [action, key] of Object.entries(this.keybinds)) {
            const y = startY + 40 + (i * spacing);
            
            // Action name
            this.add.text(this.cameras.main.centerX - 150, y, action.toUpperCase(), {
                fontFamily: 'ARCADECLASSIC, Arial',
                fontSize: '24px',
                fill: '#FFFFFF',
                align: 'right',
            }).setOrigin(1, 0.5);
            
            // Create button for the key binding
            const keyButton = this.add.rectangle(
                this.cameras.main.centerX + 20, 
                y,
                100,
                40,
                0x333333
            );
            keyButton.setStrokeStyle(2, 0xFFFFFF);
            
            // Add the current key text
            const keyText = this.add.text(
                this.cameras.main.centerX + 20,
                y,
                key,
                {
                    fontFamily: 'ARCADECLASSIC, Arial',
                    fontSize: '24px',
                    fill: '#FFFFFF',
                    align: 'center',
                }
            ).setOrigin(0.5);
            
            // Store references to text elements
            keyButton.keyText = keyText;
            keyButton.action = action;
            
            // Make the button interactive
            keyButton.setInteractive({ useHandCursor: true });
            keyButton.on('pointerover', () => {
                keyButton.setFillStyle(0x555555);
            });
            keyButton.on('pointerout', () => {
                keyButton.setFillStyle(0x333333);
            });
            keyButton.on('pointerdown', () => {
                // Start remapping this key
                this.startRemapping(keyButton);
            });
            
            i++;
        }
    }
    
    createBrightnessSection() {
        const startY = 350;
        
        // Brightness label
        this.add.text(this.cameras.main.centerX - 150, startY + 50, 'BRIGHTNESS', {
            fontFamily: 'ARCADECLASSIC, Arial',
            fontSize: '24px',
            fill: '#FFFFFF',
            align: 'right',
        }).setOrigin(1, 0.5);
        
        // Create brightness slider track
        const trackWidth = 200;
        const track = this.add.rectangle(
            this.cameras.main.centerX + 20, 
            startY + 50,
            trackWidth,
            10,
            0x333333
        );
        
        // Create brightness slider handle - position based on global setting
        const handleX = this.cameras.main.centerX + 20 - (trackWidth/2) + (this.settings.brightness/100 * trackWidth);
        const handle = this.add.rectangle(
            handleX,
            startY + 50,
            20,
            30,
            0xFFFFFF
        );
        
        // Value text - show the global setting
        const valueText = this.add.text(
            this.cameras.main.centerX + 140,
            startY + 50,
            this.settings.brightness + '%',
            {
                fontFamily: 'ARCADECLASSIC, Arial',
                fontSize: '24px',
                fill: '#FFFFFF',
                align: 'left',
            }
        ).setOrigin(0, 0.5);
        
        // Make handle draggable
        handle.setInteractive({ draggable: true });
        
        handle.on('drag', (pointer, dragX) => {
            // Calculate slider bounds
            const leftBound = this.cameras.main.centerX + 20 - (trackWidth/2);
            const rightBound = this.cameras.main.centerX + 20 + (trackWidth/2);
            
            // Constrain handle position
            const newX = Phaser.Math.Clamp(dragX, leftBound, rightBound);
            handle.x = newX;
            
            // Calculate brightness value (0-100)
            const percentage = Math.round(((newX - leftBound) / trackWidth) * 100);
            this.settings.brightness = percentage;
            
            // Update value text
            valueText.setText(percentage + '%');
            
            // Apply brightness effect to the game
            this.applyBrightness(percentage);
        });
    }
    
    startRemapping(keyButton) {
        // Clear any previous selection
        if (this.selectedKeybind && this.selectedKeybind !== keyButton) {
            this.selectedKeybind.setFillStyle(0x333333);
            this.selectedKeybind.keyText.setText(this.keybinds[this.selectedKeybind.action]);
        }
        
        // Set current selection
        this.selectedKeybind = keyButton;
        this.isRemapping = true;
        
        // Visual feedback
        keyButton.setFillStyle(0xFF0000);
        keyButton.keyText.setText('PRESS KEY');
    }
    
    handleKeyDown(event) {
        if (this.isRemapping && this.selectedKeybind) {
            // Get the key name
            let keyName = event.key.toUpperCase();
            
            // Handle special keys
            if (event.key === ' ') keyName = 'SPACE';
            if (event.key === 'ArrowUp') keyName = 'UP';
            if (event.key === 'ArrowDown') keyName = 'DOWN';
            if (event.key === 'ArrowLeft') keyName = 'LEFT';
            if (event.key === 'ArrowRight') keyName = 'RIGHT';
            
            // Update keybind
            const action = this.selectedKeybind.action;
            this.keybinds[action] = keyName;
            
            // Update visual
            this.selectedKeybind.keyText.setText(keyName);
            this.selectedKeybind.setFillStyle(0x333333);
            
            // Reset remap state
            this.isRemapping = false;
            
            console.log(`Remapped ${action} to ${keyName}`);
        }
    }
    
    // Simplified brightness method that works across all renderers
    applyBrightness(value) {
        // Apply brightness effect to the background
        if (this.background) {
            // Map brightness value (0-100) to a visible range (0.2-1.5)
            const brightnessValue = 0.2 + (value / 100) * 1.3;
            this.background.setAlpha(brightnessValue);
            
            // For lower brightness, add a black overlay to darken everything else
            if (value < 50) {
                // Create or update the darkness overlay
                if (!this.darknessOverlay) {
                    this.darknessOverlay = this.add.rectangle(
                        this.cameras.main.centerX,
                        this.cameras.main.centerY,
                        this.cameras.main.width,
                        this.cameras.main.height,
                        0x000000
                    );
                    this.darknessOverlay.setDepth(1000); // Place it on top of everything
                }
                
                // Calculate opacity based on brightness (more transparent as brightness increases)
                // 0% brightness = 0.7 alpha (quite dark), 50% brightness = 0 alpha (invisible)
                const overlayAlpha = 0.7 - (value / 50) * 0.7;
                this.darknessOverlay.setAlpha(overlayAlpha);
            } else if (this.darknessOverlay) {
                // Hide the darkness overlay when brightness is 50% or higher
                this.darknessOverlay.setAlpha(0);
            }
        }
        
        console.log(`Brightness set to ${value}%`);
    }
}

// Game Scene with Star Wars-style opening crawl
class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        
        // Opening crawl text
        this.openingText = "There was once a powerful, yet agile warrior named Solis on the planet of Lumina.\nSpecializing in speed and light, he often lets emotional attachments and overthinking get the best of him. He ventures out on a self-reflection journey, trying to fix his flaws to become a better person overall.\nBut, fate soon has different plans when he meets a celestial princess named Lunae: she is everything he could hope for in somebody who is pretty, daring, and has emotional control in her personality.\nBoth of them meet coincindentally while trying to find themselves, and you will be exploring their journey of finding one another amongst themselves, gaining maturity and mental fortitude along the way.\nSo, are you ready?";
    }

    create() {
        console.log("GameScene created...");
        
        // Add background
        this.background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background')
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
            
        // Create a hidden Begin Journey button (will be shown later)
        this.createBeginJourneyButton();
        
        // Add Synopsis title at the top
        const synopsisTitle = this.add.text(this.cameras.main.centerX, 70, 'SYNOPSIS', {
            fontFamily: 'ARCADECLASSIC, Arial',
            fontSize: '48px',
            fill: '#FFFFFF', 
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4,
        }).setOrigin(0.5);
        
        // Create text for crawl - straight and centered
        const crawlText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.height + 50, // Start below the screen
            this.openingText, 
            {
                fontFamily: 'ARCADECLASSIC, Arial',
                fontSize: '26px', // Slightly larger for better readability
                fill: '#FFFFFF', 
                align: 'center',
                wordWrap: { width: this.cameras.main.width * 0.7 }, // Narrower for better line length
                lineSpacing: 16, // More spacing between lines for readability
            }
        ).setOrigin(0.5, 0);
        
        // No tilt angle - keeping it straight for better readability
        
        // Animate the text crawling upward
        this.tweens.add({
            targets: crawlText,
            y: -crawlText.height, // Move up until it's off the top of the screen
            duration: 10000, // 30 seconds to complete the crawl
            ease: 'Linear',
            onComplete: () => {
                // Show Begin Journey button when crawl is complete
                this.showBeginJourneyButton();
            }
        });
        
        // Create MAIN MENU button (cosmic blue)
        const buttonWidth = 200;
        const buttonHeight = 50;
        const cosmicBlue = 0x4AA8C0;
        
        const menuBg = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.height - 50, 
            buttonWidth, 
            buttonHeight, 
            cosmicBlue
        );
        menuBg.setStrokeStyle(4, 0xFFFFFF);
        menuBg.setDepth(1001); // Ensure it's above the darkness overlay
        
        const menuText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.height - 50, 
            'MAIN MENU', 
            {
                fontFamily: 'ARCADECLASSIC, Arial',
                fontSize: '32px',
                fill: '#FFFFFF',
                align: 'center',
            }
        ).setOrigin(0.5);
        menuText.setDepth(1002); // Ensure it's above the button
        
        // Make menu button interactive
        menuBg.setInteractive({ useHandCursor: true });
        menuBg.on('pointerover', () => {
            menuBg.setFillStyle(0x5BC8E0); // Lighter blue
            menuText.setFill('#FFFF00');
        });
        menuBg.on('pointerout', () => {
            menuBg.setFillStyle(cosmicBlue);
            menuText.setFill('#FFFFFF');
        });
        menuBg.on('pointerdown', () => {
            menuBg.setFillStyle(0xFF0000);
            this.time.delayedCall(100, () => {
                this.scene.start('MainMenu');
            });
        });
        
        // Apply brightness from global settings
        this.applyBrightness(globalSettings.brightness);
    }

    update() {
        // Game logic goes here
    }
    
    // Create Begin Journey button (initially hidden)
    createBeginJourneyButton() {
        const buttonWidth = 240;
        const buttonHeight = 60;
        const skyBlue = 0xADD8E6;  
        
        this.beginJourneyBg = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            buttonWidth,
            buttonHeight,
            skyBlue
        );
        this.beginJourneyBg.setStrokeStyle(4, 0xFFFFFF);
        this.beginJourneyBg.setDepth(1001); 
        
        this.beginJourneyText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'BEGIN JOURNEY',
            {
                fontFamily: 'ARCADECLASSIC, Arial',
                fontSize: '30px',
                fill: '#FFFFFF',
                align: 'center',
            }
        ).setOrigin(0.5);
        this.beginJourneyText.setDepth(1002); // Ensure it's above the button
        
        // Make button interactive
        this.beginJourneyBg.setInteractive({ useHandCursor: true });
        this.beginJourneyBg.on('pointerover', () => {
            this.beginJourneyBg.setFillStyle(0xADD8E6); // Lighter green
            this.beginJourneyText.setFill('#FFFF00');
        });
        this.beginJourneyBg.on('pointerout', () => {
            this.beginJourneyBg.setFillStyle(skyBlue);
            this.beginJourneyText.setFill('#FFFFFF');
        });
        this.beginJourneyBg.on('pointerdown', () => {
            this.beginJourneyBg.setFillStyle(0xFF0000); // Red when clicked
            this.time.delayedCall(100, () => {
                this.scene.start('SampleGamePage');
            });
        });
        
        // Hide button initially
        this.beginJourneyBg.setVisible(false);
        this.beginJourneyText.setVisible(false);
    }
    
    // Show the Begin Journey button with a fade-in effect
    showBeginJourneyButton() {
        // Make button visible
        this.beginJourneyBg.setVisible(true);
        this.beginJourneyText.setVisible(true);
        this.beginJourneyBg.setAlpha(0);
        this.beginJourneyText.setAlpha(0);
        
        // Fade in animation
        this.tweens.add({
            targets: [this.beginJourneyBg, this.beginJourneyText],
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        });
    }

    // Simplified brightness method that works across all renderers
    applyBrightness(value) {
        // Apply brightness effect to the background
        if (this.background) {
            // Map brightness value (0-100) to a visible range (0.2-1.5)
            const brightnessValue = 0.2 + (value / 100) * 1.3;
            this.background.setAlpha(brightnessValue);
            
            // For lower brightness, add a black overlay to darken everything else
            if (value < 50) {
                // Create or update the darkness overlay
                if (!this.darknessOverlay) {
                    this.darknessOverlay = this.add.rectangle(
                        this.cameras.main.centerX,
                        this.cameras.main.centerY,
                        this.cameras.main.width,
                        this.cameras.main.height,
                        0x000000
                    );
                    this.darknessOverlay.setDepth(1000); // Place it on top of everything but below UI
                }
                
                // Calculate opacity based on brightness (more transparent as brightness increases)
                // 0% brightness = 0.7 alpha (quite dark), 50% brightness = 0 alpha (invisible)
                const overlayAlpha = 0.7 - (value / 50) * 0.7;
                this.darknessOverlay.setAlpha(overlayAlpha);
            } else if (this.darknessOverlay) {
                // Hide the darkness overlay when brightness is 50% or higher
                this.darknessOverlay.setAlpha(0);
            }
        }
    }
}

// Sample Game Page (after clicking Begin Journey)
class SampleGamePage extends Phaser.Scene {
    constructor() {
        super('SampleGamePage');
    }
    
    create() {
        console.log("SampleGamePage created...");
        
        // Add background with a different tint to differentiate from other scenes
        this.background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background')
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
            .setTint(0x446688); // Bluish tint to show it's a different screen
            
        // Add sample page title
        this.add.text(this.cameras.main.centerX, 80, 'SOLARA WORLD', {
            fontFamily: 'ARCADECLASSIC, Arial',
            fontSize: '48px',
            fill: '#FFFFFF',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4,
        }).setOrigin(0.5);
        
        // Add some placeholder content
        const contentText = "You have entered the world of Solara, where your journey begins. This is where the main gameplay would start, with character creation, exploration, or the first mission. Future development will expand this section with interactive gameplay elements.";
        
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, contentText, {
            fontFamily: 'ARCADECLASSIC, Arial',
            fontSize: '24px',
            fill: '#FFFFFF',
            align: 'center',
            wordWrap: { width: this.cameras.main.width * 0.7 },
            lineSpacing: 10,
        }).setOrigin(0.5, 0.5);
        
        // Add a character placeholder
        const characterPlaceholder = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 100,
            100,
            150,
            0x00AA55 // Green color for character
        );
        characterPlaceholder.setStrokeStyle(3, 0xFFFFFF);
        
        // Add text below the character
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 190, 'YOUR CHARACTER', {
            fontFamily: 'ARCADECLASSIC, Arial',
            fontSize: '20px',
            fill: '#FFFFFF',
            align: 'center',
        }).setOrigin(0.5);
        
        // Create MAIN MENU button (cosmic blue)
        const buttonWidth = 200;
        const buttonHeight = 50;
        const cosmicBlue = 0x4AA8C0;
        
        const menuBg = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.height - 50, 
            buttonWidth, 
            buttonHeight, 
            cosmicBlue
        );
        menuBg.setStrokeStyle(4, 0xFFFFFF);
        
        const menuText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.height - 50, 
            'MAIN MENU', 
            {
                fontFamily: 'ARCADECLASSIC, Arial',
                fontSize: '32px',
                fill: '#FFFFFF',
                align: 'center',
            }
        ).setOrigin(0.5);
        
        // Make menu button interactive
        menuBg.setInteractive({ useHandCursor: true });
        menuBg.on('pointerover', () => {
            menuBg.setFillStyle(0x5BC8E0); // Lighter blue
            menuText.setFill('#FFFF00');
        });
        menuBg.on('pointerout', () => {
            menuBg.setFillStyle(cosmicBlue);
            menuText.setFill('#FFFFFF');
        });
        menuBg.on('pointerdown', () => {
            menuBg.setFillStyle(0xFF0000);
            this.time.delayedCall(100, () => {
                this.scene.start('MainMenu');
            });
        });
        
        // Apply brightness from global settings
        this.applyBrightness(globalSettings.brightness);
    }
    
    // Simplified brightness method that works across all renderers
    applyBrightness(value) {
        // Apply brightness effect to the background
        if (this.background) {
            // Map brightness value (0-100) to a visible range (0.2-1.5)
            const brightnessValue = 0.2 + (value / 100) * 1.3;
            this.background.setAlpha(brightnessValue);
            
            // For lower brightness, add a black overlay to darken everything else
            if (value < 50) {
                // Create or update the darkness overlay
                if (!this.darknessOverlay) {
                    this.darknessOverlay = this.add.rectangle(
                        this.cameras.main.centerX,
                        this.cameras.main.centerY,
                        this.cameras.main.width,
                        this.cameras.main.height,
                        0x000000
                    );
                    this.darknessOverlay.setDepth(1000); // Place it on top of everything but below UI
                }
                
                // Calculate opacity based on brightness (more transparent as brightness increases)
                // 0% brightness = 0.7 alpha (quite dark), 50% brightness = 0 alpha (invisible)
                const overlayAlpha = 0.7 - (value / 50) * 0.7;
                this.darknessOverlay.setAlpha(overlayAlpha);
            } else if (this.darknessOverlay) {
                // Hide the darkness overlay when brightness is 50% or higher
                this.darknessOverlay.setAlpha(0);
            }
        }
    }
}

// Phaser Game Configuration
const config = {
    type: Phaser.AUTO, // Try to use WebGL, but fall back to Canvas if needed
    width: 800,
    height: 600,
    scene: [MainMenu, OptionsScene, GameScene, SampleGamePage],
    scale: {
        mode: Phaser.Scale.RESIZE, // Change to RESIZE for better fit on all screens
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container', // Optional: if you have a container div
        width: '100%',
        height: '100%'
    },
    backgroundColor: '#000',
    pixelArt: true, // Enable pixel art mode for crisp rendering
    render: {
        pixelArt: true,
        antialias: false,
        roundPixels: true
    },
    // Audio config settings
    audio: {
        disableWebAudio: false,
        noAudio: false
    }
};

// Create the Phaser game instance
const game = new Phaser.Game(config);