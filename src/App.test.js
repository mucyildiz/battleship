import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Ship } from './ship';
import Gameboard from './gameboard'; 

let mockShip = Ship('mock', 4);
let mockGameboard = new Gameboard({});

it('create ship with name mock and length 3', () => {
  expect(mockShip.getName()).toBe('mock');
  expect(mockShip.getLength()).toBe(4);
});

it('hitting ship in position 0, 1, and 2 should sink it', () => {
  mockShip.hitShip(0);
  mockShip.hitShip(1);
  expect(mockShip.isSunk()).toBe(false);
  mockShip.hitShip(2);
  mockShip.hitShip(3);
  expect(mockShip.isSunk()).toBe(true);
});

it('gameboard should have 100 cells', () => {
  let numCells = 0;
  for(let row of mockGameboard.state.gameboard){
    numCells += row.length;
  }
  expect(numCells).toBe(100);
});

it('placing a horizontal ship at [0][0] on gameboard should make gameboard[0][0].position == 0 and [0][1] == 1', () => {
  mockGameboard.placeShip(mockShip, 0, 0, false);
  expect(mockGameboard.state.gameboard[0][0].shipPosition).toBe(0);
  expect(mockGameboard.state.gameboard[0][1].shipPosition).toBe(1);
})

it('placing vertical ship at [2][2] on gameboard should make gameboard [3][2].position == 1', () => {
  mockGameboard.placeShip(mockShip, 2, 2, true);
  expect(mockGameboard.state.gameboard[3][2].shipPosition).toBe(1);
})