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

          <div class="col-6">Role (select)</div>
          <div class="col-6">{{user.role}}</div>

          <div class="w-100 d-none d-md-block"></div>

          <div class="col-6">Phone</div>
          <div class="col-6">
            <input v-model="user.phone" />
          </div>

          <div class="w-100 d-none d-md-block"></div>

          <div class="col-6">Email</div>
          <div class="col-6">
            <input @change="handleChange" v-model="user.email" />
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col">
          <h2>
            {{
            user.role === 'driver' ? 'Assigned' : 'Created'
            }} Loads
          </h2>
          <section class="panel panel-success" v-if="loads.length">
            <!-- <div class="panel-heading">List of users</div> -->
            <table class="table table-striped">
              <tr>
                <th>Load ID</th>
                <th>
                  {{
                  user.role === 'driver' ? 'Created by' : 'Assigned to'
                  }}
                </th>
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
                  user.role === 'driver' ? load.creatorId : load.assigneeId
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
                <!-- <td>{{ load.logs }}</td> -->
              </tr>
            </table>
          </section>
          <section class="panel panel-danger" v-else>
            <p>
              No loads {{ user.role === 'driver' ?
              'assigned' : 'created' }} yet...
            </p>
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

  computed: {
    ...mapState({
      user: state => state.user,
      loads: state => state.loads,
    }),
  },

  methods: {
    ...mapActions({
      getLoads: 'getAssigned',
    }),

    handleChange(e) {
      console.log('Updating value', e.target.value);
    },
  },

  created() {
    this.getLoads();
  },
};
</script>

<style lang="scss" scoped>
</style>
