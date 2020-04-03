<template>
  <div class="profile">
    <div class="container">
      <h1>Profile</h1>
      <div class="col">
        <div class="row">
          <div class="w-100 d-none d-md-block"></div>

          <div class="col-6">ID</div>
          <div class="col-6">{{user._id}}</div>

          <div class="w-100 d-none d-md-block"></div>

          <div class="col-6">Username</div>
          <div class="col-6">{{user.username}}</div>

          <div class="w-100 d-none d-md-block"></div>

          <div class="col-6">Password</div>
          <div class="col-6">{{user.password}}</div>

          <div class="w-100 d-none d-md-block"></div>

          <div class="col-6">Role</div>
          <div class="col-6">{{user.role}}</div>

          <div class="w-100 d-none d-md-block"></div>

          <div class="col-6">Phone</div>
          <div class="col-6">
            <input @change="handlePhoneChange" v-model="user.phone" />
          </div>

          <div class="w-100 d-none d-md-block"></div>

          <div class="col-6">Email</div>
          <div class="col-6">
            <input @change="handleEmailChange" v-model="user.email" />
          </div>

          <div class="w-100 d-none d-md-block"></div>
          <br />

          <button @click="handlePasswordClick" class="col-6 btn btn-dark">Reset Password</button>
          <div class="col-6">
            <input v-model="newPassword" placeholder="Enter new password" />
          </div>
        </div>
        <br />
      </div>

      <button
        @click="$router.push('/loads')"
        class="btn btn-link"
      >{{isDriver ? 'Assigned' : 'Created'}} Loads</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProfilePage',

  data() {
    return {
      newPassword: '',
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      isDriver: state => state.user.role === 'driver',
    }),
  },

  methods: {
    ...mapActions(['updateAccountInfo', 'updatePassword']),

    handlePhoneChange(e) {
      const { _id, phone } = this.user;
      const data = { phone };
      this.updateAccountInfo({ _id, data });
    },

    handleEmailChange(e) {
      const { _id, email } = this.user;
      const data = { email };
      this.updateAccountInfo({ _id, data });
    },

    handlePasswordClick(e) {
      const { _id } = this.user;
      const data = { password: this.newPassword };
      this.updatePassword({ _id, data });
      this.newPassword = ''; // reset
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
