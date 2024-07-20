import { useEffect } from 'react';
import { logout } from '#Services/api.js';
import useAuth from '#Hooks/useAuth.js';

export default function Logout() {
  const { changeAuthenticated, changeUser, changeDisplay } = useAuth();

  useEffect(() => {
    const closeSession = async () => {
      const response = await logout();
      changeDisplay({ success: response?.message });
      changeUser({});
      changeAuthenticated(false);
    };
    closeSession();
  }, [changeAuthenticated, changeUser, changeDisplay]);

  return <h2>Cerrar la sesión</h2>;
}
