import { SIGNIN_POST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL } from './../actions/signin';

const initialState = {
  isSubmitting: false,
  authorised: false,
  user: null,
  error: null,
};

const reducers = (state = initialState, actionData = null) => {
  switch (actionData.type) {
    case SIGNIN_POST:
      return {
        ...state,
        success: actionData.success,
        isSubmitting: true,
        authorised: false,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        success: actionData.success,
        user: actionData.data,
        isSubmitting: false,
        authorised: true,
        error: null,
      };

    case SIGNIN_FAIL:
      return {
        ...state,
        success: actionData.success,
        isSubmitting: false,
        authorised: false,
        error: Object.assign({}, state.error, actionData.error),
      };

    default:
      return state;
  }
};

export default reducers;
