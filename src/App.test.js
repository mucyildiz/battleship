import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Player from './Player';


it('placing one ship should make placedships length == 1 and ships length == 4', () => {
  let mockPlayer = new Player({});
  
  expect(mockPlayer.state.ships.length).toBe(4);
  expect(mockPlayer.state.placedShips.length).toBe(1);
  })

it('placing all ships should make placedships length ==5 ships length == 0', () => {
  let mockPlayer = new Player({});
  for(let i=0; i<5; i++){
    mockPlayer.placeShip(mockPlayer.state.ships[i], i, 0, false);
    expect(mockPlayer.state.ships.length).toBe(0);
    expect(mockPlayer.state.placedShips.length).toBe(5);
  }
})