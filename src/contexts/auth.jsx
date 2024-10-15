import { createContext, useEffect, useCallback } from 'react';
import useAuthReducer from '#Hooks/useAuthReducer.js';
import { verifyUser } from '#Services/api.js';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const {
    state,
    changeAuthenticated,
    changeUser,
    changeLoading,
    changeDisplay,
  } = useAuthReducer();

  const getProfile = useCallback(async () => {
    try {
      changeLoading(true);
      const result = await verifyUser();
      if (!result.ok) {
        throw new Error('Usuario no verificado');
      }
      changeUser(result.data[0]);
      changeAuthenticated(true);
    } catch (error) {
      console.error(error.message);
      changeAuthenticated(false);
      changeUser({});
    } finally {
      changeDisplay({});
      changeLoading(false);
    }
  }, [changeAuthenticated, changeUser, changeLoading, changeDisplay]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <AuthContext.Provider
      value={{
        state: state,
        changeAuthenticated,
        changeUser,
        changeLoading,
        changeDisplay,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
