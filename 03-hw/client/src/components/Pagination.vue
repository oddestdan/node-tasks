<template>
  <nav class="pagination">
    <ul class="pagination__list">
      <li class="pagination__item">
        <a
          class="pagination__link"
          href="#"
          v-if="curPage != 1"
          @click.prevent="prevPage"
          >Previous</a
        >
        <span class="pagination__span--disabled" v-else>Previous</span>
      </li>

      <template v-if="numPages <= 6">
        <li class="pagination__item" v-for="n in numPages" :key="n">
          <a
            class="pagination__link"
            href="#"
            v-if="curPage != n"
            @click.prevent="setCurPage(n)"
            >{{ n }}</a
          >
          <span class="pagination__span--active" v-else>{{ n }}</span>
        </li>
      </template>

      <template v-else-if="numPages > 6 && curPage <= 4">
        <li class="pagination__item" v-for="n in 5" :key="n">
          <a
            class="pagination__link"
            href="#"
            v-if="curPage != n"
            @click.prevent="setCurPage(n)"
            >{{ n }}</a
          >
          <span class="pagination__span--active" v-else>{{ n }}</span>
        </li>
        <li class="pagination__item">
          <span class="pagination__span--disabled">...</span>
        </li>
      </template>

      <template v-else-if="numPages > 6 && curPage > numPages - 4">
        <li class="pagination__item">
          <span class="pagination__span--disabled">...</span>
        </li>
        <li
          v-for="n in [
            numPages - 4,
            numPages - 3,
            numPages - 2,
            numPages - 1,
            numPages,
          ]"
          :key="n"
        >
          <a
            class="pagination__link"
            href="#"
            v-if="curPage != n"
            @click.prevent="setCurPage(n)"
            >{{ n }}</a
          >
          <span class="pagination__span--active" v-else>{{ n }}</span>
        </li>
      </template>

      <template v-else>
        <li class="pagination__item">
          <a class="pagination__link" href="#" @click.prevent="setCurPage(1)"
            >1</a
          >
        </li>
        <li class="pagination__item">
          <span class="pagination__span--disabled">...</span>
        </li>
        <li
          class="pagination__item"
          v-for="n in [curPage - 1, curPage, curPage + 1]"
          :key="n"
        >
          <a
            class="pagination__link"
            href="#"
            v-if="curPage != n"
            @click.prevent="setCurPage(n)"
            >{{ n }}</a
          >
          <span class="pagination__span--active" v-else>{{ n }}</span>
        </li>
        <li class="pagination__item">
          <span class="pagination__span--disabled">...</span>
        </li>
        <li class="pagination__item">
          <a
            class="pagination__link"
            href="#"
            @click.prevent="setCurPage(numPages)"
            >{{ numPages }}</a
          >
        </li>
      </template>

      <li class="pagination__item">
        <a
          class="pagination__link"
          href="#"
          v-if="curPage != numPages"
          @click.prevent="nextPage"
          >Next</a
        >
        <span class="pagination__span--disabled" v-else>Next</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  computed: {
    curPage() {
      return this.$store.state.curPage;
    },
    numPages() {
      return Math.ceil(this.$store.state.total / this.$store.state.perPage);
    },
  },

  methods: {
    // TODO: remake into Actions with calls to API when changing pages
    ...mapMutations(['setCurPage', 'prevPage', 'nextPage']),
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  &__list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: inline-block;
    padding: 7px 8px;
  }

  &__link {
    display: block;
    text-decoration: none;
  }

  &__span {
    display: block;

    &--active {
      color: #111;
    }

    &--disabled {
      color: #eee;
      cursor: not-allowed;
    }
  }
}
</style>
