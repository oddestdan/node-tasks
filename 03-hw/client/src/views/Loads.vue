<template>
  <div class="loads-page">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="row">
            <h2>{{ isDriver ? 'Assigned' : 'Created' }} Loads</h2>
            <button
              v-if="!isDriver"
              @click="handleCreateLoadClick"
              class="btn btn-link"
            >
              Create New Load
            </button>
          </div>
          <section class="panel panel-success" v-if="loads.length">
            <table class="table table-striped">
              <tr>
                <th>Load ID</th>
                <th>{{ isDriver ? 'Created by' : 'Assigned to' }}</th>
                <th>Status</th>
                <th>State</th>
                <th>Dimensions (W x H x L)</th>
                <th>Payload</th>
                <th>Logs</th>
              </tr>
              <tr v-for="(load, i) in loads" :key="`${load._id}_${i}`">
                <td>{{ load._id }}</td>
                <td>
                  {{ isDriver ? load.creatorId : load.assigneeId }}
                </td>
                <td>{{ load.status }}</td>
                <td>{{ load.state || '-' }}</td>
                <td class="dimensions">
                  {{ load.dimensions['width'] }} x
                  {{ load.dimensions['height'] }} x
                  {{ load.dimensions['length'] }}
                </td>
                <!-- <td>
                  <span
                    class="dimensions"
                    v-for="dim in Object.keys(load.dimensions)"
                    :key="`${dim}`"
                  >{{ load.dimensions[dim] }} x</span>
                </td>-->
                <!-- <td>
                  <p
                    class="dimensions"
                    v-for="dim in Object.keys(load.dimensions)"
                    :key="`${dim}`"
                  >{{ `${dim}: ${load.dimensions[dim]}` }}</p>
                </td>-->
                <td>{{ load.payload }}</td>
                <td class="actions">
                  <span v-if="load.logs.length === 0">-</span>
                  <button
                    @click="() => handleShowLogsClick(load.logs)"
                    class="btn btn-link"
                    v-else
                  >
                    Logs
                  </button>
                </td>

                <td class="actions" v-if="load.status === 'NEW'">
                  <button
                    @click="() => handlePostLoadClick(load._id)"
                    class="btn btn-link"
                  >
                    Post
                  </button>
                </td>
                <td class="actions" v-if="load.status === 'NEW'">
                  <button
                    @click="() => handleDeleteLoadClick(load._id)"
                    class="btn btn-link"
                  >
                    x
                  </button>
                </td>
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
  name: 'LoadsPage',

  computed: {
    ...mapState({
      user: state => state.user,
      isDriver: state => state.user.role === 'driver',
      loads: state => state.loads,
    }),
  },

  methods: {
    ...mapActions(['getLoads', 'postLoad', 'removeLoad']),

    handleCreateLoadClick(e) {
      this.$router.push('/loads/new');
    },

    handleShowLogsClick(logs) {
      console.log(logs);
      // trigger modal here
    },

    handlePostLoadClick(id) {
      this.postLoad(id);
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

<style lang="scss" scoped></style>
