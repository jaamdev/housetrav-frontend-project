import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '#Hooks/useAuth.js';
import { getPropertyId, updateProperty } from '#Services/api.js';
import FormUpdateProperty from '#Components/FormUpdateProperty.jsx';
import FormPropertyImages from '#Components/FormPropertyImages.jsx';

export default function EditProperty() {
  const { id } = useParams();
  const { changeAuthenticated, changeDisplay } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [toggleForm, setToggleForm] = useState(true);
  const [unauthorized, setUnauthorized] = useState(0);
  const [propertyValues, setPropertyValues] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.elements.title.value === '') return;
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

    const response = await updateProperty({ id, property: fields });
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
    changeDisplay({ success: response.message });
    setIsLoading(false);
  };

  useEffect(() => {
    const loadDataProperty = async (id) => {
      setIsLoadingData(true);
      const response = await getPropertyId(id);
      if (!response.ok) {
        globalThis.scrollTo(0, 0);
        changeDisplay({ errors: response.error });
        if (response.status === 401) {
          changeDisplay({ errors: ['Sesión expirada'] });
          changeAuthenticated(false);
        }
        if (response.status >= 403) {
          setUnauthorized(response.status);
        }
        setIsLoadingData(false);
        return;
      }

      globalThis.scrollTo(0, 0);
      changeDisplay({});
      setPropertyValues(response.data);
      setIsLoadingData(false);
    };
    loadDataProperty(id);
  }, [id, changeAuthenticated, changeDisplay]);

  return (
    <main className="edit-property-ctn">
      {unauthorized > 0 ? (
        <img src={`/${unauthorized}.jpg`} alt="Gato haciendo de las suyas" />
      ) : (
        <>
          <div className="edit-form-button">
            <button
              className={toggleForm ? 'active' : ''}
              onClick={() => setToggleForm(true)}
            >
              Inmueble
            </button>
            <button
              className={!toggleForm ? 'active' : ''}
              onClick={() => setToggleForm(false)}
            >
              Imágenes
            </button>
          </div>
          {!toggleForm ? (
            <FormPropertyImages
              propertyId={id}
              changeDisplay={changeDisplay}
              changeAuthenticated={changeAuthenticated}
            />
          ) : null}
          {toggleForm ? (
            <FormUpdateProperty
              isLoading={isLoading}
              isLoadingData={isLoadingData}
              handleSubmit={handleSubmit}
              propertyValues={propertyValues}
              setPropertyValues={setPropertyValues}
            />
          ) : null}
        </>
      )}
    </main>
  );
}
