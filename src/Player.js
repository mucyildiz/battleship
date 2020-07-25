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
              {return {attacked: false, ship: null, shipPosition: null}})),
            ships: [carrier, battleship, destroyer, submarine, patrolBoat],
            placedShips: [],
            gameover: false,
            loser: false,
            turnFinished: false,
        }
    }

    componentDidMount() {
        if(!this.props.user) {
            this.populateCPUGameboard();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        //if its the user board and its not the user's turn, the CPU moves
        if(this.props.user && prevProps.turn !== this.props.turn && !this.props.turn){
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

    
    populateCPUGameboard() {
        let localShips = this.state.ships.slice();
        while(localShips.length > 0) {
            try{
                const row = this.getRandomInt(10);
                const col = this.getRandomInt(10);
                const rotation = Math.random() > .5 ? true: false;
                const currShip = localShips[0];
                this.placeShip(currShip, row, col, rotation);
                localShips.splice(0, 1);
            }
            catch{}
        }
        this.setState({ships: localShips})
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
                console.log(this.state.ships)
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
        //if the game is over do nothing on click,
        // if it's the players turn then they shouldn't be able to click on their own gameboard

        if(this.state.gameover){
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
        }, () => console.log('changed', this.state.turn))
    }

    render() {
        return (
            <div id='container'>
                <div id='player-container'>
                    {this.state.turn ? <div>Turn</div> : null}
                </div>

                <div id='board-container'>
                    <div id='gameboard-container' className={this.state.gameover ? "winner": ''}>
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

/*TODO: add placeShip functionality
add startGame
add startNewGame

*/