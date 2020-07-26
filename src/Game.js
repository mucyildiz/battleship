// then player can drag and drop pieces into their own board
// then player clicks play and game begins
// player goes first, click on cpu gameboard, cpu gameboard handles attack, checks if all ships sunk
// cpu goes
// alternates until allShipsSunk is true for a gameboard
// when true, winner is displayed, option to play again is shown, if selected everything resets

import Player from './Player';
import React, { Component } from 'react';
import './Game.css';

export default class Game extends Component {
    constructor(props) {
        // props passed in are two gameboards, one for user, one for CPU
        super(props);

        this.state = {
            turn: true,
            gameStarted: false,
            input: '',
            addedShipCoordinates: [],
            buttonValue: 'Add ship',
            gameOver: false,
            gameReadyToStart: false,
        }

        this.updateInput = this.updateInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    startGame() {
        this.setState({
            gameStarted: true,
        })
    }

    endGame() {
        this.setState({
            gameOver: true,
        })
    }

    changeTurn() {
        this.setState({
            turn: !this.state.turn
        })
    }

    handleInput(e){
        e.preventDefault();
        e.stopPropagation()
        if(this.state.input !== '' && this.state.input.length === 2){
            this.setState((currentState) => {
                return {
                addedShipCoordinates: currentState.addedShipCoordinates.concat([[Number(this.state.input[0]), Number(this.state.input[1])]]),
                input: '',
                }
            })
        }
    }

    updateInput (e) {
        const value = e.target.value;
        this.setState({
            input: value,
        })
    }

    changeButtonValue(newValue) {
        this.setState({
            buttonValue: newValue,
        })
    }

    readyToStartGame() {
        this.setState({
            gameReadyToStart: true,
        })
    }

    render() {
        return (
            <div id='main-container'>
                <div id='title'>
                    <h1>Battleship</h1>
                </div>
                {!this.state.gameReadyToStart ? 
                <div id='user-place-ship-form'>
                    <form onSubmit={this.handleInput}>
                        <input 
                        type='text' 
                        value={this.state.input} 
                        onChange={this.updateInput}
                        />
                        <input type='submit' value={this.state.buttonValue}></input>
                    </form>
                </div> 
                :
                null
                }
                {!this.state.gameStarted && this.state.gameReadyToStart ? 
                <button onClick={() => this.startGame()}>Start Game</button>:
                null
                }



                <div id='gameboards'>
                    <Player 
                    user={true}
                    turn={this.state.turn}
                    changeTurn={() => this.changeTurn()}
                    gameStarted={this.state.gameStarted}
                    input={this.state.input}
                    shipCoords={this.state.addedShipCoordinates}
                    startGame={() => this.startGame()}
                    gameOver={this.state.gameOver}
                    endGame={() => this.endGame()}
                    ready={() => this.readyToStartGame()}
                    />
                    <Player 
                    user={false}
                    turn={!this.state.turn}
                    changeTurn={() => this.changeTurn()}
                    gameStarted={this.state.gameStarted}
                    gameOver={this.state.gameOver}
                    endGame={() => this.endGame()}
                    />
                </div>
                <GameOver 
                isGameOver={this.state.gameOver}
                />
            </div>
        )
    }
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