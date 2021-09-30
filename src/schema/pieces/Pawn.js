/* eslint-disable max-len */
/* eslint-disable no-lonely-if */
import Piece from '../Piece';
import previewBlack from '@/assets/black_pawn_straight.svg';
import previewWhite from '@/assets/white_pawn_straight.svg';

class Pawn extends Piece {
  constructor(props) {
    super(props);
    this.preview = this.color === 'black' ? previewBlack : previewWhite;
  }

  getPreview() {
    return this.preview;
  }

  getPossibilities(boardState) {
    let possibilities = [];
    let opponents = [];
    let opponentsCoords = [];
    // Pour les noirs
    if (this.color === 'black') {
      if (this.y === 2) {
        possibilities.push({ x: this.x, y: this.y + 1 }, { x: this.x, y: this.y + 2 });
      } else {
        possibilities.push({ x: this.x, y: this.y + 1 });
      }
      opponents = boardState.filter((p) => (p.getCoords().x === this.x + 1 && p.getCoords().y === this.y + 1) || (p.getCoords().x === this.x - 1 && p.getCoords().y === this.y + 1));
      opponentsCoords = opponents ? opponents.map((o) => ({ x: o.getCoords().x, y: o.getCoords().y })) : [];
    } else {
      if (this.y === 7) {
        possibilities.push({ x: this.x, y: this.y - 1 }, { x: this.x, y: this.y - 2 });
      } else {
        possibilities.push({ x: this.x, y: this.y - 1 });
      }
    }
    possibilities = [...possibilities, ...opponentsCoords];
    return possibilities
      .filter((p) => this.checkPossibility(p))
      .filter(() => !boardState.find((p) => (this.color === 'black' ? (p.getCoords().x === this.x && p.getCoords().y === this.y + 1) : (p.getCoords().x === this.x && p.getCoords().y === this.y - 1))));
  }
}

export default Pawn;
