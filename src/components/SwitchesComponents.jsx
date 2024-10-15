export function PropertyType({ propertyType }) {
  let result = '';

  switch (propertyType) {
    case 'apartment':
      result = 'Apartamento';
      break;
    case 'chalet':
      result = 'Chalet';
      break;
    case 'terrain':
      result = 'Terreno';
      break;
    case 'house':
      result = 'Casa';
      break;
    case 'building':
      result = 'Edificio';
      break;
    default:
      result = 'Otro';
  }

  return result;
}

export function ConditionsSpecials({ conditionsSpecials }) {
  let result = '';

  switch (conditionsSpecials) {
    case 'available':
      result = 'Disponible';
      break;
    case 'rent':
      result = 'Alquilado';
      break;
    case 'squatter':
      result = 'Ocupado y sin posesión';
      break;
    case 'inscription':
      result = 'Pendiente inscripción';
      break;
    case 'proindiviso':
      result = 'Proindiviso';
      break;
    case 'special':
      result = 'Situación especial';
      break;
    case 'charges':
      result = 'Inmueble con cargas';
      break;
    case 'no_access':
      result = 'Sin acceso';
      break;
    case 'construction':
      result = 'En construcción';
      break;
    case 'ruin':
      result = 'Vandalizado y ruina';
      break;
    default:
      result = 'Otro';
  }

  return result;
}

export function Address({ address, region, country }) {
  let result = '';

  switch (country) {
    case 'es':
      result = 'España';
      break;
    default:
      result = 'Otro';
  }

  return `${address}, ${region}, ${result}`;
}

export function PropertyCondition({ propertyCondition }) {
  let result = '';

  switch (propertyCondition) {
    case 'squatter':
      result = 'Ocupado';
      break;
    case 'bad':
      result = 'A reformar';
      break;
    case 'regular':
      result = 'Regular';
      break;
    case 'good':
      result = 'En buen estado';
      break;
    case 'new':
      result = 'A estrenar';
      break;
    default:
      result = 'Otro';
  }

  return result;
}

export function Parking({ parking }) {
  let result = '';

  switch (parking) {
    case 'none':
      result = 'No tiene';
      break;
    case 'shared':
      result = 'Comunitario';
      break;
    case 'private':
      result = 'Privado';
      break;
    default:
      result = 'No tiene';
  }

  return result;
}

export function Pool({ pool }) {
  let result = '';

  switch (pool) {
    case 'none':
      result = 'No';
      break;
    case 'shared':
      result = 'Comunitaria';
      break;
    case 'private':
      result = 'Privada';
      break;
    default:
      result = 'No';
  }

  return result;
}

export function EnergyCertificate({ energyCertificate }) {
  let result = '';

  switch (energyCertificate) {
    case 'empty':
      result = 'No tiene';
      break;
    default:
      result = energyCertificate.toUpperCase();
  }

  return result;
}
