<template>
  <div class="load-new">
    <div class="container">
      <h2>Create New Load</h2>
      <form class="load-new__form" @submit.prevent="handleSubmit">
        <div class="form-group load-new__form-group">
          <label for="dimensions-height">*Height</label>
          <input
            class="form-control"
            type="number"
            placeholder="Enter height"
            v-model="load.dimensions['height']"
            name="dimensions-height"
            :class="{ 'is-invalid': submitted && !load.dimensions['height'] }"
          />
          <div
            v-show="submitted && !load.dimensions['height']"
            class="invalid-feedback"
          >
            Height is required
          </div>
        </div>
        <div class="form-group load-new__form-group">
          <label for="dimensions-width">*Width</label>
          <input
            class="form-control"
            type="number"
            placeholder="Enter width"
            v-model="load.dimensions['width']"
            name="dimensions-width"
            :class="{ 'is-invalid': submitted && !load.dimensions['width'] }"
          />
          <div
            v-show="submitted && !load.dimensions['width']"
            class="invalid-feedback"
          >
            Width is required
          </div>
        </div>
        <div class="form-group load-new__form-group">
          <label for="dimensions-length">*Length</label>
          <input
            class="form-control"
            type="number"
            placeholder="Enter length"
            v-model="load.dimensions['length']"
            name="dimensions-length"
            :class="{ 'is-invalid': submitted && !load.dimensions['length'] }"
          />
          <div
            v-show="submitted && !load.dimensions['length']"
            class="invalid-feedback"
          >
            Length is required
          </div>
        </div>
        <div class="form-group load-new__form-group">
          <label for="payload">*Payload</label>
          <input
            class="form-control"
            type="number"
            placeholder="Enter payload"
            v-model="load.payload"
            name="payload"
            :class="{ 'is-invalid': submitted && !load.payload }"
          />
          <div v-show="submitted && !load.payload" class="invalid-feedback">
            Payload is required
          </div>
        </div>
        <div class="form-group load-new__form-group--button">
          <button class="btn btn-dark">Create Load</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'LoadNew',

  data() {
    return {
      load: {
        dimensions: {
          width: null,
          height: null,
          length: null,
        },
        payload: null,
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
      const { width, height, length } = load.dimensions;
      if (width && height && length && load.payload) {
        this.createLoad(load);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../media_mixins.scss';

.load-new {
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
