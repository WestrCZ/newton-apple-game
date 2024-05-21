// Global variables
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
let shapes = {};
let shapeIndex = 0;
let score = 0;
let fallSpeed = 5;
let shapeGenerateSpeed = 300;
let dude;
let appleImage;
let dudeSize = 75;
let shapeSize = 50;
let isPaused = true;
let hasLost;

// Setting Canvas Dimensions
window.addEventListener('resize', function(){
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.width = screenWidth;
    canvas.height = screenHeight;
});
canvas.width = screenWidth;
canvas.height = screenHeight;

// Add an event listener to the window to execute the startGame function when the window loads
window.addEventListener('load', startGame);

// Load images and start the game when they're loaded
let dudeImage = new Image();
dudeImage.onload = function() {
    appleImage = new Image(); // Set the appleImage variable here
    appleImage.src = "images/apple.png";
};
dudeImage.src = "images/newton.png";

function startGame() {
    // Show the start menu
    const startMenu = document.getElementById('start_menu');
    startMenu.classList.remove('hide');

    // Add an event listener to the start button to start the game when clicked
    document.getElementById('startButton').addEventListener('click', function () {
        // Hide the start menu
        startMenu.classList.add('hide');

        // Initialize the game
        initializeGame();
    });
}


// Initialize the game
function initializeGame() {
    // Set canvas dimensions
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    isPaused = false;

    // Draw background image
    ctx.drawImage(dudeImage, 0, 0, screenWidth, screenHeight);

    // Create Dude object
    dude = new Dude(screenWidth / 2, dudeSize, dudeSize, dudeImage);

    // Add event listeners for keyboard input
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            togglePauseMenu();
        }
        if (e.key === 'ArrowLeft') {
            dude.Velocity.X = -5;
        } else if (e.key === 'ArrowRight') {
            dude.Velocity.X = 5;
        } else if (e.key === 'ArrowUp') {
            dude.Velocity.Y = -5;
        } else if (e.key === 'ArrowDown') {
            dude.Velocity.Y = 5;
        }
        // Escape bind to toggle pause menu
    });

    document.addEventListener('keyup', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            dude.Velocity.X = 0;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            dude.Velocity.Y = 0;
        }
    });

    // Game loop updater
    function Updater() {
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        for(let i in shapes){
            shapes[i].update();
        }
        dude.update();
    
        // Display score
        document.querySelector(".score").innerHTML = score;  
    
        requestAnimationFrame(Updater);
    }
    Updater(); // Start the game loop

    setInterval(shapeGenerate, shapeGenerateSpeed); // Generate shapes
}

// Create Dude object
function Dude(posX, width, height, image){
    this.Width = width;
    this.Height = height;
    this.Image = image;
    this.Position = { X: posX, Y: screenHeight - this.Height };
    this.Velocity = { X: 0, Y: 0 };

    this.checkCollisions = function(){
        function collision(a, b){
            return (
                a.Position.X <= b.Position.X + b.Width &&
                a.Position.X + a.Width >= b.Position.X &&
                a.Position.Y + a.Height >= b.Position.Y &&
                a.Position.Y <= b.Position.Y + b.Height
            );
        }
        for (let i in shapes){
            if(collision(this, shapes[i])){
                hasLost = !hasLost;
                isPaused = !isPaused;
                const pauseMenu = document.getElementById('end_screen');
                pauseMenu.classList.toggle('hide');

            }
        }
    };
    this.updatePosition = function(){
        this.updatePosition = function(){
            if (this.Position.X + this.Velocity.X >= 0 && this.Position.X + this.Width + this.Velocity.X <= screenWidth) {
                this.Position.X += this.Velocity.X;
            }
            if (this.Position.Y + this.Velocity.Y >= 0 && this.Position.Y + this.Height + this.Velocity.Y <= screenHeight) {
                this.Position.Y += this.Velocity.Y;
            }
        };
        
        
    };
    this.Draw = function(){
        ctx.drawImage(this.Image, this.Position.X, this.Position.Y, this.Width, this.Height);
    };
    this.update = function(){
        if(!isPaused){
        this.checkCollisions();
        this.updatePosition();
        }
        this.Draw();
    };
}

// Generates Snake Head
function Shape(posX, width, height, image) {
    this.Width = width;
    this.Height = height;
    this.Image = image;
    this.Position = {
        X: posX,
        Y: -this.Height
    };
    this.Velocity = Math.random() * fallSpeed;
    this.Index = shapeIndex;

    shapes[shapeIndex] = this;
    shapeIndex++;

    this.checkCollisions = function() {
        if (this.Position.Y >= screenHeight) {
            delete shapes[this.Index];
        }
    };
    this.updatePosition = function() {
        this.Position.Y += this.Velocity;
    };
    this.Draw = function() {
        ctx.drawImage(this.Image, this.Position.X, this.Position.Y, this.Width, this.Height);
    };
    this.update = function() {
        if(!isPaused){
        this.checkCollisions();
        this.updatePosition();
        }
        this.Draw();
    };
}

// Generates shapes
function shapeGenerate() {
    if(!isPaused){
    new Shape(Math.random() * screenWidth, shapeSize, shapeSize, appleImage);
    score+=10;
    $(".score").html(score);
    }
}

// Resets the game
function newGame(){
    isPaused = false;
    hasLost = false;
    dude = new Dude(screenWidth/2, dudeSize, dudeSize, dudeImage);
    shapes = {};
    score = 0;
}

// Function to toggle pause menu visibility and pause/resume the game
function togglePauseMenu() {
    if(!hasLost){
    const pauseMenu = document.getElementById('pauseMenu');
    pauseMenu.classList.toggle('hide');
    isPaused = !isPaused;
    }
}

// Game loop updater
function Updater() {
    if (!isPaused) {
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        for (let i in shapes) {
            shapes[i].update();
        }
        dude.update();

        // Display score
        document.querySelector(".score").innerHTML = score;

        requestAnimationFrame(Updater);
    }
}
// Event listener for resume button
document.getElementById('resumeButton').addEventListener('click', function () {
    togglePauseMenu();
});

// Event listener for reset button
document.getElementById('resetButton').addEventListener('click', function () {
    togglePauseMenu();
    newGame();
});
// Event listener for reset button
document.getElementById('tryAgainButton').addEventListener('click', function () {
    newGame();
    const pauseMenu = document.getElementById('end_screen');
    pauseMenu.classList.toggle('hide');
});
// // // /////////////////////////////////////////////////////////////////////
// Method to check if the user is on a mobile device
function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check for various mobile devices and operating systems
    if (/android|iPhone|iPad|iPod|opera mini|blackberry|kindle|windows phone|webOS|mobile/i.test(userAgent)) {
        return true;
    }

    // Check for touch screen capability as a secondary check
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
        return true;
    }

    return false;
}


// Method to initialize the joystick
function initializeJoystick() {
    const joystickContainer = document.getElementById('joystickContainer');
    joystickContainer.classList.remove('hide');

    // Create the joystick
    const joystick = nipplejs.create({
        zone: document.getElementById('joystick'),
        mode: 'static',
        position: { left: '50%', top: '50%' },
        color: 'white'
    });

    // Handle joystick movements
    joystick.on('move', function (evt, data) {
        const angle = data.angle.degree;
        const distance = data.distance;
        const maxSpeed = 5;
        dude.Velocity.X = Math.cos(angle * Math.PI / 180) * (distance / 100) * maxSpeed;
        dude.Velocity.Y = -Math.sin(angle * Math.PI / 180) * (distance / 100) * maxSpeed;
    });

    joystick.on('end', function () {
        dude.Velocity.X = 0;
        dude.Velocity.Y = 0;
    });
}

// Adjusted startGame method to include joystick initialization for mobile devices
function startGame() {
    // Show the start menu
    const startMenu = document.getElementById('start_menu');
    startMenu.classList.remove('hide');

    // Add an event listener to the start button to start the game when clicked
    document.getElementById('startButton').addEventListener('click', function () {
        // Hide the start menu
        startMenu.classList.add('hide');

        // Initialize the game
        initializeGame();
    });

    // Initialize joystick if on a mobile device
    if (isMobileDevice()) {
        initializeJoystick();
        // Hide the keyboard controls hint
        document.querySelector('.controls').classList.add('hide');
    }
}

// Call the startGame method when the window loads
window.addEventListener('load', startGame);

// Existing game code remains unchanged...
