import { SelectCountry } from './SelectComponents.jsx';

export default function FormUser({ loading, ...props }) {
  const typeForm = window.location.pathname.split('/').filter(Boolean)[0];

  if (typeForm === 'signup') {
    return (
      <form {...props} className="user-form" autoComplete="off">
        <input
          name="firstName"
          // defaultValue="Test"
          type="text"
          required
          placeholder="Nombre"
        />
        <input
          name="lastName"
          // defaultValue="Test"
          type="text"
          required
          placeholder="Apellidos"
        />
        <input
          name="address"
          // defaultValue="Calle Falsa"
          type="text"
          required
          placeholder="Dirección"
        />
        <input
          name="city"
          // defaultValue="Madrid"
          type="text"
          required
          placeholder="Población"
        />
        <SelectCountry name="country" />
        <input
          name="postal"
          // defaultValue="80080"
          type="number"
          min="0"
          required
          placeholder="Código postal"
        />
        <input
          name="phone"
          // defaultValue="123456789"
          type="number"
          min="0"
          required
          placeholder="Teléfono"
        />
        <input
          name="email"
          // defaultValue="test@test.com"
          type="email"
          required
          placeholder="Correo electrónico"
        />
        <input
          name="password"
          // defaultValue="12345678"
          type="password"
          required
          placeholder="Contraseña"
        />
        <input
          name="passwordTwo"
          // defaultValue="12345678"
          type="password"
          required
          placeholder="Repite tu contraseña"
        />
        <input
          disabled={loading}
          type="submit"
          value={loading ? 'Registrando...' : 'Registrarse'}
        />
      </form>
    );
  } else if (typeForm === 'signin') {
    return (
      <form {...props} className="user-form" autoComplete="off">
        <input
          required
          name="email"
          // defaultValue="test@test.com"
          type="email"
          placeholder="Correo electrónico"
        />
        <input
          required
          name="password"
          // defaultValue="12345678"
          type="password"
          placeholder="Contraseña"
        />
        <input
          disabled={loading}
          type="submit"
          value={loading ? 'Iniciando sesión' : 'Iniciar sesión'}
        />
      </form>
    );
  } else {
    console.error('Form necesita estar en la dirección "signup" o "signin".');
  }
  return null;
}
