<template>
  <div class="modal-window">
    <b-modal id="modal-xl" size="xl" title="Logs">
      <table class="table table-striped" v-if="currentLoad">
        <tr>
          <th>Timestamp</th>
          <th>Message</th>
        </tr>
        <tr v-for="log in currentLoad.logs" :key="log.time">
          <td>{{ formatTime(log.time) }}</td>
          <td>{{ log.message }}</td>
        </tr>
      </table>

      <template v-slot:modal-footer="{ close }">
        <b-button variant="danger" @click="handleGeneratePdfClick"
          >PDF</b-button
        >
        <b-button variant="dark" @click="close">Close</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatIsoStringToDate } from '../helpers';

export default {
  name: 'LogsModal',

  props: {
    currentLoad: {},
  },

  methods: {
    ...mapActions(['generateLoadPdf']),

    handleGeneratePdfClick() {
      this.generateLoadPdf(this.currentLoad._id);
    },

    formatTime(time) {
      return formatIsoStringToDate(time);
    },
  },
};
</script>

<style lang="scss">
@import '../media_mixins.scss';

.modal-backdrop {
  @include phone {
    width: 100%;
  }
}

.modal-dialog {
  @include phone {
    width: calc(100vw - 1rem);
  }
}
</style>
