<template>
  <div class="register">
    <div class="container">
      <h2>Sign up</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group register__form-group">
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
        <div class="form-group register__form-group">
          <label for="password">Password</label>
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

        <div class="form-group register__form-group">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="shipperRadio"
              id="shipperRadio"
              value="shipper"
              v-model="user.role"
              :class="{ 'is-invalid': submitted && !user.role }"
              checked
            />
            <label class="form-check-label" for="shipperRadio">Shipper</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="driverRadio"
              id="driverRadio"
              value="driver"
              v-model="user.role"
              :class="{ 'is-invalid': submitted && !user.role }"
            />
            <label class="form-check-label" for="driverRadio">Driver</label>
            <div v-show="submitted && !user.role" class="invalid-feedback">
              Role is required
            </div>
          </div>
        </div>
        <div class="form-group register__form-group--button">
          <button class="btn btn-dark" :disabled="status.registering">
            Sign up
          </button>
          <!-- <img v-show="status.registering" /> -->
          <router-link to="/login" class="btn btn-link">Log in</router-link>
        </div>
      </form>
    </div>
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
        role: '',
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
    ...mapActions(['register', 'logout']),

    async handleSubmit(e) {
      this.submitted = true;
      const { username, password, role } = this.user;
      if (username && password && role) {
        await this.register(this.user);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../media_mixins.scss';

.register {
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
