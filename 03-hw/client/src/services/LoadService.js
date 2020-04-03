import { auth, handleResponse } from '../helpers';
import { BASE_URL } from '../globals';

export default {
  async getAll() {
    const requestConfig = {
      method: 'GET',
      headers: auth(),
    };

    const response = await fetch(`${BASE_URL}/loads`, requestConfig);
    const { loads, status } = await handleResponse(response);
    console.log('Response status:', status);
    return loads;
  },

  async create(data) {
    const requestConfig = {
      method: 'POST',
      headers: { ...auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${BASE_URL}/loads`, requestConfig);
    const { load, status } = await handleResponse(response);
    console.log('Response status:', status);
    return load;
  },

  async post(id) {
    const requestConfig = {
      method: 'PATCH',
      headers: auth(),
    };

    const response = await fetch(`${BASE_URL}/loads/${id}/post`, requestConfig);
    const { load, truckCandidate, status } = await handleResponse(response);
    console.log('Response status:', status);
    return { load, truckCandidate };
  },

  // "remove" because delete is a reserved word in JS
  async remove(id) {
    const requestConfig = {
      method: 'DELETE',
      headers: auth(),
    };

    const response = await fetch(`${BASE_URL}/loads/${id}`, requestConfig);
    const { load, status } = await handleResponse(response);
    console.log('Response status:', status);
    return load;
  },
};
