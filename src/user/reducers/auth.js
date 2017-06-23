import { SIGNIN_POST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT_SUCCESS,
  AUTH_USERBYTOKEN_GET,
  AUTH_USERBYTOKEN_SUCCESS,
  AUTH_USERBYTOKEN_FAIL } from './../actions/signin';

const initialState = {
  isSubmitting: false,
  isAuthorised: false,
  user: null,
  error: null,
};

const reducers = (state = initialState, actionData = null) => {
  switch (actionData.type) {
    case SIGNIN_POST:
      return {
        ...state,
        isSubmitting: true,
        isAuthorised: false,
        user: null,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: actionData.data.user,
        isSubmitting: false,
        isAuthorised: true,
        error: null,
      };

    case SIGNIN_FAIL:
      return {
        ...state,
        isSubmitting: false,
        isAuthorised: false,
        user: null,
        error: Object.assign({}, state.error, actionData.error),
      };

    case SIGNOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isSubmitting: false,
        isAuthorised: false,
        error: null,
      };

    case AUTH_USERBYTOKEN_GET:
      return {
        ...state,
        isSubmitting: true,
        isAuthorised: false,
        user: null,
      };

    case AUTH_USERBYTOKEN_SUCCESS:
      return {
        ...state,
        user: actionData.data.user,
        isSubmitting: false,
        isAuthorised: true,
        error: null,
      };

    case AUTH_USERBYTOKEN_FAIL:
      return {
        ...state,
        isSubmitting: false,
        isAuthorised: false,
        user: null,
        error: Object.assign({}, state.error, actionData.error),
      };

    default:
      return state;
  }
};

export default reducers;
