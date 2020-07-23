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

        this.placeShip = this.placeShip.bind(this);
        this.handleAttack = this.handleAttack.bind(this);
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
                board[i][column].ship = ship;
                board[i][column].shipPosition = position;
                position++;
            }
        }
        this.setState({
            gameboard: board,
        });
    }

    handleAttack(row, col){
        let board = this.state.gameboard.slice();
        if(board[row][col].attacked === false) {
            if(board[row][col].ship !== null){
                board[row][col].ship.hitShip(board[row][col].shipPosition);
            }

            board[row][col].attacked = true;
    }
        this.setState({gameboard: board});
    }

    checkAllShipsSunk() {
        return this.state.ships.every((ship) => ship.isSunk());
    }
    render() {
        return(
            <h1 onClick={() => {
                this.placeShip(this.state.ships[0], 0, 4, true)
            }}>Hello</h1>
        )
    }


}