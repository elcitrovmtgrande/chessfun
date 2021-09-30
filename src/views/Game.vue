<template>
  <div class="game">
    <div v-if="game" class="board">
      <div
        v-for="(c, index) in game"
        :key="index"
        :class="[
          (c.x + c.y) % 2 === 0 ? 'case black' : 'case',
          hasPiece(c) ? 'clickable' : '',
          isSelected(c) ? 'selected' : '',
          isPossibility(c) ? 'possibility clickable' : '',
        ]"
        @click="hasPiece(c) || isPossibility(c) ? onCase(c) : () => {}"
      >
        <img v-if="hasPiece(c)" :src="hasPiece(c).getPreview()" />
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import Board from '@/schema/Board';
import Pawn from '@/schema/pieces/Pawn';
import Knight from '@/schema/pieces/Knight';

export default {
  name: 'Game',
  data() {
    return {
      board: new Board(),
      pieces: [...this.genBlacks()],
      game: null,
      isRoomCreator: false,
      roomId: this.$route.params.roomId,
      username: this.$route.params.username,
      socket: io('localhost:4000'),
      myTurn: false,
      selectedPiece: null,
    };
  },
  async mounted() {
    const board = new Board();
    this.board = board;
    this.game = board.getBoard();
    console.log(this.game);
    await this.listeners();
    this.joinRoom();
  },
  methods: {
    onCase(c) {
      const pieceOnCase = this.hasPiece(c);
      const isPossibility = this.isPossibility(c);
      if (pieceOnCase) {
        this.onPiece(pieceOnCase);
      } else if (isPossibility) {
        this.onPossibility(c);
      }
    },
    onPiece(piece) {
      if (!this.selectedPiece || this.selectedPiece.getId() !== piece.getId()) {
        this.selectedPiece = piece;
      } else if (
        this.selectedPiece
        && this.selectedPiece.getId() === piece.getId()
      ) {
        this.selectedPiece = null;
      }
    },
    onPossibility(coords) {
      console.log('Move asked to:', JSON.stringify(coords));
      this.selectedPiece.setCoords(coords);
      this.pieces = this.pieces
        .map((p) => (p.id === this.selectedPiece.id ? this.selectedPiece : p));
      this.selectedPiece = null;
    },
    hasPiece(c) {
      return this.pieces.find(
        (p) => p.getCoords().x === c.x && p.getCoords().y === c.y,
      );
    },
    isSelected(c) {
      const { x, y } = c;
      return (
        this.selectedPiece
        && this.selectedPiece.getCoords().x === x
        && this.selectedPiece.getCoords().y === y
      );
    },
    isPossibility(c) {
      if (this.selectedPiece) {
        const possibilities = this.selectedPiece.getPossibilities(this.pieces);
        return !!possibilities.find((p) => p.x === c.x && p.y === c.y);
      }
      return false;
    },
    genBlacks() {
      return [
        new Pawn({
          coords: { x: 1, y: 2 },
          color: 'black',
        }),
        new Pawn({
          coords: { x: 2, y: 2 },
          color: 'black',
        }),
        new Pawn({
          coords: { x: 3, y: 2 },
          color: 'black',
        }),
        new Pawn({
          coords: { x: 4, y: 2 },
          color: 'black',
        }),
        new Pawn({
          coords: { x: 5, y: 2 },
          color: 'black',
        }),
        new Pawn({
          coords: { x: 6, y: 2 },
          color: 'black',
        }),
        new Pawn({
          coords: { x: 7, y: 2 },
          color: 'black',
        }),
        new Pawn({
          coords: { x: 8, y: 2 },
          color: 'black',
        }),
        new Knight({
          coords: { x: 2, y: 1 },
          color: 'black',
        }),
        new Knight({
          coords: { x: 7, y: 1 },
          color: 'black',
        }),
      ];
    },
    async listeners() {
      console.log('this.socket:', this.socket);
      this.socket.on('change', (data) => {
        console.log(data);
        // you can also do this.messages.push(data)
      });

      this.socket.on('join', (data) => {
        console.log('join:', data);
        // you can also do this.messages.push(data)
      });

      this.socket.on('player_leave', (data) => {
        console.log(data);
        // you can also do this.messages.push(data)
      });
    },
    dispatchMove() {
      this.socket.emit('change', {
        user: this.username,
        roomId: this.roomId,
        change: {},
      });
    },
    joinRoom() {
      // const { roomId, username } = this.$route.params;
      console.log(this.socket.id);
      this.socket.emit('join', {
        roomId: this.roomId,
        user: this.username,
        socket: this.socket.id,
      });
    },
  },
};
</script>

<style lang="scss">
.game {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .board {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    width: 800px;
    height: 800px;
    border: 1px solid black;

    .case {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      width: 100px;
      &.black {
        background-color: rgba(0, 0, 0, 0.363);
      }

      &.clickable {
        // transition: all 0.25s ease;
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }

      &.selected {
        background-color: rgb(255, 151, 151);
      }

      &.possibility {
        background-color: rgb(199, 238, 125);
      }
    }
  }
}
</style>
