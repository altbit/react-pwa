import { REGISTRATION_INTRO_POST,
  REGISTRATION_INTRO_SUCCESS,
  REGISTRATION_INTRO_FAIL,
  REGISTRATION_COMPLETE_POST,
  REGISTRATION_COMPLETE_SUCCESS,
  REGISTRATION_COMPLETE_FAIL } from './../actions/registration';

const initialState = {
  isSubmitting: false,
  introSubmitted: false,
  completeSubmitted: false,
  userData: null,
  error: null,
};

const reducers = (state = initialState, actionData = null) => {
  switch (actionData.type) {
    case REGISTRATION_INTRO_POST:
      return {
        ...state,
        isSubmitting: true,
        introSubmitted: false,
      };

    case REGISTRATION_INTRO_SUCCESS:
      return {
        ...state,
        userData: actionData.data.user,
        isSubmitting: false,
        introSubmitted: true,
        error: null,
      };

    case REGISTRATION_INTRO_FAIL:
      return {
        ...state,
        isSubmitting: false,
        introSubmitted: false,
        error: Object.assign({}, state.error, actionData.error),
      };

    case REGISTRATION_COMPLETE_POST:
      return {
        ...state,
        isSubmitting: true,
        completeSubmitted: false,
      };

    case REGISTRATION_COMPLETE_SUCCESS:
      return {
        ...state,
        userData: actionData.data.user,
        isSubmitting: false,
        completeSubmitted: true,
        error: null,
      };

    case REGISTRATION_COMPLETE_FAIL:
      return {
        ...state,
        isSubmitting: false,
        completeSubmitted: false,
        error: Object.assign({}, state.error, actionData.error),
      };

    default:
      return state;
  }
};

export default reducers;
