import Vue from 'vue';
import Vuex from 'vuex';

import router from '../router/';

import UserService from '../services/UserService';
import LoadService from '../services/LoadService';

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

    // Loads management
    loads: [],
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
      // TODO: rethink 'all' as a single storage point for
      // items, users etc.

      // add 'deleting:true' property to user being deleted

      // state.all.items = state.all.items.map(user =>
      state.users = state.users.map(user =>
        user._id === id ? { ...user, deleting: true } : user
      );
    },
    deleteSuccess(state, id) {
      // remove deleted user from state
      // state.all.items = state.all.items.filter(user => user._id !== id);
      state.users = state.users.filter(user => user._id !== id);
    },
    deleteFailure(state, { id, error }) {
      // remove 'deleting:true' property and add 'deleteError:[error]'
      // property to user

      // state.all.items = state.items.map(user => {
      state.users = state.users.map(user => {
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
    update(state, user) {
      state.status = {};

      // Update user information from local storage
      const { token } = JSON.parse(localStorage.getItem('user'));
      user.token = token;
      localStorage.setItem('user', JSON.stringify(user));

      state.user = user;
    },
    updatePassword(state, user) {
      state.status = {};

      // Update user information from local storage
      const { token } = JSON.parse(localStorage.getItem('user'));
      user.token = token;
      localStorage.setItem('user', JSON.stringify(user));

      state.user = user;
    },

    // Loads management
    getAssignedLoadsRequest(state) {
      state.all = { loading: true };
    },
    getAssignedLoadsSuccess(state, loads) {
      state.loads = loads;
    },
    getAssignedLoadsFailure(state, error) {
      state.all = { error };
    },
    createLoad(state, load) {
      state.loads = [...state.loads, load];
    },
    deleteLoadRequest(state, id) {
      state.loads = state.loads.map(load =>
        load._id === id ? { ...load, deleting: true } : load
      );
    },
    deleteLoadSuccess(state, id) {
      console.log(state.loads);
      state.loads = state.loads.filter(load => load._id !== id);
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
          router.push('/');
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
          router.push('/login');
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
        users => commit('getAllSuccess', users),
        error => commit('getAllFailure', error)
      );
    },
    remove({ commit }, id) {
      const agreed = window.confirm(
        'Are you sure you want to delete your account?'
      );

      if (agreed) {
        commit('deleteRequest', id);

        UserService.remove(id).then(
          user => {
            commit('deleteSuccess', user._id);

            // logout self-deleted user
            UserService.logout();
            commit('logout');
            router.push('/login');
          },
          error => commit('deleteFailure', { id, error: error.toString() })
        );
      }
    },
    // { id, updatedData } === payload
    updateAccountInfo({ commit }, payload) {
      UserService.update(payload).then(
        user => commit('update', user),
        error => console.log(error.toString())
      );
    },
    updatePassword({ commit }, payload) {
      UserService.updatePassword(payload).then(
        user => commit('updatePassword', user),
        error => console.log(error.toString())
      );
    },

    // Loads management
    getLoads({ commit }) {
      commit('getAssignedLoadsRequest');

      LoadService.getAll().then(
        loads => commit('getAssignedLoadsSuccess', loads),
        error => commit('getAssignedLoadsFailure', error)
      );
    },
    createLoad({ commit }, payload) {
      LoadService.create(payload).then(
        load => {
          commit('createLoad', load);
          router.push('/profile');
        },
        error => console.log(error.toString())
      );
    },
    removeLoad({ commit }, id) {
      commit('deleteLoadRequest', id);

      LoadService.remove(id).then(
        load => commit('deleteLoadSuccess', load._id),
        error => console.log(error.toString())
      );
    },
  },

  modules: {
    // user
    // account
    // load
    // truck
  },
});
