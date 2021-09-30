/* eslint-disable max-len */
import Piece from '../Piece';
import previewBlack from '@/assets/black_knight_straight.svg';
import previewWhite from '@/assets/white_knight_straight.svg';

class Knight extends Piece {
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
    possibilities.push({
      x: x + 1,
      y: y - 2,
    }, {
      x: x + 1,
      y: y + 2,
    },
    {
      x: x + 2,
      y: y + 1,
    },
    {
      x: x + 2,
      y: y - 1,
    },
    {
      x: x + 2,
      y: y - 1,
    }, {
      x: x - 1,
      y: y - 2,
    }, {
      x: x - 1,
      y: y + 2,
    },
    {
      x: x - 2,
      y: y + 1,
    },
    {
      x: x - 2,
      y: y - 1,
    },
    {
      x: x + 2,
      y: y - 1,
    });

    const onBoardPossibilities = possibilities.filter((p) => this.checkPossibility(p));

    return onBoardPossibilities.filter((possibility) => !boardState.find((p) => p.getCoords().x === possibility.x && p.getCoords().y === possibility.y && p.getColor() === this.color));
  }
}

export default Knight;
