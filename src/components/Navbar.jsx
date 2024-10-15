import { NavLink } from 'react-router-dom';
import useAuth from '#Hooks/useAuth.js';

export default function Navbar() {
  const {
    state: {
      authenticated,
      user: { moderator },
    },
  } = useAuth();

  return (
    <nav className="navigation-ctn">
      <ul>
        <NavLink to="/">Inicio</NavLink>
        {authenticated && (
          <NavLink end to="/profile">
            Perfil
          </NavLink>
        )}
        {authenticated && moderator && (
          <NavLink to="/moderator">Moderación</NavLink>
        )}
        {authenticated && (
          <NavLink to="/profile/properties/new">Publica un anuncio</NavLink>
        )}
        {!authenticated && <NavLink to="/signin">Iniciar sesión</NavLink>}
        {authenticated && <NavLink to="/logout">Cerrar sesión</NavLink>}
      </ul>
    </nav>
  );
}
