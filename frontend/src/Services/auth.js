import axios from 'axios';

const baseURL = 'http://localhost:3000';
const api = axios.create({ baseURL });

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken'))}`
  }
});

export function loginUser(user) {
  return api.post('/user/login', user);
}

export function signupUser(user) {
  return api.post('/user/signup', user);
}

export function getUserDetail() {
  return api.get('/user', getAuthHeaders());
}
