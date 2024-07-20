import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '#Hooks/useAuth.js';
import FormUser from '#Components/FormUser.jsx';
import { login } from '#Services/api.js';

export default function Login() {
  const {
    state: { authenticated, loading },
    changeAuthenticated,
    changeUser,
    changeDisplay,
  } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));

    const response = await login(fields);
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
    <main className="login-ctn">
      <h2>Iniciar sesión</h2>
      <FormUser loading={loading} onSubmit={handleSubmit} />
      <h3>¿No tienes una cuenta?</h3>
      <Link to="/signup">Crear cuenta</Link>
    </main>
  );
}
