import { Ship } from './Ship';
import React, { Component } from 'react';
import './Gameboard.css';

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

    componentDidMount(props) {
        if(!this.props.user) {
            this.populateCPUGameboard();
        }
    }

    populateCPUGameboard() {
        for(let i=0; i<this.state.ships.length; i++){
            this.placeShip(this.state.ships[i], i, 0, false);
        }
    }


    placeShip(ship, row, column, rotated=false) {
        // make a copy so we don't mess with the state
        let board = this.state.gameboard.slice();
        let position = 0;
        // if rotated is false, then the ship is horizontal, if true then the ship is vertical: also checks to see if in bounds
        if (!rotated) {
            // begin at row that ship was placed on 
            if(column + ship.getLength() > 9) {
                throw new Error('ship is out of bounds');
            }

            for (let i=column; i<(column + ship.getLength()); i++) {
                if(board[row][i].ship !== null) {
                    throw new Error('Cannot overlap ships you fool.');
                }
            }

            for (let i=column; i<(column + ship.getLength()); i++) {
                board[row][i].ship = ship;
                board[row][i].shipPosition = position;
                ship.isPlaced = true;
                position++;
            }
        }
        else if (rotated) {

            if(row + ship.getLength() > 9) {
                throw new Error('ship is out of bounds');
            }

            for (let i=row; i<(row + ship.getLength()); i++) {
                if(board[i][column].ship !== null) {
                    throw new Error('Cannot overlap ships you fool.');
                }
            }

            for (let i=row; i<(row + ship.getLength()); i++) {
                board[i][column].ship = ship;
                board[i][column].shipPosition = position;
                ship.isPlaced = true;
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

        return (
            <div id='gameboard-container'>
                {this.state.gameboard.map((row, i) => 
                    <div key={i} className='row'>
                        {row.map((col, j) => (
                            <div key={i + j} className='cell'></div>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

