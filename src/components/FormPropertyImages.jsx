import { useState, useEffect } from 'react';
import {
  getPropertyImages,
  postPropertyImages,
  deletePropertyImages,
} from '#Services/api';

const backendUrl = import.meta.env.VITE_API_URL;

export default function FormPropertyImages({
  propertyId,
  changeDisplay,
  changeAuthenticated,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesList, setImagesList] = useState([]);
  const [previewList, setPreviewList] = useState([]);

  const onChangeImage = (e) => {
    previewList.forEach((url) => URL.revokeObjectURL(url));
    if (e.target.files.length === 0) {
      setPreviewList([]);
      return;
    }

    const newState = [];
    const newError = [];
    for (const value of Object.values(e.target.files)) {
      newState.push(URL.createObjectURL(value));
      if (value.size > 1024 * 1024 * 3) {
        newError.push(`${value.name} supera los 3MB.`);
      }
    }
    if (newError.length !== 0) {
      changeDisplay({ errors: newError });
    }
    changeDisplay({});
    setPreviewList(newState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (e.target.elements.file.value === '') return;
    setIsLoading(true);

    const response = await postPropertyImages(propertyId, formData);
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

    changeDisplay({ success: response.message });
    setPreviewList([]);
    loadImages(propertyId);
  };

  const removeImage = async (fileName) => {
    const result = await deletePropertyImages(propertyId, fileName);
    if (!result.ok) return;
    const newState = imagesList.filter((img) => img !== fileName);
    changeDisplay({ success: result.message });
    setImagesList(newState);
  };

  const loadImages = async (propertyId) => {
    if (propertyId === '') return;
    const response = await getPropertyImages(propertyId);
    if (response.data.length !== 0) {
      setImagesList(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadImages(propertyId);
  }, [propertyId]);

  useEffect(() => {
    return () => {
      previewList.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewList]);

  return (
    <div className="form-property-images-ctn">
      {isLoading || imagesList.length === 0 ? (
        <div className="form-saved-images">
          <h2>
            {isLoading ? 'Cargando...' : 'Este inmueble no tiene imágenes'}
          </h2>
        </div>
      ) : (
        <div className="form-saved-images">
          <h2>Imágenes cargadas: {imagesList.length} de 30</h2>
          <ul>
            {imagesList.map((fileName) => (
              <li key={fileName}>
                <img src={`${backendUrl}/images/${fileName}`} alt="" />
                <button onClick={() => removeImage(fileName)}>Borrar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form
        className="form-property-images"
        onSubmit={handleSubmit}
        autoComplete="off"
        encType="multipart/form-data"
      >
        <label htmlFor="file">Seleccionar imágenes</label>
        <input
          name="file"
          id="file"
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          onChange={onChangeImage}
          multiple
        />
        <input
          type="submit"
          value={isLoading ? 'Subiendo...' : 'Subir'}
          disabled={isLoading || previewList.length > 30 - imagesList.length}
        />
      </form>
      {previewList.length === 0 ? null : (
        <div className="form-preview-images">
          <div>
            <h2>
              Imágenes seleccionadas: {previewList.length} de{' '}
              {30 - imagesList.length}
            </h2>
            <ul>
              {previewList.map((image, idx) => (
                <img key={idx} src={image} alt="Vista previa" />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
