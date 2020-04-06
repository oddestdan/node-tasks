import { auth, handleResponse, downloadBlob } from '../helpers';
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

  async update({ _id, data }) {
    const requestConfig = {
      method: 'PUT',
      headers: { ...auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${BASE_URL}/loads/${_id}`, requestConfig);
    const { load, status } = await handleResponse(response);
    console.log('Response status:', status);
    return load;
  },

  async updateState({ _id, data }) {
    console.log({ _id, data });
    const requestConfig = {
      method: 'PATCH',
      headers: { ...auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${BASE_URL}/loads/${_id}/state`,
      requestConfig
    );
    const { load, status } = await handleResponse(response);
    console.log('Response status:', status);
    return load;
  },

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

  async generatePdf(id) {
    const requestConfig = {
      method: 'POST',
      headers: {
        ...auth(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const response = await fetch(`${BASE_URL}/loads/${id}/pdf`, requestConfig);
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    const blob = await response.blob();
    const filename = `logs-load_${id}`;

    downloadBlob(blob, encodeURIComponent(filename) + '.pdf');

    return;
  },
};
