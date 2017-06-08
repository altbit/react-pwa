import { REGISTRATION_INTRO_POST,
  REGISTRATION_INTRO_SUCCESS,
  REGISTRATION_INTRO_FAIL } from './../actions/registration';

const initialState = {
  isSubmitting: false,
  data: null,
  error: null,
};

const reducers = (state = initialState, actionData = null) => {
  switch (actionData.type) {
    case REGISTRATION_INTRO_POST:
      const data = Object.assign({}, state.data, actionData.data);
      return {
        ...state,
        success: actionData.success,
        isSubmitting: true,
        data,
      };

    case REGISTRATION_INTRO_SUCCESS:
      return {
        ...state,
        success: actionData.success,
        isSubmitting: false,
      };

    case REGISTRATION_INTRO_FAIL:
      const error = Object.assign({}, state.error, actionData.error);
      return {
        ...state,
        success: actionData.success,
        isSubmitting: false,
        error,
      };

    default:
      return state;
  }
};

export default reducers;
