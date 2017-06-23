import AppConfig from 'AppConfig';
import axios from 'axios';
import { getToken, setToken } from './../jwt';

export const SIGNIN_POST = 'SIGNIN_POST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAIL = 'SIGNIN_FAIL';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const AUTH_USERBYTOKEN_GET = 'AUTH_USERBYTOKEN_GET';
export const AUTH_USERBYTOKEN_SUCCESS = 'AUTH_USERBYTOKEN_SUCCESS';
export const AUTH_USERBYTOKEN_FAIL = 'AUTH_USERBYTOKEN_FAIL';

export const postSignIn = (formData) => (dispatch) => {
  dispatch({
    type: SIGNIN_POST,
    data: formData,
  });

  return axios.post(`${AppConfig.ServerApi}/users/signin`,
    formData)
    .then(({data: { data }}) => {
      if (!data.token) {
        return dispatch({
          type: SIGNIN_FAIL,
          error: 'No authorisation token',
        });
      }

      setToken(data.token);
      dispatch({
        type: SIGNIN_SUCCESS,
        data,
      });
    })
    .catch((res) => {
      const { error } = (res instanceof Error) ? res.response.data : res;
      dispatch({
        type: SIGNIN_FAIL,
        error,
      });
    });
};

export const signOut = () => (dispatch) => {
  setToken(null);

  dispatch({
    type: SIGNOUT_SUCCESS,
  });
};

export const getUser = () => (dispatch) => {
  dispatch({
    type: AUTH_USERBYTOKEN_GET,
  });

  return axios.get(`${AppConfig.ServerApi}/user`,
    { headers: { 'Authorization': getToken() } })
    .then(({data: { data }}) => {
      if (!data.user) {
        // If we cannot get user with current token - reset token to sign in again
        setToken(null);

        return dispatch({
          type: AUTH_USERBYTOKEN_FAIL,
          error: 'Wrong authorisation token',
        });
      }

      dispatch({
        type: AUTH_USERBYTOKEN_SUCCESS,
        data,
      });
    })
    .catch((res) => {
      const { error } = (res instanceof Error) ? res.response.data : res;

      // If we cannot get user with current token - reset token to sign in again
      setToken(null);

      dispatch({
        type: AUTH_USERBYTOKEN_FAIL,
        error,
      });
    });
};