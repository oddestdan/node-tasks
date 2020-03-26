<template>
  <div class="users">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <h1>Users</h1>
          <section class="panel panel-success" v-if="users.length">
            <div class="panel-heading">List of users</div>
            <table class="table table-striped">
              <!-- <tr v-for="key in Object.keys(users[0])" :key="key"> -->
              <!-- <th>{{ key }}</th> -->
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
              <tr v-for="(user, i) in users" :key="`${user.username}_${i}`">
                <td>{{ user.username }}</td>
                <td>{{ user.password }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.phone || '-' }}</td>
                <td>{{ user.email || '-' }}</td>
              </tr>
            </table>
          </section>
          <section class="panel panel-danger" v-if="!users.length">
            <p>There are no users added...</p>
            <div>
              <!-- <router-link :to="{ name: 'NewUser' }">
                add new post</router-link> -->
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService';
export default {
  name: 'UsersPage',

  data() {
    return {
      users: [],
    };
  },

  methods: {
    async getUsers() {
      const response = await UsersService.fetchUsers();
      this.users = response.data.users;
    },
  },

  mounted() {
    this.getUsers();
  },
};
</script>

<style lang="scss" scoped></style>
