<template>
  <div class="register">
    <h2>Sign up</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          v-model="user.username"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && !user.username }"
        />
        <div v-show="submitted && !user.username" class="invalid-feedback">
          Username is required
        </div>
      </div>
      <div class="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          v-model="user.password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && !user.password }"
        />
        <div v-show="submitted && !user.password" class="invalid-feedback">
          Password is required
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="status.registering">
          Sign up
        </button>
        <!-- <img v-show="status.registering" /> -->
        <router-link to="/login" class="btn btn-link">Log in</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Register',

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

  methods: {
    ...mapActions(['register']),

    handleSubmit(e) {
      this.submitted = true;
      if (this.user.username && this.user.password) {
        this.register(this.user);
      }
    },
  },
};
</script>
