import { handleResponse } from '../helpers';
import { BASE_URL } from '../globals';

const service = {
  async getInfo(data) {
    const requestConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(`${BASE_URL}/weather`, requestConfig);
    const { weatherData, status } = await handleResponse(response);
    console.log('Response status:', status);
    return weatherData;
  },
};

export default service;
