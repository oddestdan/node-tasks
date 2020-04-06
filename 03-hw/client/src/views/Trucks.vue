<template>
  <div class="trucks-page">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="row">
            <h2>Trucks</h2>
            <button @click="handleCreateTruckClick" class="btn btn-link">Create New Truck</button>
          </div>

          <h5>Created</h5>
          <section class="panel panel-success" v-if="createdTrucks.length">
            <table class="table table-striped">
              <tr>
                <th>Truck ID</th>
                <th>Creator ID</th>
                <th>Assignee ID</th>
                <th>Status</th>
                <th>Type</th>
              </tr>
              <tr v-for="(truck, i) in createdTrucks" :key="`${truck._id}_${i}`">
                <td>{{ truck._id }}</td>
                <td>{{ truck.creatorId }}</td>
                <td>{{ truck.assigneeId || '-' }}</td>
                <td>{{ truck.status }}</td>
                <td>{{ truck.type }}</td>

                <td class="actions" v-if="truck.creatorId === user._id">
                  <button
                    v-if="!truck.assigneeId"
                    @click="() => handleAssignTruckClick(truck._id)"
                    class="btn btn-link"
                  >Assign</button>
                </td>
                <td class="actions">
                  <button @click="() => handleDeleteTruckClick(truck._id)" class="btn btn-link">x</button>
                </td>
              </tr>
            </table>
          </section>
          <section class="panel panel-danger" v-else>
            <p>No trucks created yet...</p>
          </section>

          <h5>All</h5>
          <section class="panel panel-success" v-if="trucks.length">
            <table class="table table-striped">
              <tr>
                <th>Truck ID</th>
                <th>Creator ID</th>
                <th>Assignee ID</th>
                <th>Status</th>
                <th>Type</th>
              </tr>
              <tr v-for="(truck, i) in trucks" :key="`${truck._id}_${i}`">
                <td>{{ truck._id }}</td>
                <td>{{ truck.creatorId }}</td>
                <td>{{ truck.assigneeId || '-' }}</td>
                <td>{{ truck.status }}</td>
                <td>{{ truck.type }}</td>

                <td class="actions">
                  <button @click="() => handleDeleteTruckClick(load._id)" class="btn btn-link">x</button>
                </td>
              </tr>
            </table>
          </section>
          <section class="panel panel-danger" v-else>
            <p>No trucks found...</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TrucksPage',

  computed: {
    ...mapState({
      user: state => state.user,
      trucks: state => state.trucks,
      createdTrucks: state =>
        state.trucks.filter(t => t.creatorId === state.user._id),
    }),
  },

  methods: {
    ...mapActions(['getAllTrucks', 'assignTruck', 'removeTruck']),

    handleCreateTruckClick(e) {
      this.$router.push('/trucks/new');
    },
    handleAssignTruckClick(id) {
      this.assignTruck(id);
    },

    handleDeleteTruckClick(id) {
      this.removeTruck(id);
    },
  },

  created() {
    this.getAllTrucks();
  },
};
</script>

<style lang="scss" scoped>
</style>
