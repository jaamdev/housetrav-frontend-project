import { useState } from 'react';
import useAuth from '#Hooks/useAuth.js';
import { createProperty } from '#Services/api.js';
import FormNewProperty from '#Components/FormNewProperty.jsx';

function PropertyAdded({ titleProperty, isLoading, setSuccess }) {
  const title =
    titleProperty.length > 20
      ? titleProperty.split(' ', 3).join(' ') + '...'
      : titleProperty;

  return (
    <div className="property-added-ctn">
      <h2>¡{title} añadida correctamente!</h2>
      <button disabled={isLoading} onClick={() => setSuccess(false)}>
        Añadir otra propiedad
      </button>
    </div>
  );
}

export default function NewProperty() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [titleProperty, setTitleProperty] = useState('');
  const { changeAuthenticated, changeDisplay } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.elements.title.value === '') return;
    else setTitleProperty(form.elements.title.value);
    setIsLoading(true);
    const formData = new FormData(form);
    const fields = {};
    formData.forEach((value, key) => {
      const input = form.elements[key];
      if (input.type === 'checkbox' && input.checked) {
        fields[key] = true;
      } else if (input.type === 'number') {
        fields[key] = Number(value);
      } else {
        fields[key] = value;
      }
    });

    const response = await createProperty(fields);
    if (!response.ok) {
      globalThis.scrollTo(0, 0);
      changeDisplay({ errors: response.error });
      setIsLoading(false);
      if (response.status === 401) {
        changeDisplay({ errors: ['Sesión expirada'] });
        changeAuthenticated(false);
      }
      return;
    }

    globalThis.scrollTo(0, 0);
    changeDisplay({});
    setIsLoading(false);
    setSuccess(true);
  };

  return (
    <main className="new-property-ctn">
      {success ? (
        <PropertyAdded
          titleProperty={titleProperty}
          isLoading={isLoading}
          setSuccess={setSuccess}
        />
      ) : (
        <FormNewProperty handleSubmit={handleSubmit} isLoading={isLoading} />
      )}
    </main>
  );
}
