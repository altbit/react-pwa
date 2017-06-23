import AppConfig from 'AppConfig';
import axios from 'axios';
import { getToken } from './../jwt';

export const REGISTRATION_INTRO_POST = 'REGISTRATION_INTRO_POST';
export const REGISTRATION_INTRO_SUCCESS = 'REGISTRATION_INTRO_SUCCESS';
export const REGISTRATION_INTRO_FAIL = 'REGISTRATION_INTRO_FAIL';
export const REGISTRATION_COMPLETE_POST = 'REGISTRATION_COMPLETE_POST';
export const REGISTRATION_COMPLETE_SUCCESS = 'REGISTRATION_COMPLETE_SUCCESS';
export const REGISTRATION_COMPLETE_FAIL = 'REGISTRATION_COMPLETE_FAIL';

export const postIntro = (formData) => (dispatch) => {
  dispatch({
    type: REGISTRATION_INTRO_POST,
    data: formData,
  });

  return axios.post(`${AppConfig.ServerApi}/users/signup/intro`,
    formData,
    { headers: { 'Authorization': getToken() } })
    .then(({data: { data }}) => {
      dispatch({
        type: REGISTRATION_INTRO_SUCCESS,
        data,
      });
    })
    .catch((res) => {
      const { error } = (res instanceof Error) ? res.response.data : res;
      dispatch({
        type: REGISTRATION_INTRO_FAIL,
        error,
      });
    });
};

export const postComplete = (formData, userData) => (dispatch) => {
  dispatch({
    type: REGISTRATION_COMPLETE_POST,
    data: formData,
  });

  return axios.post(`${AppConfig.ServerApi}/users/signup/complete`,
    { ...formData, ...userData },
    { headers: { 'Authorization': getToken() } })
    .then(({data: { data }}) => {
      dispatch({
        type: REGISTRATION_COMPLETE_SUCCESS,
        data,
      });
    })
    .catch((res) => {
      const { error } = (res instanceof Error) ? res.response.data : res;
      dispatch({
        type: REGISTRATION_COMPLETE_FAIL,
        error,
      });
    });
};
