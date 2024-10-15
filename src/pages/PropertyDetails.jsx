import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '#Hooks/useAuth.js';
import { getPortalPropertyId } from '#Services/api.js';
import { ImageNotFound } from '#Components/Icons.jsx';
import {
  Pool,
  Address,
  Parking,
  PropertyType,
  EnergyCertificate,
  PropertyCondition,
  ConditionsSpecials,
} from '#Components/SwitchesComponents.jsx';

const backendUrl = import.meta.env.VITE_API_URL;

const ShowImage = ({ showImageRef, handleModal, imgUrl }) => {
  const [loaded, setLoaded] = useState(false);
  const [images] = useState(imgUrl);
  const [index, setIndex] = useState(0);

  const changeImage = (e, conditions = true) => {
    e.stopPropagation();
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

  return (
    <div ref={showImageRef} className="images-modal" onClick={handleModal}>
      <button onClick={(e) => changeImage(e, false)}>{`<`}</button>
      <img
        className={loaded ? 'loaded' : ''}
        src={`${backendUrl}/images/${images[index]}`}
        alt=""
        onLoad={() => setLoaded(true)}
      />
      <button onClick={(e) => changeImage(e)}>{`>`}</button>
    </div>
  );
};

const ShowContact = ({ authenticated, userId, firstName, email, phone }) => {
  const [showAvatar, setShowAvatar] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const urlAvatar = backendUrl + `/avatars/${userId}.webp`;

  return (
    <div className="contact">
      {showAvatar && (
        <img src={urlAvatar} alt="" onError={() => setShowAvatar(false)} />
      )}
      <h2>{firstName}</h2>
      {showPhone ? (
        <>
          <h3>Teléfono: {phone}</h3>
          <h3>Email: {email}</h3>
        </>
      ) : null}
      {authenticated ? (
        !showPhone ? (
          <button onClick={() => setShowPhone(true)}>Ver contacto</button>
        ) : null
      ) : (
        <h4>Iniciar sesión para ver el contacto</h4>
      )}
    </div>
  );
};

export default function PropertyDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState([]);
  const {
    state: { authenticated },
  } = useAuth();
  const { id } = useParams();
  const showImageRef = useRef();

  const getProperty = async (id) => {
    setIsLoading(true);
    try {
      const response = await getPortalPropertyId(id);
      if (!response.ok) throw new Error('Error en la carga de datos');
      setProperty(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModal = () => {
    const showModal = showImageRef.current;
    showModal.classList.toggle('active');
  };

  useEffect(() => {
    getProperty(id);
  }, [id]);

  return (
    <main className="property-main-details-ctn">
      {isLoading ? (
        <h2 className="loading-ctn">Cargando...</h2>
      ) : property.length > 0 ? (
        property.map(
          ({
            id,
            pool,
            title,
            rooms,
            baths,
            region,
            country,
            address,
            parking,
            elevator,
            userId,
            firstName,
            phone,
            email,
            images,
            sellPrice,
            rentPrice,
            updatedAt,
            description,
            propertyType,
            propertySize,
            propertyCondition,
            energyCertificate,
            conditionsSpecials,
            propertyHideAddress,
            propertySizeTerrain,
          }) => {
            const date = new Date(updatedAt);
            const formattedDate = date.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            let imageMain = [];
            let imagesUrl = [];
            if (images !== undefined && images.length !== 0) {
              imagesUrl = [].concat(images);
              imageMain = imagesUrl.splice(0, 1);
            }

            return (
              <div key={id} className="property-details-ctn">
                {imagesUrl.length !== 0 ? (
                  <ShowImage
                    showImageRef={showImageRef}
                    handleModal={handleModal}
                    imgUrl={imagesUrl}
                  />
                ) : null}
                <div className="property-ctn">
                  <h2 className="title">{title}</h2>
                  {propertyHideAddress === false ? (
                    <h3 className="address">
                      <Address
                        address={address}
                        region={region}
                        country={country}
                      />
                    </h3>
                  ) : null}
                  <h3 className="date">
                    Última actualización: {formattedDate}
                  </h3>
                  <div className="price">
                    {sellPrice > 0 ? (
                      <h3 className="sell-price">
                        Venta: {sellPrice.toLocaleString('es-ES') + ' €'}
                      </h3>
                    ) : null}
                    {rentPrice > 0 ? (
                      <h3 className="rent-price">
                        Alquiler: {rentPrice.toLocaleString('es-ES') + ' €/mes'}
                      </h3>
                    ) : null}
                  </div>
                </div>
                <div className="details-ctn">
                  {imageMain.length !== 0 ? (
                    <img
                      src={`${backendUrl}/images/${imageMain}`}
                      alt={`Imagen principal de: ${title}`}
                    />
                  ) : (
                    <ImageNotFound />
                  )}
                  <div className="details">
                    {propertyType !== 'terrain' ? (
                      <>
                        <h4>Inmueble</h4>
                        <p>
                          <PropertyType propertyType={propertyType} />
                        </p>
                        <h4>Estado</h4>
                        <p>
                          <PropertyCondition
                            propertyCondition={propertyCondition}
                          />
                        </p>
                        <h4>Condiciones especiales</h4>
                        <p>
                          <ConditionsSpecials
                            conditionsSpecials={conditionsSpecials}
                          />
                        </p>
                        <h4>Parking</h4>
                        <p>
                          <Parking parking={parking} />
                        </p>
                        <h4>Piscina</h4>
                        <p>
                          <Pool pool={pool} />
                        </p>
                        {propertySize > 0 ? (
                          <>
                            <h4>Tamaño</h4>
                            <p>{propertySize} m²</p>
                          </>
                        ) : null}
                        {propertySizeTerrain > 0 ? (
                          <>
                            <h4>Terreno</h4>
                            <p>{propertySizeTerrain} m²</p>
                          </>
                        ) : null}
                        <h4>Habitaciones</h4>
                        <p>{rooms}</p>
                        <h4>Baños</h4>
                        <p>{baths}</p>
                        <h4>Ascensor</h4>
                        <p>{elevator === 'has' ? 'Si' : 'No'}</p>
                        <h4>Certificado energético</h4>
                        <p>
                          <EnergyCertificate
                            energyCertificate={energyCertificate}
                          />
                        </p>
                      </>
                    ) : (
                      <>
                        <h4>Terreno</h4>
                        <p>{propertySizeTerrain} m²</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="images-contact-ctn">
                  <div>
                    {description && (
                      <p className="description">{description}</p>
                    )}
                    {imagesUrl.length !== 0 ? (
                      <ul className="images">
                        {imagesUrl.map((url) => (
                          <img
                            key={url}
                            src={`${backendUrl}/images/${url}`}
                            onClick={handleModal}
                            alt=""
                          />
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <ShowContact
                    authenticated={authenticated}
                    userId={userId}
                    firstName={firstName}
                    email={email}
                    phone={phone}
                  />
                </div>
              </div>
            );
          },
        )
      ) : null}
    </main>
  );
}
