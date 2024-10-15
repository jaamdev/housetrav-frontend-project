import useAuth from '#Hooks/useAuth.js';
import { useState, useEffect, useCallback } from 'react';

const backendUrl = import.meta.env.VITE_API_URL;

export default function Mod() {
  const [isLoading, setIsLoading] = useState(false);
  const { changeAuthenticated, changeDisplay } = useAuth();
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    const response = await fetch(`${backendUrl}/mod`, {
      method: 'GET',
      credentials: 'include',
    });
    const result = await response.json();
    if (result.length === 0) return;
    setUsers(result.data);
    setIsLoading(false);
    setTimeout(() => {
      changeDisplay({});
    }, 5000);
  }, [changeDisplay]);

  const changeMod = async (value, userId) => {
    const answer = confirm(value ? '¿Darle Mod?' : '¿Quitar Mod?');
    if (!answer) return;
    const response = await fetch(`${backendUrl}/mod`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ value, userId }),
    });
    const result = await response.json();
    if (!result.ok) {
      if (result.status === 401) {
        changeDisplay({ errors: ['Sesión expirada'] });
        changeAuthenticated(false);
        return;
      }
      changeDisplay({ errors: result.error });
      return;
    }
    changeDisplay({ success: result.message });
    setIsLoading(true);
  };

  const userProperties = () => {
    alert('Aún no se puede ver las propiedades');
  };

  const removeUser = async () => {
    alert('Aún no se puede eliminar usuarios');
  };

  useEffect(() => {
    getUsers();
  }, [isLoading, getUsers]);

  return (
    <main className="mod-ctn">
      {!isLoading ? (
        <>
          <h2>Usuarios</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.moderator === false)
                .map(({ id, firstName, lastName, email }) => (
                  <tr key={id}>
                    <td>
                      {firstName} {lastName}
                    </td>
                    <td>{email}</td>
                    <td className="mod-actions-ctn">
                      <button onClick={() => userProperties(id)}>
                        Inmuebles
                      </button>
                      <button onClick={() => changeMod(true, id)}>
                        Dar Mod
                      </button>
                      <button onClick={() => removeUser(id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h2>Moderadores</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.moderator === true)
                .map(({ id, firstName, lastName, email }) => (
                  <tr key={id}>
                    <td>
                      {firstName} {lastName}
                    </td>
                    <td>{email}</td>
                    <td className="mod-actions-ctn">
                      <button onClick={() => userProperties(id)}>
                        Inmuebles
                      </button>
                      <button onClick={() => changeMod(false, id)}>
                        Quitar Mod
                      </button>
                      <button onClick={() => removeUser(id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <h2 className="loading-ctn">Cargando</h2>
      )}
    </main>
  );
}
