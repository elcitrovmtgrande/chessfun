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

  getPossibilities(/* board */) {
    const possibilities = [];
    // Pour les noirs
    if (this.color === 'black') {
      if (this.y === 2) {
        possibilities.push({ x: this.x, y: this.y + 1 }, { x: this.x, y: this.y + 2 });
      } else {
        possibilities.push({ x: this.x, y: this.y + 1 });
      }
    // Pour les blancs
    } else {
      // todo pour les blancs ici
    }
    return possibilities.filter((p) => this.checkPossibility(p));
  }
}

export default Pawn;
