// player has properties (gameboard, isPlayerTwo) and state turn, should have 
import React, { Component } from 'react';
import { Ship } from './Ship';
import './Gameboard.css'

export default class Player extends Component {
    constructor(props){
        super(props);

        const carrier = Ship('Carrier', 5);
        const battleship = Ship('Battleship', 4);
        const destroyer = Ship('Destroyer', 3);
        const submarine = Ship('Submarine', 3);
        const patrolBoat = Ship('Patrol Boat', 2);

        //player one goes first
        this.state = {
            gameboard: new Array(10).fill(null).map(() =>
            new Array(10).fill(null).map(() =>
            {
                return {attacked: false, ship: null, shipPosition: null, mock: false}
            })),
            ships: [carrier, battleship, destroyer, submarine, patrolBoat],
            mockShips: [carrier, battleship, destroyer, submarine, patrolBoat],
            placedShips: [],
            gameover: false,
            loser: false,
            numPlacedShips: 0,
        }
    }

    componentDidMount() {
        if(!this.props.user) {
            this.populateCPUGameboard();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.user){
            if(this.props.input.length === 2){
                let xCoord = this.mapLetterToNumber(this.props.input[0]);
                let yCoord = Number(this.props.input[1]);
                if(prevProps.input !== this.props.input){
                    try{
                    this.placeMockShip(this.state.mockShips[0], xCoord, yCoord, false);
                    }
                    catch(err){
                        alert(err)
                    }
                }
            }
            else{
                if(prevProps.input !== this.props.input){
                    this.clearMocks();
                }
            }
        }
        //if a ship coordinate has been submitted, add that ship to the user board
        if(this.props.user && prevProps.shipCoords !== this.props.shipCoords){
            //get latest coordinates
            let coordinates = this.props.shipCoords[this.props.shipCoords.length-1];
            console.log(coordinates);
            try{
            this.placeShip(this.state.ships[0], this.mapLetterToNumber(coordinates[0]), coordinates[1]);
            //made numplaced ships since setstate is async and can't keep track of placedships.length instantaneously
            this.setState((currentState) => {
                return {
                    numPlacedShips: currentState.numPlacedShips + 1,
                }
            }, () => 
            //if all ships placed, we can start the game, takes away form to add ships
            {
                if(this.state.numPlacedShips === 5){
                    this.props.ready();
                }
            })
            }
            catch(err){
                alert(err);
            }
        }

        //if its the user board and its not the user's turn, the CPU moves
        if(this.props.user && prevProps.turn !== this.props.turn && !this.props.turn && !this.props.gameOver){
            let row = this.getRandomInt(10);
            let col = this.getRandomInt(10);

            //if row,col has already been hit, generate new row and col until we get viable option
            while(this.state.gameboard[row][col].attacked){
                row = this.getRandomInt(10);
                col = this.getRandomInt(10);
            }

            let loop = true;
            while(loop) {
                try{
                    this.handleAttack(row, col);
                    loop = false;
                }
                catch{};
            }

        }
    }   

    isInteger(value) {
        return /^\d+$/.test(value);
      }

    mapLetterToNumber(letter) {
        if(this.isInteger(letter)){
            return Number(letter);
        }
        let letters = 'ABCDEFGHIJ';
        return letters.indexOf(letter.toUpperCase());
    }

    
    populateCPUGameboard() {
        let shipsPlaced = 0;
        while(shipsPlaced < 5){
            try{
                const row = this.getRandomInt(10);
                const col = this.getRandomInt(10);
                const rotation = Math.random() > .5 ? true: false;
                const currShip = this.state.ships[shipsPlaced];
                this.placeShip(currShip, row, col, rotation);
                shipsPlaced++;
            }
            catch{}
        }
    }

    clearMocks(){
        let board = this.state.gameboard.slice();
        for(let row of board){
            for(let ship of row){
                if(ship.ship && ship.mock){
                    ship.mock = false;
                    ship.ship = null;
                }
            }
        }
        this.setState({
            gameboard: board,
        })
    }

    placeMockShip(ship, row, column, rotated=false){
        this.clearMocks();
        let board = this.state.gameboard.slice();
        
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
                board[row][i].mock=true;
            }
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
                board[i][column].mock=true;
            }
        }
        this.setState({
            gameboard: board,
        })

    }

    placeShip(ship, row, column, rotated=false) {
        // make a copy so we don't mess with the state
        console.log(row, column);
        if(row < 0 || row > 9 || column < 0 || column > 9 || isNaN(row) || isNaN(column)) {
            throw new Error('invalid coordinates')
        }
        let board = this.state.gameboard.slice();
        let position = 0;
        // if rotated is false, then the ship is horizontal, if true then the ship is vertical: also checks to see if in bounds
        if (!rotated) {
            // begin at row that ship was placed on 
            if(column + ship.getLength() > 10) {
                throw new Error('ship is out of bounds');
            }


            for (let i=column; i<(column + ship.getLength()); i++) {
                if(board[row][i].ship !== null && !board[row][i].mock) {
                    throw new Error('Cannot overlap ships you fool.');
                }
            }

            for (let i=column; i<(column + ship.getLength()); i++) {
                if(board[row][i].ship !== null && board[row][i].mock){
                    board[row][i].mock = false;
                    board[row][i].ship = null;
                }
                board[row][i].ship = ship;
                board[row][i].shipPosition = position;
                ship.isPlaced = true;
                position++;
            }
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
                if(board[i][column].ship !== null && board[i][column].mock){
                    board[i][column].mock = false;
                    board[i][column].ship = null;
                }
                board[i][column].ship = ship;
                board[i][column].shipPosition = position;
                ship.isPlaced = true;
                position++;
            }
        }
        this.setState({
            gameboard: board,
        })
        this.setState((currentState) => {
            return {
            ships: currentState.ships.filter((currShip) => ship !== currShip),
            placedShips: currentState.placedShips.concat([ship]),
            mockShips: currentState.mockShips.filter((currShip) => ship !== currShip)
            }
        })
    }

    handleAttack(row, col){
        //if the game is over do nothing on click,
        // if it's the players turn then they shouldn't be able to click on their own gameboard

        if(!this.props.gameStarted){
            return;
        }

        if(this.props.gameOver){
            return;
        }
        let board = this.state.gameboard.slice();
        if(board[row][col].attacked){
            return;
        }
        if(board[row][col].attacked === false) {
            if(board[row][col].ship !== null){
                board[row][col].ship.hitShip(board[row][col].shipPosition);
                this.checkAllShipsSunk();
            }
            board[row][col].attacked = true;
    }
        this.setState({gameboard: board});
        this.props.changeTurn();
    }

    checkAllShipsSunk() {
        const allSunk = this.state.placedShips.every((ship) => ship.isSunk());
        if(allSunk){
            this.props.endGame();
        }
        this.setState({
            gameover: allSunk,
            loser: allSunk
        });
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    changeTurn() {
        this.setState({
            turn: !this.state.turn,
        })
    }

    render() {
        return (
            <div id='container'>
                <div id='player-container'>
                    {this.state.turn ? <div>Turn</div> : null}
                </div>

                <div id='board-container'>
                    <div id='gameboard-container' className={this.props.gameOver && !this.state.loser ? "winner": ''}>
                    {this.state.gameboard.map((row, i) => 
                        <div key={i} className='row'>
                            {row.map((ship, j) => (
                                <Cell 
                                key={i + j} 
                                className='cell'
                                attacked={ship.attacked}
                                ship={ship.ship}
                                mock={ship.mock}        
                                shipPosition={ship.shipPosition}
                                user = {this.props.user}          
                                onclick={() => this.handleAttack(i, j)}
                                />
                            ))}
                        </div>
                    )}
                    </div>
                </div>
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
                if(this.props.mock){
                    return (
                        <div className = 'mock cell'></div>
                    )
                }
            return (
                <div className ='ship cell'></div>
            )
            }
            else{
                return (
                    <div onClick={this.props.user ? null: this.props.onclick} className ='cell'></div>
                )
            }
        }
        return (
            <div onClick={this.props.user ? null: this.props.onclick} className='cell'></div>
        )
    }

    //attacked, ship, shipPosition
}

/*TODO: add placeShip functionality check
add startGame check


add resetGame, startNewGame
when placing ships, highlight where they're about to be placed in grey

*/