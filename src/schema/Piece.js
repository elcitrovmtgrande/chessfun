/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import { v4 } from 'uuid';
import { cloneDeep } from 'lodash';

class Piece {
  constructor({ coords, color }) {
    this.x = coords.x;
    this.y = coords.y;
    this.color = color;
    this.alive = true;
    this.id = v4();
  }

  getId() {
    return this.id;
  }

  getCoords() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  setCoords(coords) {
    this.x = coords.x;
    this.y = coords.y;
    return this;
  }

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  getAlive() {
    return this.alive;
  }

  setAlive(alive) {
    this.alive = alive;
    return this;
  }

  checkPossibility(p) {
    return p.x <= 8 && p.y <= 8;
  }

  move(boardState, destination) {
    let nextState = cloneDeep(boardState);
    const opponent = boardState.find((p) => p.getCoords().x === destination.x && p.getCoords().y === destination.y);
    this.setCoords(destination);
    if (opponent) {
      // On tue l'adversaire
      opponent.setAlive(false);
      nextState = nextState.map((p) => (p.getId() === opponent.getId() ? opponent : p));
    }
    // On deplace notre piece
    nextState = nextState.map((p) => (p.getId() === this.getId() ? this : p));
    return nextState;
  }
}

export default Piece;
