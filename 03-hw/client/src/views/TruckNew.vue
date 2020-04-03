<template>
  <div class="truck-new">
    <div class="container">
      <h2>Create New Truck</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="type">*Type</label>
          <select class="custom-select" name="type" v-model="truck.type">
            <option
              v-for="type in Object.keys(types)"
              :key="`${type}`"
              :value="type"
            >{{ type }}: {{ typesInfo[types[type]] }}</option>
          </select>
        </div>
        <div class="form-group">
          <!-- <button class="btn btn-dark" :disabled="status.loggingIn">Login</button> -->
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
        type: 'sprinter',
      },
    };
  },

  computed: {
    ...mapState(['status']),
    // typeKeys: () => Object.keys(truckTypes),
    // typeValues: () => Object.values(truckTypes)
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
      const truck = this.parseTruckInput(this.truck);
      console.log(truck);
      this.createTruck(truck);
    },
  },

  created() {
    console.log(this.types);
    console.log(this.typesInfo);
  },
};
</script>

<style lang="scss" scoped>
</style>
