import { auth, handleResponse } from '../helpers';
import { BASE_URL } from '../globals';

const service = {
  async login(username, password) {
    const requestConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    const response = await fetch(`${BASE_URL}/login`, requestConfig);
    const { user, status, token } = await handleResponse(response);

    // login successful if there's a jwt token in the response
    if (token) {
      // assign JWT Token to the user to store in LS
      user.token = token;
      // store user details and jwt token in local storage
      // to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
    }
    console.log('Response status:', status);
    return user;
  },

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
  },

  async register(userData) {
    const requestConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    };

    const response = await fetch(`${BASE_URL}/register`, requestConfig);
    const { user, status } = await handleResponse(response);
    console.log('Response status:', status);
    return user;
  },

  async getAll() {
    const requestConfig = {
      method: 'GET',
      headers: auth(),
    };

    const response = await fetch(`${BASE_URL}/users`, requestConfig);
    const { users, status } = await handleResponse(response);
    console.log('Response status:', status);
    return users;
  },

  async getById(id) {
    const requestConfig = {
      method: 'GET',
      headers: auth(),
    };

    const response = await fetch(`${BASE_URL}/users/${id}`, requestConfig);
    const { user, status } = await handleResponse(response);
    console.log('Response status:', status);
    return user;
  },

  async update({ _id, data }) {
    const requestConfig = {
      method: 'PUT',
      headers: { ...auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${BASE_URL}/users/${_id}`, requestConfig);
    const { user, status } = await handleResponse(response);
    console.log('Response status:', status);
    return user;
  },

  async updatePassword({ _id, data }) {
    const requestConfig = {
      method: 'PATCH',
      headers: { ...auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${BASE_URL}/users/${_id}`, requestConfig);
    const { user, status } = await handleResponse(response);
    console.log('Response status:', status);
    return user;
  },

  // "remove" because delete is a reserved word in JS
  async remove(id) {
    const requestConfig = {
      method: 'DELETE',
      headers: auth(),
    };

    const response = await fetch(`${BASE_URL}/users/${id}`, requestConfig);
    const { user, status } = await handleResponse(response);
    console.log('Response status:', status);
    return user;
  },
};

export default service;
