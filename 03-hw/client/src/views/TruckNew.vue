<template>
  <div class="truck-new">
    <div class="container">
      <h2>Create New Truck</h2>
      <form class="truck-new__form" @submit.prevent="handleSubmit">
        <div class="form-group truck-new__form-group">
          <label for="type">*Type: W x H x L / Payload</label>
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
              >{{ type }}: {{ formatTypeInfo(type) }}</option
            >
          </select>
          <div v-show="submitted && !truck.type" class="invalid-feedback">
            Type is required
          </div>
        </div>
        <div class="form-group truck-new__form-group--button">
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

    formatTypeInfo(type) {
      const typeValue = this.types[type];
      const info = this.typesInfo[typeValue];
      const { height, width, length } = info.dimensions;
      return `${height} x ${width} x ${length} / ${typeInfo.payload}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../media_mixins.scss';

.truck-new {
  &__form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__form-group {
    width: 45%;

    &--button {
      width: 100%;
    }

    @include phone {
      width: 100%;
    }
  }
}
</style>
