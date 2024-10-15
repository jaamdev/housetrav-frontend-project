import { useContext } from 'react';
import { AuthContext } from '#Contexts/auth.jsx';

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useContext debe estar dentro de AuthProvider');
  }

  return context;
}
