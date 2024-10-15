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

function InputNumRoomsAndBaths({ id, text }) {
  const [state, setState] = useState(0);
  return (
    <div className={`${id}-ctn`}>
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

function AdsTypes() {
  const [rent, setRent] = useState(false);
  const [sell, setSell] = useState(false);
  const [finance, setFinance] = useState(false);
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
                type="number"
              />
              <InputSelect id="optionalBuy" text="Opción a Compra" />
              <InputSelect id="rerent" text="Realquiler" />
            </div>
          )}
          {sell && (
            <div className="sell-ctn">
              <h2>Venta</h2>
              <Input
                id="sellPrice"
                text="Precio de venta"
                placeholder="Precio de venta en €"
                type="number"
              />
              <Input
                id="sellPriceArv"
                text="Precio de revalorización (opcional)"
                placeholder="Precio potencial de revalorización en €"
                type="number"
              />
              <InputSelect id="jointVenture" text="Joint Venture" />
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
              />
              <Input type="number" id="financeYears" text="Número de años" />
              <Input type="number" id="financeInterest" text="Interés" />
              <Input type="number" id="monthPayment" text="Cuotas mensuales" />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function PropertyTypes() {
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES.APARTMENT);
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
          <InputNumRoomsAndBaths id="rooms" text="Habitaciones" />
          <InputNumRoomsAndBaths id="baths" text="Baños" />
        </div>
      )}
      <div className="property-atributes-ctn">
        {isTerrain ? null : (
          <>
            <SelectPropertyCondition
              id="propertyCondition"
              name="propertyCondition"
              text="Estado del inmueble"
            />
            <div className="property-atributes">
              <Input
                id="propertySize"
                text="Tamaño del inmueble"
                type="number"
                placeholder="En m²"
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
            />
          </div>
        )}
        {isTerrain ? null : (
          <SelectCertificate
            id="energyCertificate"
            name="energyCertificate"
            text="Certificado energético"
          />
        )}
        {isApartment ? (
          <SelectElevator id="elevator" name="elevator" text="Ascensor" />
        ) : null}
        {isTerrain ? null : (
          <>
            <SelectFurniture id="furnished" name="furnished" text="Muebles" />
            <SelectParking id="parking" name="parking" text="Aparcamiento" />
            <SelectPool id="pool" name="pool" text="Piscina" />
          </>
        )}
      </div>
    </>
  );
}

export default function FormProperty({ isLoading, handleSubmit }) {
  return (
    <form
      className="form-property-ctn"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <InputSelect id="visible" text="Cualquiera puede ver el anuncio" />
      <AdsTypes />
      <PropertyTypes />
      <div className="title-description-ctn">
        <Input id="title" text="Título" />
        <Input id="description" text="Descripción" />
      </div>
      <div className="form-address-ctn">
        <h2>Ubicación</h2>
        <InputSelect
          id="propertyHideAddress"
          text="Ocultar la dirección en el anuncio"
        />
        <div className="form-address-left">
          <Input id="address" text="Dirección" />
          <Input id="city" text="Población" />
          <SelectSpecial
            name="conditionsSpecials"
            id="conditionsSpecials"
            text="Condiciones especiales"
          />
        </div>
        <div className="form-address-right">
          <label htmlFor="country">País</label>
          <select name="country" id="country">
            <option value="es">España</option>
          </select>
          <SelectRegion name="region" id="region" text="Región" />
          <Input id="postal" text="Código postal" />
        </div>
      </div>
      <input
        type="submit"
        value={isLoading ? 'Enviando' : 'Enviar'}
        disabled={isLoading}
      />
    </form>
  );
}
