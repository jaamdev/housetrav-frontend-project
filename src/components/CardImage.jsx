import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPropertyImages } from '#Services/api.js';
import { ImageNotFound } from './Icons.jsx';

const backendUrl = import.meta.env.VITE_API_URL;

export default function CardImage({ propertyId }) {
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  const changeImage = (conditions = true) => {
    setLoaded(false);
    setTimeout(() => {
      const selectedIndex = conditions
        ? index < images.length - 1
          ? index + 1
          : 0
        : index > 0
          ? index - 1
          : images.length - 1;
      setIndex(selectedIndex);
    }, 300);
  };

  const fetchImages = async (propertyId) => {
    const result = await getPropertyImages(propertyId);
    if (!result.ok || result.data.length === 0) return;
    setImages(result.data.map((url) => `${backendUrl}/images/${url}`));
  };

  useEffect(() => {
    fetchImages(propertyId);
  }, [propertyId]);

  return (
    <div className="card-image-ctn">
      {images.length !== 0 ? (
        <>
          {images.length <= 1 ? null : (
            <button onClick={() => changeImage(false)}>{'<'}</button>
          )}
          <Link to={`/properties/${propertyId}`}>
            <img
              className={loaded ? 'loaded' : ''}
              src={images[index]}
              alt="Vista previa del inmueble"
              onLoad={() => setLoaded(true)}
            />
          </Link>
          {images.length <= 1 ? null : (
            <button onClick={() => changeImage()}>{'>'}</button>
          )}
        </>
      ) : (
        <Link to={`/properties/${propertyId}`}>
          <ImageNotFound />
        </Link>
      )}
    </div>
  );
}
