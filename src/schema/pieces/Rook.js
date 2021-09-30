/* eslint-disable max-len */
import Piece from '../Piece';
import previewBlack from '@/assets/black_rook_straight.svg';
import previewWhite from '@/assets/white_rook_straight.svg';

class Rook extends Piece {
  constructor(props) {
    super(props);
    this.preview = this.color === 'black' ? previewBlack : previewWhite;
  }

  getPreview() {
    return this.preview;
  }

  getPossibilities(boardState) {
    const { x, y } = this;
    const possibilities = [];
    // Pour les noirs
    possibilities.push(
      {
        x,
        y: y + 1,
      },
      {
        x,
        y: y + 2,
      },
      {
        x,
        y: y + 3,
      },
      {
        x,
        y: y + 4,
      },
      {
        x,
        y: y + 5,
      },
      {
        x,
        y: y + 6,
      },
      {
        x,
        y: y + 7,
      },
      {
        x,
        y: y + 8,
      },
      {
        x,
        y: y - 1,
      },
      {
        x,
        y: y - 2,
      },
      {
        x,
        y: y - 3,
      },
      {
        x,
        y: y - 4,
      },
      {
        x,
        y: y - 5,
      },
      {
        x,
        y: y - 6,
      },
      {
        x,
        y: y - 7,
      },
      {
        x,
        y: y - 8,
      },
      {
        x: x + 1,
        y,
      },
      {
        x: x + 2,
        y,
      },
      {
        x: x + 3,
        y,
      },
      {
        x: x + 4,
        y,
      },
      {
        x: x + 5,
        y,
      },
      {
        x: x + 6,
        y,
      },
      {
        x: x + 7,
        y,
      },
      {
        x: x + 8,
        y,
      },
      {
        x: x - 1,
        y,
      },
      {
        x: x - 2,
        y,
      },
      {
        x: x - 3,
        y,
      },
      {
        x: x - 4,
        y,
      },
      {
        x: x - 5,
        y,
      },
      {
        x: x - 6,
        y,
      },
      {
        x: x - 7,
        y,
      },
      {
        x: x - 8,
        y,
      },
    );

    const onBoardPossibilities = possibilities.filter((p) => this.checkPossibility(p));

    return onBoardPossibilities.filter((possibility) => !boardState.find((p) => p.getCoords().x === possibility.x && p.getCoords().y === possibility.y && p.getColor() === this.color));
  }
}

export default Rook;
