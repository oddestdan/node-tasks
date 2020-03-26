import { auth } from '../helpers';

const baseURL = 'http://localhost:8081/api';

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export default {
  login(username, password) {
    const requestConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    console.log(requestConfig);

    return fetch(`${baseURL}/login`, requestConfig)
      .then(handleResponse)
      .then(user => {
        // login successful if there's a jwt token in the response
        if (user.token) {
          // store user details and jwt token in local storage
          // to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
        }

        return user;
      });
  },

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
  },

  register(user) {
    // registerUser
    const requestConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };

    console.log(requestConfig);

    return fetch(`${baseURL}/register`, requestConfig).then(handleResponse);
  },

  async getAll() {
    const requestConfig = {
      method: 'GET',
      headers: auth(),
    };

    console.dir(requestConfig);

    const response = await fetch(`${baseURL}/users`, requestConfig);
    return handleResponse(response);
  },

  getById(id) {
    const requestConfig = {
      method: 'GET',
      headers: auth(),
    };

    return fetch(`${baseURL}/users/${id}`, requestConfig).then(handleResponse);
  },

  update(user) {
    const requestConfig = {
      method: 'PUT',
      headers: { ...auth(), 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };

    return fetch(`${baseURL}/users/${user.id}`, requestConfig).then(
      handleResponse
    );
  },

  // underscore prefixed because delete is a reserved word in JS
  _delete(id) {
    const requestConfig = {
      method: 'DELETE',
      headers: auth(),
    };

    return fetch(`${baseURL}/users/${id}`, requestConfig).then(handleResponse);
  },
};
