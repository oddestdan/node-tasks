<template>
  <div class="weather-info">
    <div class="weather-info__wrapper" v-if="weather">
      <span class="weather-info__city">{{ weather.name }},</span>
      <span class="weather-info__temp">{{ weather.main.temp.toFixed(1) }} °C</span>
    </div>
    <div class="weather-wrapper" v-else>
      <span>Getting weather...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherInfo',

  props: {
    weather: Object,
  },
};
</script>

<style lang="scss" scoped>
.weather-info {
  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__city,
  &__temp {
    padding: 5px;
  }
}
</style>
