<template>
  <div class="users">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <h1>Users</h1>
          <section class="panel panel-success" v-if="users.length">
            <table class="table table-striped">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
              <tr v-for="(user, i) in users" :key="`${user.username}_${i}`">
                <td>{{ user._id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.phone || '-' }}</td>
                <td>{{ user.email || '-' }}</td>
                <td
                  class="actions"
                  v-if="user._id === currUser._id"
                  @click="() => handleClickDelete(user._id)"
                >
                  x
                </td>
              </tr>
            </table>
          </section>
          <section class="panel panel-danger" v-else>
            <p>There are no users added...</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UsersPage',

  computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users,
      currUser: state => state.user,
    }),
  },

  methods: {
    ...mapActions({
      getAllUsers: 'getAll',
      deleteUser: 'remove',
    }),

    handleClickDelete(id) {
      this.deleteUser(id);
    },
  },

  created() {
    this.getAllUsers();
  },
};
</script>

<style lang="scss" scoped></style>
