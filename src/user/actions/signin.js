import AppConfig from 'AppConfig';
import axios from 'axios';
import { getToken, setToken } from './../jwt';

export const SIGNIN_POST = 'SIGNIN_POST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAIL = 'SIGNIN_FAIL';
export const AUTH_USERBYTOKEN_GET = 'AUTH_USERBYTOKEN_GET';
export const AUTH_USERBYTOKEN_SUCCESS = 'AUTH_USERBYTOKEN_SUCCESS';
export const AUTH_USERBYTOKEN_FAIL = 'AUTH_USERBYTOKEN_FAIL';

export const postSignIn = (formData) => (dispatch) => {
  dispatch({
    type: SIGNIN_POST,
    data: formData,
  });

  return axios.post(`${AppConfig.ServerApi}/users/signin`,
    formData,
    { headers: { 'Authorization': getToken() } })
    .then(({data: { success, data }}) => {
      if (data.token) {
        setToken(data.token);
      }

      dispatch({
        type: SIGNIN_SUCCESS,
        success,
        data,
      });
    })
    .catch((res) => {
      const { success, error } = (res instanceof Error) ? res.response.data : res;
      dispatch({
        type: SIGNIN_FAIL,
        success,
        error,
      });
    });
};

export const getUser = () => (dispatch) => {
  dispatch({
    type: AUTH_USERBYTOKEN_GET,
  });

  return axios.get(`${AppConfig.ServerApi}/user`,
    { headers: { 'Authorization': getToken() } })
    .then(({data: { success, data }}) => {
      if (!data.user) {
        return dispatch({
          type: AUTH_USERBYTOKEN_FAIL,
          success: false,
          error: 'Wrong authorisation token',
        });
      }

      dispatch({
        type: AUTH_USERBYTOKEN_SUCCESS,
        success,
        data,
      });
    })
    .catch((res) => {
      const { success, error } = (res instanceof Error) ? res.response.data : res;
      dispatch({
        type: AUTH_USERBYTOKEN_FAIL,
        success,
        error,
      });
    });
};