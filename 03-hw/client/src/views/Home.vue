<template>
  <div class="home">
    <h1>Welcome to Uber App, {{ $store.state.user.username }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
@import '../media_mixins.scss';

.home {
  padding: 0 5px;

  @include phone {
    text-align: center;
  }
}
</style>
