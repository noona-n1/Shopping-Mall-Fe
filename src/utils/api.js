import axios from 'axios';
const baseURL = import.meta.env.VITE_APP_API_BASE_URL
  ? `${import.meta.env.VITE_APP_API_BASE_URL}/api`
  : `http://localhost:5001/api`;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${sessionStorage.getItem('token')}`
  }
});
api.interceptors.request.use(
  (request) => {
    console.log('Starting Request', request);
    request.headers.authorization = `Bearer ${sessionStorage.getItem('token')}`;
    return request;
  },
  function (error) {
    console.log('REQUEST ERROR', error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log('RESPONSE ERROR', error);
    return Promise.reject(error);
  }
);

export default api;
