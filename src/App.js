import React, { Component } from 'react';
import './App.css';
import Gameboard from './Gameboard';
import Game from './Game';

export default class App extends Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    )
  }
}
