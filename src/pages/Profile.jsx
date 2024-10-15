import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '#Hooks/useAuth.js';
import { ImageNotFound } from '#Components/Icons.jsx';
import {
  getUserProperties,
  removeProperty,
  uploadAvatar,
  removeUser,
} from '#Services/api.js';

const backendUrl = import.meta.env.VITE_API_URL + '/avatars/';

export default function Profile() {
  const {
    state: {
      user: {
        id,
        firstName,
        lastName,
        address,
        city,
        country,
        postal,
        phone,
        email,
        moderator,
      },
    },
    changeAuthenticated,
    changeDisplay,
    changeUser,
  } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [properties, setProperties] = useState([]);
  const [urlAvatar, setUrlAvatar] = useState(
    `${backendUrl}${id}.webp` + '?' + Date.now(),
  );
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    if (fields.file.name === '') return;
    setIsLoading(true);

    const formData = new FormData();
    for (const name in fields) {
      formData.append(name, fields[name]);
    }

    const response = await uploadAvatar(formData);
    if (!response.ok) {
      if (response.status === 401) {
        changeDisplay({ errors: ['Sesión expirada'] });
        changeAuthenticated(false);
        return;
      }
      changeDisplay({ errors: response.error });
      setIsLoading(false);
      return;
    }

    setUrlAvatar(`${backendUrl}${id}.webp` + '?' + Date.now());

    changeDisplay({ success: response.message });
    setIsLoading(false);
  };

  const removeProfile = async () => {
    const confirmation = confirm('¿Eliminar su cuenta?');
    if (!confirmation) return;
    setIsDeleting(true);
    const response = await removeUser();
    if (!response.ok) {
      changeDisplay({ errors: response.error });
      setIsDeleting(false);
      if (response.status === 401) {
        changeDisplay({ errors: ['Sesión expirada'] });
        changeAuthenticated(false);
      }
      return;
    }
    changeDisplay({ success: response.message });
    setIsDeleting(false);
    changeUser({});
    changeAuthenticated(false);
  };

  const removeProperties = async (id) => {
    setIsDeleting(true);
    const response = await removeProperty(id);
    if (!response.ok) {
      changeDisplay({ errors: response.error });
      setIsDeleting(false);
      if (response.status === 401) {
        changeDisplay({ errors: ['Sesión expirada'] });
        changeAuthenticated(false);
      }
      return;
    }
    const newState = structuredClone(properties);
    const newProperties = newState.filter((property) => property.id !== id);
    changeDisplay({ success: response.message });
    setProperties(newProperties);
    setIsDeleting(false);
  };

  const getProperties = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getUserProperties();
      if (!response.ok) {
        if (response.status === 401) {
          changeDisplay({ errors: ['Sesión expirada'] });
          changeAuthenticated(false);
        }
        return;
      }
      setProperties(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [changeAuthenticated, changeDisplay]);

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  return (
    <main className="profile-ctn">
      {isLoading ? (
        <h2 className="loading-ctn">Cargando...</h2>
      ) : (
        <>
          <h2>Mi perfil</h2>
          <div>
            <div>
              {urlAvatar ? (
                <img src={urlAvatar} alt="" onError={() => setUrlAvatar('')} />
              ) : (
                <ImageNotFound />
              )}
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                encType="multipart/form-data"
              >
                <label htmlFor="file">Cambiar avatar</label>
                <input
                  name="file"
                  id="file"
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                />
                <input type="submit" value="Enviar" disabled={isLoading} />
              </form>
            </div>
            <ul>
              {moderator === true ? <li>ID: {id}</li> : null}
              <li>
                Nombre: {firstName} {lastName}
              </li>
              <li>Dirección: {address}</li>
              <li>Ciudad: {city}</li>
              <li>País: {country}</li>
              <li>Código postal: {postal}</li>
              <li>Teléfono: {phone}</li>
              <li>Correo electrónico: {email}</li>
              {moderator === true ? <li>Moderador: Sí</li> : null}
              <button
                className="del-user-btn"
                disabled={isDeleting}
                onClick={removeProfile}
              >
                Borrar mi cuenta
              </button>
            </ul>
          </div>
          <h2>Mis anuncios</h2>
          <ul>
            {properties.length > 0 ? (
              properties?.map(({ id, title, sellPrice, rentPrice }) => (
                <li key={id}>
                  <h3>Nombre: {title}</h3>
                  {sellPrice !== 0 ? (
                    <h4>Venta: {sellPrice.toLocaleString('es-ES')} €</h4>
                  ) : null}
                  {rentPrice !== 0 ? (
                    <h4>Alquiler: {rentPrice.toLocaleString('es-ES')} €/mes</h4>
                  ) : null}
                  <button
                    disabled={isDeleting}
                    onClick={() => navigate(`/profile/properties/edit/${id}`)}
                  >
                    Editar
                  </button>
                  <button
                    disabled={isDeleting}
                    onClick={() => removeProperties(id)}
                  >
                    Borrar
                  </button>
                </li>
              ))
            ) : (
              <li>
                <h3>No tienes inmuebles anunciados</h3>
              </li>
            )}
          </ul>
        </>
      )}
    </main>
  );
}
