import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '#Services/api.js';
import useAuth from '#Hooks/useAuth.js';
import FormUser from '#Components/FormUser.jsx';

export default function Register() {
  const navigate = useNavigate();
  const {
    state: { authenticated, loading },
    changeAuthenticated,
    changeUser,
    changeDisplay,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));

    if (fields.password !== fields.passwordTwo) {
      changeDisplay({ errors: ['La contraseña no es la misma'] });
      return;
    }

    const response = await register(fields);
    if (!response.ok) {
      changeDisplay({ errors: response.error });
      return;
    }

    changeUser(response.data[0]);
    changeDisplay({ success: response.message });
    changeAuthenticated(true);
  };

  useEffect(() => {
    if (authenticated) {
      navigate('/profile', { replace: true });
    }
  }, [authenticated, navigate]);

  return (
    <main className="register-ctn">
      <h2>Crear cuenta</h2>
      <FormUser loading={loading} onSubmit={handleSubmit} />
    </main>
  );
}
