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
                <td>{{ isDriver ? load.creatorId : load.assigneeId }}</td>
                <td>{{ load.status }}</td>
                <select
                  v-if="isDriver"
                  class="custom-select"
                  name="state"
                  v-model="load.state"
                  @change="() => handleStateChange(load)"
                >
                  <option
                    v-for="state in Object.values(loadStates)"
                    :key="`${state}`"
                    :value="state"
                    >{{ state }}</option
                  >
                </select>
                <td v-else>{{ load.state }}</td>
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
import { loadStates } from '../globals';
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
      loadStates: () => loadStates,
    }),
  },

  methods: {
    ...mapActions(['getLoads', 'updateLoadState', 'postLoad', 'removeLoad']),

    handleCreateLoadClick() {
      this.$router.push('/loads/new');
    },

    handleStateChange(load) {
      const { _id, state } = load;
      const data = { state };
      this.updateLoadState({ _id, data });
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
