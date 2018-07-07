
// Enemies our player must avoid

let gear=1;

class Enemy{
    constructor(x,y,speed){
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
        this.x=x;
        this.y=y;
        this.speed=speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png'
    }

    update(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x += this.speed * dt;
        this.startingPoint = -100;
        // setting enemies to starting point after they move out of screen
        if (this.x >= 505){
            this.x=this.startingPoint;
        // setting new speed for the enemy
            this.speed=Math.floor(Math.random() * 220 + 30 * gear);
        }
        // checking collision
        this.checkCollision();
    }


    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // checked from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    checkCollision(){
        // Set playerbox and enemybox
        let playerBox = {x: player.x, y: player.y, width: 50, height: 40};
        let enemyBox = {x: this.x, y: this.y, width: 60, height: 70};
        // Check for collisions
        if (playerBox.x < enemyBox.x + enemyBox.width &&
            playerBox.x + playerBox.width > enemyBox.x &&
            playerBox.y < enemyBox.y + enemyBox.height &&
            playerBox.height + playerBox.y > enemyBox.y) {
            // Collision detected, call collisionDetected function
            player.resetGame();
        }

    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player{
    constructor(x,y){
        this.startingX = 200;
        this.startingY = 400;
        this.x = this.startingX;
        this.y = this.startingY;
        this.sprite = 'images/char-boy.png';
    }

    update(){
        if (this.y < 67 ) {
            this.resetGame();
            const modal = document.querySelector('.modal');
            modal.style.display = "block";
            gear++
            let gears = document.getElementById("gear");
            gears.textContent="Let's go to gear: "+gear;
        } 
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };


    // Resets the player position to the start position
    resetGame() {
        this.x = this.startingX;
        this.y = this.startingY;
    };

    // Move the player according to keys pressed
    handleInput(allowedKeys) {
        switch (allowedKeys) {
            case "left":
                //check for wall, otherwise move left
                if (this.x > 0) {
                    this.x -= 101;
                }
                break;
            case "right":
                //check for wall, otherwise move right
                if (this.x < 402) {
                    this.x += 101;
                }
                break;
            case "up":
                //check if player reached top of water, otherwise move up
                if (this.y >67) {
                    this.y -= 83;
                    modal.style.display = "none";
                }
                break;
            case "down":
                //check for bottom, otherwise move down
                if (this.y < 400) {
                    this.y += 83;
                }
                break;
        }
    }   
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Instantiate player
let player = new Player();

// Empty allEnemies array
let allEnemies = [];

// Instantiate all enemies,  push to allEnemies array
for (let i = 0; i < 4; i++) {
    //startSpeed is a random number from 1-10 times speedMultiplier
    let startSpeed = Math.floor(Math.random() * 220 + 30 * gear);
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230, 315
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

let input = function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
};
document.addEventListener('keyup', input);

