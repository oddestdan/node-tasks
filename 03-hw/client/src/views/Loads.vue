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
            >Create New Load</button>
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
                <td>{{ isDriver ? load.creatorId : load.assigneeId }}</td>
                <td>{{ load.status }}</td>
                <td>
                  {{ load.state || '-' }}
                  <b-button
                    v-if="isDriver && load.status === 'ASSIGNED'"
                    @click="handleStateChange(load._id)"
                    variant="link"
                  >Update</b-button>
                </td>
                <td class="dimensions">
                  {{ load.dimensions['width'] }} x
                  {{ load.dimensions['height'] }} x
                  {{ load.dimensions['length'] }}
                </td>
                <td>{{ load.payload }}</td>
                <td class="actions">
                  <span v-if="load.logs.length === 0">-</span>
                  <b-button
                    @click="currentLoad = load"
                    v-b-modal.modal-xl
                    variant="link"
                    v-else
                    >Logs</b-button
                  >
                </td>

                <template v-if="load.status === 'NEW' && !isDriver">
                  <td class="actions">
                    <button
                      @click="handlePostLoadClick(load._id)"
                      class="btn btn-link"
                    >Post</button>
                  </td>
                  <td class="actions">
                    <button
                      @click="handleDeleteLoadClick(load._id)"
                      class="btn btn-link"
                    >x</button>
                  </td>
                </template>
              </tr>
            </table>

            <!-- <Pagination /> -->
          </section>

          <section class="panel panel-danger" v-else>
            <p>No loads {{ isDriver ? 'assigned' : 'created' }} yet...</p>
          </section>
        </div>
      </div>

      <LogsModal :currentLoad="currentLoad" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LogsModal from '../components/LogsModal';
// import Pagination from '../components/Pagination';

export default {
  name: 'LoadsPage',

  components: {
    LogsModal,
    // Pagination,
  },

  data() {
    return {
      currentLoad: null,
    };
  },

  computed: {
    ...mapState({
      user: state => state.user,
      isDriver: state => state.user.role === 'driver',
      loads: state => state.loads,
    }),
  },

  methods: {
    ...mapActions(['getLoads', 'updateLoadState', 'postLoad', 'removeLoad']),

    handleCreateLoadClick() {
      this.$router.push('/loads/new');
    },

    handleStateChange(id) {
      this.updateLoadState(id);
    },

    handlePostLoadClick(id) {
      this.postLoad(id);
    },

    handleDeleteLoadClick(id) {
      this.removeLoad(id);
    },
  },

  created() {
    this.getLoads();
  },
};
</script>

<style lang="scss" scoped></style>
