import { Ship } from './ship';
import React, { Component } from 'react';

export default class Gameboard extends Component {
    constructor(props) {

        super(props);

        const carrier = Ship('Carrier', 5);
        const battleship = Ship('Battleship', 4);
        const destroyer = Ship('Destroyer', 3);
        const submarine = Ship('Submarine', 3);
        const patrolBoat = Ship('Patrol Boat', 2);

        this.state = {
            gameboard: new Array(10).fill(null).map(() =>
            new Array(10).fill(null).map(() =>
              {return {attacked: false, ship: null, shipPosition: null}})),
            ships: [carrier, battleship, destroyer, submarine, patrolBoat],
        }
    }


    placeShip(ship, row, column, rotated=false) {
        // make a copy so we don't mess with the state
        let board = this.state.gameboard.slice();
        let position = 0;
        // if rotated is false, then the ship is horizontal, if true then the ship is vertical: TODO - check to see if in bounds
        if (!rotated) {
            // begin at row that ship was placed on 
            for (let i=column; i<(column + ship.getLength()); i++) {
                board[row][i].ship = ship;
                board[row][i].shipPosition = position;
                position++;
            }
        }
        if (rotated) {
            for (let i=row; i<(row + ship.getLength()); i++) {
                console.log(ship.getLength());
                board[i][column].ship = ship;
                board[i][column].shipPosition = position;
                position++;
            }
        }
        console.log(board)
    }

    render() {
        return(
            <h1 onClick={() => {
                this.placeShip(this.state.ships[0], 0, 4)
            }}>Hello</h1>
        )
    }


}