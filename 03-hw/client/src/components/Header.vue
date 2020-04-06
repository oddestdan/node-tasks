<template>
  <div class="header">
    <div class="header__title">
      <span>Uber App</span>
    </div>

    <div class="header__menu">
      <router-link class="header__link" to="/">Home</router-link>
      <span class="header__separator">|</span>
      <router-link class="header__link" to="/users">Users</router-link>
      <span class="header__separator">|</span>
      <router-link class="header__link" to="/profile">Profile</router-link>
      <span class="header__separator">|</span>

      <router-link class="header__link" to="/loads">Loads</router-link>
      <span class="header__separator">|</span>

      <span v-if="user && user.role === 'driver'">
        <router-link class="header__link" to="/trucks">Trucks</router-link>
        <span class="header__separator">|</span>
      </span>

      <span v-if="isLoggedIn">
        <router-link class="header__link" to="/login">Log out</router-link>
      </span>
      <span v-else>
        <router-link class="header__link" to="/login">Log in</router-link>
        <span class="header__separator">|</span>
        <router-link class="header__link" to="/register">Sign up</router-link>
      </span>
    </div>

    <div class="header__weather">
      <WeatherInfo :weather="weather" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import WeatherInfo from './WeatherInfo';

import { WEATHER_CITY_NAME } from '../globals/constants';

export default {
  name: 'Header',

  components: {
    WeatherInfo,
  },

  computed: {
    ...mapState({
      isLoggedIn: state => state.status.loggedIn,
      user: state => state.user,
      weather: state => state.weather,
    }),
  },

  methods: {
    ...mapActions(['getWeather']),
  },

  created() {
    if (!this.$store.state.weather) {
      const reqData = {
        locationType: 'name',
        locationData: WEATHER_CITY_NAME,
      };
      this.getWeather(reqData);
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__menu {
    display: flex;
    align-items: center;
  }

  &__link {
    padding: 5px 10px;
  }

  &__separator {
    padding: 0 10px;
  }
}

@media only screen and (max-width: 600px) {
  .header {
    flex-direction: column;

    &__menu {
      flex-direction: column;
    }

    &__separator {
      display: none;
    }
  }
}
</style>
