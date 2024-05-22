# Apple-Newton Game

This code implements a simple 2D canvas game where the player controls a character (Dude) and avoids falling objects (Shapes). The game features the following mechanics:

## Player Movement: The player controls the Dude using keyboard arrow keys (left, right, up, down) or a virtual joystick on mobile devices (if supported by the browser).
## Falling Objects: Shapes (currently represented by apples) fall from the top of the screen at a random speed.
## Collisions: If the Dude collides with a falling Shape, the game pauses, and an end screen is displayed.
## Scoring: Each time a Shape falls off the bottom of the screen without colliding with the Dude, the score increases.
## Pausing: The game can be paused using the Escape key (on desktop) or a double tap on the canvas (on mobile devices, if supported). A pause menu is displayed while paused.
## Resuming: The game can be resumed from the pause menu by clicking the "Resume" button.
## Resetting: The game can be reset from the pause menu or the end screen using the dedicated buttons, restarting the game with a fresh score.

## Code Breakdown:

### Global Variables:
Define initial variables for game state, objects, dimensions, and images.
### Canvas Setup:
Handles canvas resizing on window resize events and sets initial canvas dimensions.
### Image Loading:
Loads the Dude and apple images asynchronously.
### isMobileDevice:
Detects if the user is on a mobile device based on user agent and touch screen capability.
### initializeJoystick: (Mobile only)
Initializes a virtual joystick using the nipplejs library for mobile controls.
### startGame:
Shows the start menu upon game load and adds a click event listener to the start button to initialize the game.
Initializes the joystick if on a mobile device.
### initializeGame:
Resets canvas dimensions, sets game state variables, creates the Dude object, and sets up keyboard and touch input listeners.
Starts the main game loop using requestAnimationFrame.
Starts generating shapes at regular intervals using setInterval.
### Dude Object:
Represents the player character with properties like position, size, image, and velocity.
Includes methods for checking collisions, updating position (with boundary checks), and drawing the Dude on the canvas.
### Shape Object:
Represents falling objects (currently apples) with properties like position, size, image, and velocity.
Includes methods for checking collisions (when reaching the bottom of the screen), updating position, and drawing the Shape on the canvas.
### shapeGenerate:
Generates a new Shape object at a random horizontal position on the screen if the game is not paused.
### newGame:
Resets game state variables, recreates the Dude object, clears existing shapes, and resets the score.
### togglePauseMenu:
Toggles the visibility of the pause menu and sets the isPaused flag to pause/resume the game (except when the game is already lost).
### Event Listeners:
Binds click events to buttons for resuming, resetting, and trying again (on the end screen).
Mobile Double Tap Functionality:

The detectDoubleTap function handles touch events on the canvas.
It calculates the time difference between taps and utilizes a timeout to differentiate between a single tap and a double tap within a specific time threshold (500 milliseconds).
If a double tap is detected, the togglePauseMenu function is called to pause/resume the game.
## Note:

This code assumes the existence of HTML elements for the start menu, pause menu, end screen, buttons, and score display. You'll need to create these elements in your HTML file and link them appropriately using their IDs.
The code utilizes external libraries like nipplejs for the virtual joystick functionality. Ensure you include these libraries in your HTML.
I hope this documentation provides a clear explanation of the code's functionality!