<template>
  <div class="chat-room">
    <SocketListener />
    <!-- <div class="row">
      <span class="title">ChatRoom</span>
    </div>
    <div class="messageClass">
      <label>Messages</label>
      <textarea v-model="textarea" disabled></textarea>
    </div>
    <div>
      <label>Your message</label>
      <input v-model="message" />
      <button class="btn btn-primary" @click="sendMessage">Submit</button>
    </div> -->
  </div>
</template>

<script>
import SocketListener from '../components/SocketListener';
export default {
  name: 'ChatRoom',

  components: {
    SocketListener,
  },

  //   data() {
  //     return {
  //       textarea: '',
  //       message: '',
  //       count: 0,
  //     };
  //   },

  //   sockets: {
  //     connect() {
  //       console.log('connected to chat server');
  //     },
  //     count(val) {
  //       this.count = val.count;
  //     },
  //     message(data) {
  //       // this function gets triggered once a socket event of `message` is received
  //       this.textarea += data + '\n'; // append each new message to the textarea and add a line break
  //     },
  //   },

  //   methods: {
  //     sendMessage() {
  //       // this will emit a socket event of type `function`
  //       this.$socket.emit('message', this.message); // send the content of the message bar to the server
  //       this.message = ''; // empty the message bar
  //     },
  //   },
};
</script>

<style lang="scss" scoped></style>
