import AppConfig from 'AppConfig';
import axios from 'axios';
import { getToken } from './../jwt';

export const SIGNIN_POST = 'SIGNIN_POST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAIL = 'SIGNIN_FAIL';

export const postSignIn = (formData) => (dispatch) => {
  dispatch({
    type: SIGNIN_POST,
    data: formData,
  });

  return axios.post(`${AppConfig.ServerApi}/users/signin`,
    formData,
    { headers: { 'Authorization': getToken() } })
    .then(({data: { success, data }}) => {
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