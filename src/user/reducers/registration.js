import { REGISTRATION_INTRO_POST,
  REGISTRATION_INTRO_SUCCESS,
  REGISTRATION_INTRO_FAIL } from './../actions/registration';

const initialState = {
  isSubmitting: false,
  introSubmitted: false,
  error: null,
};

const reducers = (state = initialState, actionData = null) => {
  switch (actionData.type) {
    case REGISTRATION_INTRO_POST:
      return {
        ...state,
        success: actionData.success,
        isSubmitting: true,
        introSubmitted: false,
      };

    case REGISTRATION_INTRO_SUCCESS:
      return {
        ...state,
        success: actionData.success,
        isSubmitting: false,
        introSubmitted: true,
        error: null,
      };

    case REGISTRATION_INTRO_FAIL:
      const error = Object.assign({}, state.error, actionData.error);
      return {
        ...state,
        success: actionData.success,
        isSubmitting: false,
        introSubmitted: false,
        error,
      };

    default:
      return state;
  }
};

export default reducers;
