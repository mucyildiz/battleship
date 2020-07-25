import React, { Component } from 'react';
import './App.css';
import Gameboard from './Gameboard';
import Game from './Game';
import Player from './Player';

export default class App extends Component {
  render() {
    return (
      <div>
        <Game
        playerOne={new Player({})}
        playerTwo={new Player({})}
        />
      </div>
    )
  }
}
