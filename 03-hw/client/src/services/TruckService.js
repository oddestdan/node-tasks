import { auth, handleResponse } from '../helpers';
import { BASE_URL } from '../globals';

export default {
  async getAll() {
    const requestConfig = {
      method: 'GET',
      headers: auth(),
    };

    const response = await fetch(`${BASE_URL}/trucks/all`, requestConfig);
    const { trucks, status } = await handleResponse(response);
    console.log('Response status:', status);
    return trucks;
  },

  async create(data) {
    const requestConfig = {
      method: 'POST',
      headers: { ...auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${BASE_URL}/trucks`, requestConfig);
    const { truck, status } = await handleResponse(response);
    console.log('Response status:', status);
    return truck;
  },

  async assign(id) {
    const requestConfig = {
      method: 'PATCH',
      headers: auth(),
    };

    const response = await fetch(
      `${BASE_URL}/trucks/${id}/assign`,
      requestConfig
    );
    const { trucks, status } = await handleResponse(response);
    console.log('Response status:', status);
    return trucks;
  },

  async update({ _id, data }) {
    const requestConfig = {
      method: 'PUT',
      headers: { ...auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${BASE_URL}/trucks/${_id}`, requestConfig);
    const { truck, status } = await handleResponse(response);
    console.log('Response status:', status);
    return truck;
  },

  async remove(id) {
    const requestConfig = {
      method: 'DELETE',
      headers: auth(),
    };

    const response = await fetch(`${BASE_URL}/trucks/${id}`, requestConfig);
    const { truck, status } = await handleResponse(response);
    console.log('Response status:', status);
    return truck;
  },
};
