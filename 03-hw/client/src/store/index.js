import Vue from 'vue';
import Vuex from 'vuex';

// import { account } from './account.module';
import UserService from '../services/UserService';

Vue.use(Vuex);

const user = JSON.parse(localStorage.getItem('user'));

export default new Vuex.Store({
  state: {
    // Validations and alerts
    type: null,
    message: null,

    // Authorization management
    status: user ? { loggedIn: true } : {},
    user: user ? user : null,

    // Users management
    all: {},
    users: [],
  },

  mutations: {
    SET: (state, { key, value }) => (state[key] = value),

    // Validations and alerts
    success(state, message) {
      state.type = 'alert-success';
      state.message = message;
    },
    error(state, message) {
      state.type = 'alert-danger';
      state.message = message;
    },
    clear(state) {
      state.type = null;
      state.message = null;
    },

    // Authorization management
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    },
    registerRequest(state, user) {
      state.status = { registering: true };
    },
    registerSuccess(state, user) {
      state.status = {};
    },
    registerFailure(state, error) {
      state.status = {};
    },

    // Users management
    getAllRequest(state) {
      state.all = { loading: true };
    },
    getAllSuccess(state, users) {
      state.users = users;
    },
    getAllFailure(state, error) {
      state.all = { error };
    },
    deleteRequest(state, id) {
      // add 'deleting:true' property to user being deleted
      // TODO: rethink all.items
      state.all.items = state.all.items.map(user =>
        user.id === id ? { ...user, deleting: true } : user
      );
    },
    deleteSuccess(state, id) {
      // remove deleted user from state
      state.all.items = state.all.items.filter(user => user.id !== id);
    },
    deleteFailure(state, { id, error }) {
      // remove 'deleting:true' property and add 'deleteError:[error]'
      // property to user
      state.all.items = state.items.map(user => {
        if (user.id === id) {
          // make copy of user without 'deleting:true' property
          // eslint-disable-next-line
          const { deleting, ...userCopy } = user;
          // return copy of user with 'deleteError:[error]' property
          return { ...userCopy, deleteError: error };
        }

        return user;
      });
    },
  },

  actions: {
    // Validations and alerts
    success({ commit }, message) {
      commit('success', message);
    },
    error({ commit }, message) {
      commit('error', message);
    },
    clear({ commit }) {
      commit('clear');
    },

    // Authorization management
    login({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username });

      UserService.login(username, password).then(
        user => {
          commit('loginSuccess', user);
          // router.push('/');
        },
        error => {
          commit('loginFailure', error);
          dispatch('error', error, { root: true });
        }
      );
    },
    logout({ commit }) {
      UserService.logout();
      commit('logout');
    },
    register({ dispatch, commit }, user) {
      commit('registerRequest', user);

      UserService.register(user).then(
        user => {
          commit('registerSuccess', user);
          // router.push('/login');
          setTimeout(() => {
            // display success message after route change completes
            dispatch('success', 'Registration successful', {
              root: true,
            });
          });
        },
        error => {
          commit('registerFailure', error);
          dispatch('error', error, { root: true });
        }
      );
    },

    // Users management
    getAll({ commit }) {
      commit('getAllRequest');

      UserService.getAll().then(
        resp => commit('getAllSuccess', resp.users),
        error => commit('getAllFailure', error)
      );
    },

    delete({ commit }, id) {
      commit('deleteRequest', id);

      UserService.delete(id).then(
        user => commit('deleteSuccess', id),
        error => commit('deleteFailure', { id, error: error.toString() })
      );
    },
  },

  modules: {
    // account,
  },
});
