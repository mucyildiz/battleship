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
        }
    }

    changeTurn() {
        this.setState({
            turn: !this.state.turn
        })
    }

    componentDidUpdate() {
        console.log('from Game')
    }

    render() {
        return (
            <div id='main-container'>
                <div id='title'>
                    <h1>Battleship</h1>
                </div>
                <div id='gameboards'>
                    <Player 
                    user={true}
                    turn={this.state.turn}
                    changeTurn={() => this.changeTurn()}
                    />
                    <Player 
                    user={false}
                    turn={!this.state.turn}
                    changeTurn={() => this.changeTurn()}
                    />
                </div>
            </div>
        )
    }
}