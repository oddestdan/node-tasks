<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'app',

  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import './media_mixins.scss';

body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  padding: 0 42px;

  @include phone {
    padding: 0;
  }

  // Override bootstrap's vertical align for cells
  .table th,
  .table td {
    vertical-align: middle !important;
  }
}
</style>
