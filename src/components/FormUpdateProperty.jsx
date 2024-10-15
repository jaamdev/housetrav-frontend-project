import { useState, useEffect } from 'react';
import {
  SelectCertificate,
  SelectElevator,
  SelectFurniture,
  SelectParking,
  SelectPool,
  SelectPropertyCondition,
  SelectRegion,
  SelectSpecial,
} from './EditSelectComponents.jsx';

const ADS_TYPE = {
  RENT: 'rent',
  SELL: 'sell',
  RENTSELL: 'rentsell',
  CLEAR: '',
};

const PROPERTY_TYPES = {
  APARTMENT: 'APARTMENT',
  CHALET: 'CHALET',
  TERRAIN: 'TERRAIN',
  HOUSE: 'HOUSE',
  BUILDING: 'BUILDING',
};

function Input({ id, text, placeholder, type = 'text', ...props }) {
  return (
    <>
      <label htmlFor={id}>{text}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder ? placeholder : text}
        {...props}
      />
    </>
  );
}

function InputSelect({ id, text, ...props }) {
  return (
    <div className="checkbox-ctn">
      <input type="checkbox" name={id} id={id} {...props} />
      <label htmlFor={id}>{text}</label>
    </div>
  );
}

function InputNumRoomsAndBaths({ id, text, value, ...props }) {
  const [state, setState] = useState(value);
  return (
    <div className={`${id}-ctn`} {...props}>
      <label htmlFor={id}>{text}</label>
      <div>
        <input
          type="button"
          value="-"
          disabled={state <= 0}
          onClick={() => setState(state - 1)}
        />
        <input id={id} name={id} type="number" value={state} readOnly />
        <input type="button" value="+" onClick={() => setState(state + 1)} />
      </div>
    </div>
  );
}

function AdsTypes({ propertyValues }) {
  const [rent, setRent] = useState(
    propertyValues.rentSell === 'rent' || propertyValues.rentSell === 'rentsell'
      ? true
      : false,
  );
  const [sell, setSell] = useState(
    propertyValues.rentSell === 'sell' || propertyValues.rentSell === 'rentsell'
      ? true
      : false,
  );
  const [finance, setFinance] = useState(propertyValues.optionalFinance);
  const [adsType, setAdsType] = useState(ADS_TYPE.CLEAR);

  useEffect(() => {
    if (rent && sell) {
      setAdsType(ADS_TYPE.RENTSELL);
    } else if (rent) {
      setAdsType(ADS_TYPE.RENT);
    } else if (sell) {
      setAdsType(ADS_TYPE.SELL);
    } else {
      setAdsType(ADS_TYPE.CLEAR);
    }
    if (!sell && finance) {
      setFinance(false);
    }
  }, [rent, sell, finance]);

  return (
    <div className="form-ads-types-ctn">
      <h2>Tipo de anuncio</h2>
      <input name="rentSell" value={adsType} hidden readOnly />
      <div className="form-ads-types-btn">
        <input
          className={rent ? 'active' : ''}
          type="button"
          value="Alquiler"
          onClick={() => setRent(!rent)}
        />
        <input
          className={sell ? 'active' : ''}
          type="button"
          value="Venta"
          onClick={() => setSell(!sell)}
        />
      </div>
      {rent || sell ? (
        <div className="rent-sell-ctn">
          {rent && (
            <div className="rent-ctn">
              <h2>Alquiler</h2>
              <Input
                id="rentPrice"
                text="Precio de alquiler"
                placeholder="Precio de alquiler en €"
                defaultValue={propertyValues.rentPrice}
                type="number"
              />
              <InputSelect
                id="optionalBuy"
                text="Opción a Compra"
                defaultChecked={propertyValues.optionalBuy}
              />
              <InputSelect
                id="rerent"
                text="Realquiler"
                defaultChecked={propertyValues.rerent}
              />
            </div>
          )}
          {sell && (
            <div className="sell-ctn">
              <h2>Venta</h2>
              <Input
                id="sellPrice"
                text="Precio de venta"
                placeholder="Precio de venta en €"
                defaultValue={propertyValues.sellPrice}
                type="number"
              />
              <Input
                id="sellPriceArv"
                text="Precio de revalorización (opcional)"
                placeholder="Precio potencial de revalorización en €"
                defaultValue={propertyValues.sellPriceArv}
                type="number"
              />
              <InputSelect
                id="jointVenture"
                text="Joint Venture"
                defaultChecked={propertyValues.jointVenture}
              />
              <div className="checkbox-ctn">
                <input
                  name="optionalFinance"
                  id="optionalFinance"
                  defaultChecked={finance}
                  defaultValue={finance ? true : null}
                  type="checkbox"
                  onChange={() => setFinance(!finance)}
                />
                <label htmlFor="optionalFinance">Pago a plazos</label>
              </div>
            </div>
          )}
          {finance && (
            <div className="finance-ctn">
              <Input
                type="number"
                id="financeInitPayment"
                text="Pago inicial"
                placeholder="Pago inicial en €"
                defaultValue={propertyValues.financeInitPayment}
              />
              <Input
                type="number"
                id="financeYears"
                text="Número de años"
                defaultValue={propertyValues.financeYears}
              />
              <Input
                type="number"
                id="financeInterest"
                text="Interés"
                defaultValue={propertyValues.financeInterest}
              />
              <Input
                type="number"
                id="monthPayment"
                text="Cuotas mensuales"
                defaultValue={propertyValues.monthPayment}
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function PropertyTypes({ propertyValues }) {
  const [propertyType, setPropertyType] = useState(
    propertyValues.propertyType === ''
      ? PROPERTY_TYPES.APARTMENT
      : propertyValues.propertyType.toUpperCase(),
  );
  const isApartment = propertyType === PROPERTY_TYPES.APARTMENT;
  const isChalet = propertyType === PROPERTY_TYPES.CHALET;
  const isTerrain = propertyType === PROPERTY_TYPES.TERRAIN;
  const isHouse = propertyType === PROPERTY_TYPES.HOUSE;
  const isBuilding = propertyType === PROPERTY_TYPES.BUILDING;
  return (
    <>
      <div className="form-property-types-ctn">
        <h2>Tipo de propiedad</h2>
        <div className="form-property-types-buttons-ctn">
          <input
            name="propertyType"
            value={propertyType}
            type="text"
            readOnly
            hidden
          />
          <input
            type="button"
            value="Apartamento"
            className={isApartment ? 'active' : ''}
            onClick={() => setPropertyType(PROPERTY_TYPES.APARTMENT)}
          />
          <input
            type="button"
            value="Chalet"
            className={isChalet ? 'active' : ''}
            onClick={() => setPropertyType(PROPERTY_TYPES.CHALET)}
          />
          <input
            type="button"
            value="Terreno"
            className={isTerrain ? 'active' : ''}
            onClick={() => setPropertyType(PROPERTY_TYPES.TERRAIN)}
          />
          <input
            type="button"
            value="Casa"
            className={isHouse ? 'active' : ''}
            onClick={() => setPropertyType(PROPERTY_TYPES.HOUSE)}
          />
          <input
            type="button"
            value="Edificio"
            className={isBuilding ? 'active' : ''}
            onClick={() => setPropertyType(PROPERTY_TYPES.BUILDING)}
          />
        </div>
      </div>
      {isTerrain ? null : (
        <div className="rooms-baths-ctn">
          <InputNumRoomsAndBaths
            id="rooms"
            text="Habitaciones"
            value={propertyValues.rooms}
          />
          <InputNumRoomsAndBaths
            id="baths"
            text="Baños"
            value={propertyValues.baths}
          />
        </div>
      )}
      <div className="property-atributes-ctn">
        {isTerrain ? null : (
          <>
            <SelectPropertyCondition
              id="propertyCondition"
              name="propertyCondition"
              text="Estado del inmueble"
              defaultValue={propertyValues.propertyCondition}
            />
            <div className="property-atributes">
              <Input
                id="propertySize"
                text="Tamaño del inmueble"
                type="number"
                placeholder="En m²"
                defaultValue={propertyValues.propertySize}
              />
            </div>
          </>
        )}
        {isApartment || isHouse || isBuilding ? null : (
          <div className="property-atributes">
            <Input
              id="propertySizeTerrain"
              text="Tamaño del terreno"
              type="number"
              placeholder="En m²"
              defaultValue={propertyValues.propertySizeTerrain}
            />
          </div>
        )}
        {isTerrain ? null : (
          <SelectCertificate
            id="energyCertificate"
            name="energyCertificate"
            text="Certificado energético"
            defaultValue={propertyValues.energyCertificate.toUpperCase()}
          />
        )}
        {isApartment ? (
          <SelectElevator
            id="elevator"
            name="elevator"
            text="Ascensor"
            defaultValue={propertyValues.elevator}
          />
        ) : null}
        {isTerrain ? null : (
          <>
            <SelectFurniture
              id="furnished"
              name="furnished"
              text="Muebles"
              defaultValue={propertyValues.furnished}
            />
            <SelectParking
              id="parking"
              name="parking"
              text="Aparcamiento"
              defaultValue={propertyValues.parking}
            />
            <SelectPool
              id="pool"
              name="pool"
              text="Piscina"
              defaultValue={propertyValues.pool}
            />
          </>
        )}
      </div>
    </>
  );
}

export default function FormProperty({
  isLoading,
  isLoadingData,
  propertyValues,
  handleSubmit,
}) {
  return isLoadingData ? (
    <h2 className="loading-ctn">Cargando...</h2>
  ) : (
    <form
      className="form-property-ctn"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <InputSelect
        id="visible"
        text="Cualquiera puede ver el anuncio"
        defaultChecked={propertyValues.visible}
      />
      <AdsTypes propertyValues={propertyValues} />
      <PropertyTypes propertyValues={propertyValues} />
      <div className="title-description-ctn">
        <Input id="title" text="Título" defaultValue={propertyValues.title} />
        <Input
          id="description"
          text="Descripción"
          defaultValue={propertyValues.description}
        />
      </div>
      <div className="form-address-ctn">
        <h2>Ubicación</h2>
        <InputSelect
          id="propertyHideAddress"
          text="Ocultar la dirección en el anuncio"
          defaultChecked={propertyValues.propertyHideAddress}
        />
        <div className="form-address-left">
          <Input
            id="address"
            text="Dirección"
            defaultValue={propertyValues.address}
          />
          <Input
            id="city"
            text="Población"
            defaultValue={propertyValues.city}
          />
          <SelectSpecial
            name="conditionsSpecials"
            id="conditionsSpecials"
            text="Condiciones especiales"
            defaultValue={propertyValues.conditionsSpecials}
          />
        </div>
        <div className="form-address-right">
          <label htmlFor="country">País</label>
          <select
            name="country"
            id="country"
            defaultValue={propertyValues.country}
          >
            <option value="">Selecciona</option>
            <option value="es">España</option>
          </select>
          <SelectRegion
            name="region"
            id="region"
            text="Región"
            defaultValue={propertyValues.region}
          />
          <Input
            id="postal"
            text="Código postal"
            defaultValue={propertyValues.postal}
          />
        </div>
      </div>
      <input
        type="submit"
        value={isLoading ? 'Guardando' : 'Guardar'}
        disabled={isLoading}
      />
    </form>
  );
}
