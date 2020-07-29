view at http://mucyildiz.github.io/battleship/

This project was created to get used to working with React. It helped me get comfortable with how state and props in React work as well as how to pass down data through components in React and keep track of the data.

The game starts with a form underneath the player gameboard that takes in input for where the player wants to place his ship. The player can input number coordinates from 00 to 99 or have the first coordinate be a letter e.g. A0 or I9. The player can then make the ship vertical by pressing the "Make Vertical" button. When the player writes in a coordinate the board generates a mock ship at that location. The ship is then placed at the mock ship's location if "Place Ship" is clicked or the enter button is pressed. The game is able to begin when all of the user's ships are placed.

When the Start Game button is pressed, the CPU generates a board of ships at random placements that the User can't see. The user presses on the CPU board to make a move. If the player misses, the cell is blue, if they hit a ship, the cell is red. When all the CPU or User ships are sunk, the winning board gets a green border and the loser gets a red border. The player can then choose to restart by pressing the restart button.
