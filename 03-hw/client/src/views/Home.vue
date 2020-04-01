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
