// it's gonna be two players: user and CPU 
// each player has a gameboard property
// first the CPU sets up its board
// then player can drag and drop pieces into their own board
// then player clicks play and game begins
// player goes first, click on cpu gameboard, cpu gameboard handles attack, checks if all ships sunk
// cpu goes
// alternates until allShipsSunk is true for a gameboard
// when true, winner is displayed, option to play again is shown, if selected everything resets

import Gameboard from './Gameboard';
import React, { Component } from 'react';
import './Game.css';

export default class Game extends Component {
    constructor(props) {
        // props passed in are two gameboards, one for user, one for CPU
        super(props);

        this.state = {
        }
        this.setUpCpuGameboard = this.setUpCpuGameboard.bind(this);
    }
    setUpCpuGameboard (props) {
        // take the cpu gameboard, then take the ships from that gameboard and place them all in random locations
        // get a random coordinate and try to place the ship - if error thrown, try again until success
        // generate a num for true or false - above .5 = true, below = false, for rotation
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    render() {
        return (
            <div id='main-container'>
                <div id='gameboards'>
                    <Gameboard user={true}/>
                    <Gameboard user={false}/>
                </div>
            </div>
        )
    }
}