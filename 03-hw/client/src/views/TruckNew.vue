<template>
  <div class="truck-new">
    <div class="container">
      <h2>Create New Truck</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="type">*Type</label>
          <select
            class="custom-select"
            name="type"
            v-model="truck.type"
            :class="{ 'is-invalid': submitted && !truck.type }"
          >
            <option
              v-for="type in Object.keys(types)"
              :key="`${type}`"
              :value="type"
            >{{ type }}: {{ typesInfo[types[type]] }}</option>
          </select>
          <div v-show="submitted && !truck.type" class="invalid-feedback">Type is required</div>
        </div>
        <div class="form-group">
          <button class="btn btn-dark">Create Truck</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { truckTypes, truckTypeInfo } from '../globals';

export default {
  name: 'TruckNew',

  data() {
    return {
      truck: {
        type: '',
      },
      submitted: false,
    };
  },

  computed: {
    ...mapState(['status']),
    types: () => truckTypes,
    typesInfo: () => truckTypeInfo,
    getTypeInfo: id => truckTypeInfo[id],
  },

  methods: {
    ...mapActions(['createTruck']),

    parseTruckInput(truck) {
      return {
        type: truckTypes[truck.type],
      };
    },

    handleSubmit(e) {
      this.submitted = true;
      const truck = this.parseTruckInput(this.truck);
      if (truck.type) {
        this.createTruck(truck);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
