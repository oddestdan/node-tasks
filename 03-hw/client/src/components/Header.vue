<template>
  <div class="header">
    <router-link class="header__link" to="/">Home</router-link>
    <span class="header__separator">|</span>
    <router-link class="header__link" to="/users">Users</router-link>
    <span class="header__separator">|</span>
    <router-link class="header__link" to="/profile">Profile</router-link>
    <span class="header__separator">|</span>
    <router-link class="header__link" to="/login">Log in</router-link>
    <span class="header__separator">|</span>
    <router-link class="header__link" to="/register">Sign up</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;

  &__link {
    padding: 5px 10px;
  }

  &__separator {
    padding: 0 10px;
  }
}
</style>
