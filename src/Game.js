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
            vertical: false,
        }

        this.updateInput = this.updateInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    toggleOrientation() {
        this.setState((currentState) => {
            return {
                vertical: !currentState.vertical
            }
        })
    }

    startGame() {
        this.setState({
            gameStarted: true,
        })
    }

    endGame() {
        this.setState({
            gameOver: true,
            gameStarted: false,
            newGameStarted: false,
        })
    }

    changeTurn() {
        this.setState({
            turn: !this.state.turn
        })
    }

    handleInput(e){
        console.log('butt');
        e.preventDefault();
        e.stopPropagation()
        if(this.state.input !== '' && this.state.input.length === 2){
            this.setState((currentState) => {
                return {
                addedShipCoordinates: currentState.addedShipCoordinates.concat([[this.state.input[0], Number(this.state.input[1])]]),
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
                <GameOver 
                isGameOver={this.state.gameOver}
                />
                <div id='title'>
                    <h1>Battleship</h1>
                </div>
                {this.state.gameOver ? 
                <form>
                    <div id='btn-container'>
                        <input className='start btn' type='submit' value='Restart'/>
                    </div>
                </form>
                : null}
                {!this.state.gameStarted && this.state.gameReadyToStart && !this.state.gameOver ? 
                <div id='btn-container'>
                    <button onClick={() => this.startGame()} className='start btn'>Start Game</button>
                </div>    
                :
                null
                }



                <div id='gameboards'>
                    <div id='user'>
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
                    vertical={this.state.vertical}
                    />
                    {!this.state.gameReadyToStart ? 
                    <div id='user-place-ship-form'>
                        <form onSubmit={this.handleInput} id='form'>
                            <div id='instruction'>Input coordinate e.g. 'A5'</div>
                            <div id='input-container'>
                                <input 
                                id='coordinates'
                                type='text' 
                                value={this.state.input} 
                                onChange={this.updateInput}
                                maxLength={2}
                                />
                            </div>
                            <input type='button' onClick={() => this.toggleOrientation()} 
                            value={this.state.vertical ? 'Make Horizontal': 'Make Vertical'}
                            className='orientation btn'
                            ></input>
                            <input type='submit' value={this.state.buttonValue} className='placeShip btn'></input>
                        </form>
                    </div> 
                    :
                    null
                    }
                    </div>
                    <Player 
                    user={false}
                    turn={!this.state.turn}
                    changeTurn={() => this.changeTurn()}
                    gameStarted={this.state.gameStarted}
                    gameOver={this.state.gameOver}
                    endGame={() => this.endGame()}
                    />
                </div>
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