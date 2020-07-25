import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Ship } from './Ship';
import Gameboard from './Gameboard'; 
import Player from './Player';

let mockShip = Ship('mock', 3);
let mockGameboard = new Gameboard({});
mockGameboard.placeShip(mockShip, 0, 0, false);

it('create ship with name mock and length 3', () => {
  expect(mockShip.getName()).toBe('mock');
  expect(mockShip.getLength()).toBe(3);
});

it('hitting ship in position 0, 1, and 2 should sink it', () => {
  let localMockShip = Ship('mockShip', 3);
  localMockShip.hitShip(0);
  localMockShip.hitShip(1);
  expect(localMockShip.isSunk()).toBe(false);
  localMockShip.hitShip(2);
  expect(localMockShip.isSunk()).toBe(true);
});

it('gameboard should have 100 cells', () => {
  let numCells = 0;
  for(let row of mockGameboard.state.gameboard){
    numCells += row.length;
  }
  expect(numCells).toBe(100);
});

it('placing a horizontal ship at [0][0] on gameboard should make gameboard[0][0].position == 0 and [0][1] == 1', () => {
  expect(mockGameboard.state.gameboard[0][0].shipPosition).toBe(0);
  expect(mockGameboard.state.gameboard[0][1].shipPosition).toBe(1);
})

it('placing vertical ship at [2][2] on gameboard should make gameboard [3][2].position == 1', () => {
  mockGameboard.placeShip(mockShip, 2, 2, true);
  expect(mockGameboard.state.gameboard[3][2].shipPosition).toBe(1);
})

it('hitting horizontal ship at [0][i], i=0, 1, 2 should sink it', () => {
  mockGameboard.handleAttack(0, 0);
  mockGameboard.handleAttack(0, 1);
  mockGameboard.handleAttack(0, 2);
  expect(mockShip.isSunk()).toBe(true);
})

it('all ships sunk should return true', () => {
  let mockBoard = new Gameboard({});
  for(let i=0; i<5; i++){
    mockBoard.placeShip(mockBoard.state.ships[i], i, 0);
    for(let j=0; j<mockBoard.state.ships[i].getLength(); j++){
      mockBoard.handleAttack(i, j);
    }
  }
  expect(mockBoard.checkAllShipsSunk()).toBe(true);
})

it('placing all ships should make all ships have .isPlaced be true', () => {
  let mockBoard = new Gameboard({});
  for(let i=0; i<4; i++) {
    mockBoard.placeShip(mockBoard.state.ships[i], i, 0);
  }
  expect(mockBoard.state.ships.every((ship) => ship.isPlaced)).toBe(false);
  mockBoard.placeShip(mockBoard.state.ships[4], 4, 0);
  expect(mockBoard.state.ships.every((ship) => ship.isPlaced)).toBe(true);
})
