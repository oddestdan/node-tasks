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
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <!-- <div class="row d-flex justify-content-between"> -->
          <div class="row">
            <h2>{{isDriver ? 'Assigned' : 'Created'}} Loads</h2>
            <button @click="handleCreateLoadClick" class="btn btn-link">Create New Load</button>
          </div>
          <section class="panel panel-success" v-if="loads.length">
            <!-- <div class="panel-heading">List of users</div> -->
            <table class="table table-striped">
              <tr>
                <th>Load ID</th>
                <th>{{isDriver ? 'Created by' : 'Assigned to'}}</th>
                <th>Status</th>
                <th>State</th>
                <th>Dimensions</th>
                <th>Payload</th>
                <!-- <th>Logs</th> -->
              </tr>
              <tr v-for="(load, i) in loads" :key="`${load._id}_${i}`">
                <td>{{ load._id }}</td>
                <td>
                  {{
                  isDriver ? load.creatorId : load.assigneeId
                  }}
                </td>
                <td>{{ load.status }}</td>
                <td>{{ load.state || '-' }}</td>
                <td>
                  <p class="dimensions">H: {{ load.dimensions['height'] }}</p>
                  <p class="dimensions">W: {{ load.dimensions['width'] }}</p>
                  <p class="dimensions">L :{{ load.dimensions['length'] }}</p>
                </td>
                <td>{{ load.payload }}</td>
                <td
                  class="actions"
                  v-if="load.status === 'NEW'"
                  @click="() => handleDeleteLoadClick(load._id)"
                >x</td>
                <!-- <td>{{ load.logs }}</td> -->
              </tr>
            </table>
          </section>
          <section class="panel panel-danger" v-else>
            <p>No loads {{ isDriver ? 'assigned' : 'created' }} yet...</p>
          </section>
        </div>
      </div>
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
      isDriver: state => state.user.role === 'shipper',
      loads: state => state.loads,
    }),
  },

  methods: {
    ...mapActions([
      'getLoads',
      'updateAccountInfo',
      'updatePassword',
      'removeLoad',
    ]),

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

    handleCreateLoadClick(e) {
      this.$router.push('/loads/new');
    },

    handleDeleteLoadClick(id) {
      this.removeLoad(id);
    },
  },

  created() {
    // TODO: check caching of loads when logged out and in
    this.getLoads();
  },
};
</script>

<style lang="scss" scoped>
</style>
