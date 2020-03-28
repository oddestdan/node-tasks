import { auth, handleResponse } from '../helpers';

const baseURL = 'http://localhost:8081/api';

export default {
  async getAssigned(id) {
    const requestConfig = {
      method: 'GET',
      headers: auth(),
    };

    const response = await fetch(`${baseURL}/loads`, requestConfig);
    return handleResponse(response);
  },
};
