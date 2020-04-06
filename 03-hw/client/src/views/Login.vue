<template>
  <div class="login">
    <div class="container">
      <h2>Log in</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group login__form-group">
          <label for="username">Username</label>
          <input
            class="form-control"
            type="text"
            v-model="user.username"
            name="username"
            :class="{ 'is-invalid': submitted && !user.username }"
          />
          <div v-show="submitted && !user.username" class="invalid-feedback">
            Username is required
          </div>
        </div>
        <div class="form-group login__form-group">
          <label for="password">Password</label>
          <input
            class="form-control"
            type="password"
            v-model="user.password"
            name="password"
            :class="{ 'is-invalid': submitted && !user.password }"
          />
          <div v-show="submitted && !user.password" class="invalid-feedback">
            Password is required
          </div>
        </div>
        <div class="form-group login__form-group--button">
          <button class="btn btn-dark" :disabled="status.loggingIn">
            Login
          </button>
          <!-- <img v-show="status.loggingIn" /> -->
          <router-link to="/register" class="btn btn-link">Sign up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      submitted: false,
    };
  },

  computed: {
    ...mapState(['status']),
  },

  created() {
    this.logout(); // reset
  },

  methods: {
    ...mapActions(['login', 'logout']),

    async handleSubmit(e) {
      this.submitted = true;
      if (this.user.username && this.user.password) {
        await this.login(this.user);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../media_mixins.scss';

.login {
  &__form-group {
    width: 45%;

    &--button {
      width: 100%;
    }

    @include phone {
      width: 100%;
    }
  }
}
</style>
