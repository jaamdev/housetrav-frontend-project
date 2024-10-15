export const initialState = {
  authenticated: false,
  user: {},
  loading: true,
  display: {
    success: [],
    errors: [],
  },
};

export const ACTION_TYPES = {
  CHANGE_AUTH: 'CHANGE_AUTH',
  CHANGE_USER: 'CHANGE_USER',
  CHANGE_LOADING: 'CHANGE_LOADING',
  CHANGE_DISPLAY: 'CHANGE_DISPLAY',
};

const UPDATE_STATE = {
  [ACTION_TYPES.CHANGE_AUTH]: (state, { payload }) => {
    if (typeof payload !== 'boolean') {
      console.error('Invalid payload for CHANGE_AUTH: expected a boolean');
      return state;
    }
    return {
      ...state,
      authenticated: payload,
    };
  },
  [ACTION_TYPES.CHANGE_USER]: (state, { payload }) => {
    if (typeof payload !== 'object' || payload === null) {
      console.error('Invalid payload for CHANGE_USER: expected an object');
      return state;
    }
    return {
      ...state,
      user: payload,
    };
  },
  [ACTION_TYPES.CHANGE_LOADING]: (state, { payload }) => {
    if (typeof payload !== 'boolean') {
      console.error('Invalid payload for CHANGE_LOADING: expected a boolean');
      return state;
    }
    return {
      ...state,
      loading: payload,
    };
  },
  [ACTION_TYPES.CHANGE_DISPLAY]: (state, { payload }) => {
    if (typeof payload !== 'object' || payload === null) {
      console.error('Invalid payload for CHANGE_DISPLAY: expected an object');
      return state;
    }

    typeof payload.success === 'undefined' ? (payload.success = []) : null;
    typeof payload.errors === 'undefined' ? (payload.errors = []) : null;

    if (
      !Array.isArray(payload.success) ||
      !payload.success.every((item) => typeof item === 'string')
    ) {
      console.error(
        'Invalid payload for CHANGE_DISPLAY.success: expected an array of strings',
      );
      return state;
    }
    if (
      !Array.isArray(payload.errors) ||
      !payload.errors.every((item) => typeof item === 'string')
    ) {
      console.error(
        'Invalid payload for CHANGE_DISPLAY.errors: expected an array of strings',
      );
      return state;
    }
    return {
      ...state,
      display: {
        success: payload.success,
        errors: payload.errors,
      },
    };
  },
};

export const authReducer = (state, action) => {
  const { type } = action;
  const updateState = UPDATE_STATE[type];
  return updateState ? updateState(state, action) : state;
};
