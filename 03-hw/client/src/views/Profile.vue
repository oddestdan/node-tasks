<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="col-6 col-sm-4">ID</div>
        <div class="col-6 col-sm-4">{{user._id}}</div>

        <div class="w-100 d-none d-md-block"></div>

        <div class="col-6 col-sm-4">Username</div>
        <div class="col-6 col-sm-4">
          <input v-model="user.username" />
        </div>

        <div class="w-100 d-none d-md-block"></div>

        <div class="col-6 col-sm-4">Password</div>
        <div class="col-6 col-sm-4">
          <input v-model="user.password" />
        </div>

        <div class="w-100 d-none d-md-block"></div>

        <div class="col-6 col-sm-4">Role (select)</div>
        <div class="col-6 col-sm-4">
          <input v-model="user.role" />
        </div>

        <div class="w-100 d-none d-md-block"></div>

        <div class="col-6 col-sm-4">Phone</div>
        <div class="col-6 col-sm-4">
          <input v-model="user.phone" />
        </div>

        <div class="w-100 d-none d-md-block"></div>

        <div class="col-6 col-sm-4">Email</div>
        <div class="col-6 col-sm-4">
          <input @change="handleChange" v-model="user.email" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',

  data() {
    return {
      user: this.$store.state.user.user,
    };
  },

  methods: {
    handleChange(e) {
      console.log('Updating value', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
