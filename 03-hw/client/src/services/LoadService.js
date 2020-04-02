import { auth, handleResponse } from '../helpers';

const baseURL = 'http://localhost:8081/api';

export default {
  async getLoads() {
    const requestConfig = {
      method: 'GET',
      headers: auth(),
    };

    const response = await fetch(`${baseURL}/loads`, requestConfig);
    const { loads, status } = await handleResponse(response);
    console.log('Response status:', status);
    return loads;
  },
};
