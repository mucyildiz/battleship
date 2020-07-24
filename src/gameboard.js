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
            placedShips: [],
            gameover: false,
        }

        this.placeShip = this.placeShip.bind(this);
        this.handleAttack = this.handleAttack.bind(this);
        this.populateCPUGameboard = this.populateCPUGameboard.bind(this);
        this.checkAllShipsSunk = this.checkAllShipsSunk.bind(this);
    }

    componentDidMount(props) {
        if(!this.props.user) {
            this.populateCPUGameboard();
            this.handleAttack(0, 0);
            this.handleAttack(9, 9);
        }
    }

    populateCPUGameboard() {
        let localShips = this.state.ships.slice();
        while(localShips.length > 0) {
            try{
                const xCoord = this.getRandomInt(9);
                const yCoord = this.getRandomInt(9);
                const rotation = Math.random() > .5 ? true: false;
                const currShip = localShips[0];
                this.placeShip(currShip, xCoord, yCoord, rotation);
                localShips.splice(0, 1);
            }
            catch{}
        }
        this.setState({ships: localShips})
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    placeShip(ship, row, column, rotated=false) {
        // make a copy so we don't mess with the state
        let board = this.state.gameboard.slice();
        let position = 0;
        // if rotated is false, then the ship is horizontal, if true then the ship is vertical: also checks to see if in bounds
        if (!rotated) {
            // begin at row that ship was placed on 
            if(column + ship.getLength() > 10) {
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
            this.setState((prevState) => ({ placedShips: prevState.placedShips.concat([ship]) }), () => {
                console.log(this.state.placedShips)
            })
        }
        else if (rotated) {

            if(row + ship.getLength() > 10) {
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
            this.setState((prevState) => ({ placedShips: prevState.placedShips.concat([ship]) }), () => {
                console.log(this.state.placedShips)
            })
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
                this.checkAllShipsSunk();
            }
            board[row][col].attacked = true;
    }
        this.setState({gameboard: board});
    }

    checkAllShipsSunk() {
        const allSunk = this.state.placedShips.every((ship) => ship.isSunk());
        this.setState({gameover: allSunk}, () => {
            console.log(this.state.gameover)
        });
    }

    render() {

        return (
            <div id='gameboard-container'>
                {this.state.gameboard.map((row, i) => 
                    <div key={i} className='row'>
                        {row.map((ship, j) => (
                            <Cell 
                            key={i + j} 
                            className='cell'
                            attacked={ship.attacked}
                            ship={ship.ship}        
                            shipPosition={ship.shipPosition}
                            user = {this.props.user}          
                            onclick={() => this.handleAttack(i, j)}
                            />
                        ))}
                    </div>
                )}
                <GameOver 
                isGameOver = {this.state.gameover}
                />
            </div>

        )
    }
}

class Cell extends Component {
    render () {
        //if miss
        if(this.props.attacked && !this.props.ship){
            return (
                <div className='missed cell'></div>
            )
        }
        //if hit
        else if(this.props.attacked && this.props.ship){
            return (
                <div className='hit cell'></div>
            )
        }
        else if(this.props.ship){
            if(this.props.user) {
            return (
                <div className ='ship cell'></div>
            )
            }
            else{
                return (
                    <div onClick={this.props.onclick} className ='cell'></div>
                )
            }
        }
        return (
            <div onClick={this.props.onclick} className='cell'></div>
        )
    }

    //attacked, ship, shipPosition
}

class GameOver extends Component {
    render() {
        if (this.props.isGameOver){
        return (
            <div id='game-over'>
                <h1>Game Over</h1>
            </div>
        )
        }
        else{
            return null
        }
    }
}