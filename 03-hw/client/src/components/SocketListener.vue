<template>
  <div>
    <template>
      <p v-if="isConnected">We're connected to sockets server!</p>
      <p v-else>We're disconnected to sockets server!</p>
    </template>
    <input type="text" v-model="someMessage" />
    <button @click="pingServer">Ping Server</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConnected: false,
      someMessage: '',
    };
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      console.log('sockets: connect');
      this.isConnected = true;
    },

    disconnect() {
      console.log('sockets: disconnect');
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    pingServer(data) {
      console.log('sockets: messageChannel');
      this.someMessage = data + 'xxxx';
    },
  },

  methods: {
    pingServer() {
      // Send the "ping server" event to the server.
      this.$socket.emit('pingServer', this.someMessage);
    },
  },
};
</script>
