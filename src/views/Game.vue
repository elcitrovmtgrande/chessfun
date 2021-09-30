<template>
  <div class="about">
    <h1>Jeu d'echec ici</h1>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      isRoomCreator: false,
      roomId: this.$route.params.roomId,
      username: this.$route.params.username,
    };
  },
  mounted() {
    this.listeners();
    this.joinRoom();
  },
  methods: {
    listeners() {
      this.sockets.subscribe('room_joined', async (event) => {
        console.log('new user in room');
        console.log(event);
        console.log('Socket event callback: room_joined');
        await this.setLocalStream(/* constraints */);
        this.$socket.emit('start_call', this.roomId);
      });
    },
    joinRoom() {
      const { roomId, username } = this.$route.params;
      this.$socket.emit('join', { roomId, payload: { username } });
    },
  },
};
</script>
