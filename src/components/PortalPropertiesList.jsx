import { useState, useEffect } from 'react';
import { getPortalProperties } from '#Services/api.js';
import PropertyCard from './PropertyCard.jsx';

export default function PortalPropertiesList() {
  const [propertiesList, setPropertiesList] = useState([]);

  const fetchProperties = async () => {
    const result = await getPortalProperties();
    if (!result.ok || result.data.length === 0) return;
    setPropertiesList(result.data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return propertiesList.length > 0 ? (
    <ul>
      {propertiesList.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </ul>
  ) : (
    <h2>No hay propiedades</h2>
  );
}
