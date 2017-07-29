import AppConfig from 'AppConfig';
import axios from 'axios';
import { getToken, setToken } from './../../user/jwt';

const headers = () => {
  const token = getToken();
  if (token && token.length > 16) {
    return { headers: { 'Authorization': getToken() } };
  }
  return {};
};

const handleSuccess = (response) => {
  if (!response || !response.data || (response.code > 300)) {
    throw new Error('Wrong HTTP response');
  }
  if (!response.data.data) {
    throw new Error('Wrong API response');
  }

  return response.data.data;
};

const handleFail = (res) => {
  let error = { message: 'API error' };

  if (res instanceof Error) {
    error = (res.response && res.response.data && res.response.data.error)
      ? res.response.data.error
      : { message: res.message };
  }

  if (res && res.error) {
    error = res.error;
  }

  throw error;
};

export const getRequest = (url) => {
  return axios.get(`${AppConfig.ServerApi}/${url}`, headers())
    .then(handleSuccess)
    .catch(handleFail);
};

export const postRequest = (url, data) => {
  return axios.post(`${AppConfig.ServerApi}/${url}`, data, headers())
    .then(handleSuccess)
    .catch(handleFail);
};

export const deleteRequest = (url) => {
  return axios.delete(`${AppConfig.ServerApi}/${url}`, headers())
    .then(handleSuccess)
    .catch(handleFail);
};

export const putRequest = (url, data) => {
  return axios.put(`${AppConfig.ServerApi}/${url}`, data, headers())
    .then(handleSuccess)
    .catch(handleFail);
};