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

    };
  },
  mounted() {
    this.connect();
  },
  methods: {
    connect() {
      console.log(this.sockets);
    },
  },
};
</script>
