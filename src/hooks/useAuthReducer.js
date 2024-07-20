import { useReducer, useCallback } from 'react';
import { ACTION_TYPES, initialState, authReducer } from '#Reducers/auth.js';

export default function useAuthReducer() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const changeAuthenticated = useCallback((payload) => {
    dispatch({
      type: ACTION_TYPES.CHANGE_AUTH,
      payload,
    });
  }, []);

  const changeUser = useCallback((payload) => {
    dispatch({
      type: ACTION_TYPES.CHANGE_USER,
      payload,
    });
  }, []);

  const changeLoading = useCallback((payload) => {
    dispatch({
      type: ACTION_TYPES.CHANGE_LOADING,
      payload,
    });
  }, []);

  const changeDisplay = useCallback((payload) => {
    dispatch({
      type: ACTION_TYPES.CHANGE_DISPLAY,
      payload,
    });
  }, []);

  return {
    state,
    changeAuthenticated,
    changeUser,
    changeLoading,
    changeDisplay,
  };
}
