<template>
  <div class="header">
    <router-link class="header__link" to="/">Home</router-link>
    <span class="header__separator">|</span>
    <router-link class="header__link" to="/users">Users</router-link>
    <span class="header__separator">|</span>
    <router-link class="header__link" to="/profile">Profile</router-link>
    <span class="header__separator">|</span>

    <router-link class="header__link" to="/loads">Loads</router-link>
    <span class="header__separator">|</span>

    <span v-if="user && user.role === 'driver'">
      <router-link class="header__link" to="/trucks">Trucks</router-link>
      <span class="header__separator">|</span>
    </span>

    <span v-if="isLoggedIn">
      <router-link class="header__link" to="/login">Log out</router-link>
    </span>
    <span v-else>
      <router-link class="header__link" to="/login">Log in</router-link>
      <span class="header__separator">|</span>
      <router-link class="header__link" to="/register">Sign up</router-link>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',

  computed: {
    ...mapState({
      isLoggedIn: state => state.status.loggedIn,
      user: state => state.user,
    }),
  },
};
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
