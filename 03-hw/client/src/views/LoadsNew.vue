<template>
  <div class="loads-new">
    <h2>Create New Load</h2>
    <form @submit.prevent="handleSubmit">
      <!-- <h4>Dimensions:</h4> -->
      <div class="form-group">
        <label for="dimensions-height">*Height</label>
        <input
          class="form-control"
          type="number"
          v-model="load.dimensions['height']"
          name="dimensions-height"
          :class="{ 'is-invalid': submitted && !load.dimensions['height'] }"
        />
        <div
          v-show="submitted && !load.dimensions['height']"
          class="invalid-feedback"
        >Height is required</div>
      </div>
      <div class="form-group">
        <label for="dimensions-width">*Width</label>
        <input
          class="form-control"
          type="number"
          v-model="load.dimensions['width']"
          name="dimensions-width"
          :class="{ 'is-invalid': submitted && !load.dimensions['width'] }"
        />
        <div
          v-show="submitted && !load.dimensions['width']"
          class="invalid-feedback"
        >Width is required</div>
      </div>
      <div class="form-group">
        <label for="dimensions-length">*Length</label>
        <input
          class="form-control"
          type="number"
          v-model="load.dimensions['length']"
          name="dimensions-length"
          :class="{ 'is-invalid': submitted && !load.dimensions['length'] }"
        />
        <div
          v-show="submitted && !load.dimensions['length']"
          class="invalid-feedback"
        >Length is required</div>
      </div>
      <div class="form-group">
        <label for="payload">*Payload</label>
        <input
          class="form-control"
          type="number"
          v-model="load.payload"
          name="payload"
          :class="{ 'is-invalid': submitted && !load.payload }"
        />
        <div v-show="submitted && !load.payload" class="invalid-feedback">Payload is required</div>
      </div>
      <div class="form-group">
        <!-- <button class="btn btn-dark" :disabled="status.loggingIn">Login</button> -->
        <button class="btn btn-dark">Create Load</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LoadsNew',

  data() {
    return {
      load: {
        dimensions: {
          width: 100, // null
          height: 100, // null
          length: 100, // null
        },
        payload: 1000, // null
      },
      submitted: false,
    };
  },

  computed: {
    ...mapState(['status']),
  },

  methods: {
    ...mapActions(['createLoad']),

    parseLoadInput(load) {
      return {
        dimensions: {
          width: Number(load.dimensions['width']),
          height: Number(load.dimensions['height']),
          length: Number(load.dimensions['length']),
        },
        payload: Number(load.payload),
      };
    },

    handleSubmit(e) {
      this.submitted = true;
      const load = this.parseLoadInput(this.load);
      this.createLoad(load);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
