import { Link } from 'react-router-dom';
import {
  Address,
  PropertyType,
  ConditionsSpecials,
} from './SwitchesComponents.jsx';
import CardImage from './CardImage.jsx';

export default function PropertyCard({
  id,
  title,
  rooms,
  baths,
  region,
  address,
  country,
  rentPrice,
  sellPrice,
  propertyType,
  propertySize,
  conditionsSpecials,
  propertyHideAddress,
  propertySizeTerrain,
}) {
  return (
    <li className="property-card-ctn">
      <CardImage propertyId={id} />
      <Link to={`/properties/${id}`}>
        <div className="card-type-conditions-ctn">
          <h3 className="card-type-ctn">
            <PropertyType propertyType={propertyType} />
          </h3>
          <h3 className="card-conditions-ctn">
            <ConditionsSpecials conditionsSpecials={conditionsSpecials} />
          </h3>
        </div>
        <div className="card-price-ctn">
          {rentPrice !== 0 ? (
            <h2 className="card-rent-ctn">
              {rentPrice.toLocaleString('es-ES')} €/mes
            </h2>
          ) : (
            <h2 className="card-sell-ctn">
              {sellPrice.toLocaleString('es-ES')} €
            </h2>
          )}
        </div>
        <h2 className="card-title-ctn">
          {title.length > 20 ? title.split(' ', 3).join(' ') + '...' : title}
        </h2>
        {propertyHideAddress === false ? (
          <h3 className="card-address-ctn">
            <Address address={address} region={region} country={country} />
          </h3>
        ) : null}
        <div className="card-rooms-baths-size-ctn">
          {propertyType !== 'terrain' ? (
            <>
              <h3 className="card-rooms-ctn">
                {rooms} {rooms <= 1 ? 'dormitorio' : 'dormitorios'}
              </h3>
              <h3 className="card-baths-ctn">
                {baths} {baths <= 1 ? 'baño' : 'baños'}
              </h3>
              <h3 className="card-size-ctn">
                {propertySize.toLocaleString('es-ES')} m²
              </h3>
            </>
          ) : (
            <h3 className="card-size-ctn">
              {propertySizeTerrain.toLocaleString('es-ES')} m²
            </h3>
          )}
        </div>
      </Link>
    </li>
  );
}
