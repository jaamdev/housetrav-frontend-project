export function SelectSpecial({ id, text, ...props }) {
  return (
    <>
      <label htmlFor={id}>{text}</label>
      <select id={id} name={id} {...props}>
        <option value="">Selecciona</option>
        <option value="available">Disponible</option>
        <option value="rent">Alquilado</option>
        <option value="squatter">Ocupado y sin posesión</option>
        <option value="inscription">Pendiente inscripción</option>
        <option value="proindiviso">Proindiviso</option>
        <option value="special">Situación especial</option>
        <option value="charges">Inmueble con cargas</option>
        <option value="no_access">Sin acceso</option>
        <option value="construction">En construcción</option>
        <option value="ruin">Vandalizado y ruina</option>
      </select>
    </>
  );
}

export function SelectRegion({ id, text, ...props }) {
  return (
    <>
      <label htmlFor={id}>{text}</label>
      <select id={id} name={id} {...props}>
        <option value="">Selecciona</option>
        <option value="alava">Álava</option>
        <option value="albacete">Albacete</option>
        <option value="alicante">Alicante</option>
        <option value="almeria">Almería</option>
        <option value="asturias">Asturias</option>
        <option value="avila">Ávila</option>
        <option value="badajoz">Badajoz</option>
        <option value="barcelona">Barcelona</option>
        <option value="burgos">Burgos</option>
        <option value="caceres">Cáceres</option>
        <option value="cadiz">Cádiz</option>
        <option value="cantabria">Cantabria</option>
        <option value="castellon">Castellón</option>
        <option value="ciudad_real">Ciudad Real</option>
        <option value="cordoba">Córdoba</option>
        <option value="cuenca">Cuenca</option>
        <option value="fuerteventura">Fuerteventura</option>
        <option value="gerona">Gerona</option>
        <option value="gipuzkoa">Gipuzkoa</option>
        <option value="gran_canaria">Gran Canaria</option>
        <option value="granada">Granada</option>
        <option value="guadalajara">Guadalajara</option>
        <option value="huelva">Huelva</option>
        <option value="huesca">Huesca</option>
        <option value="ibiza">Ibiza</option> <option value="jaen">Jaén</option>
        <option value="lanzarote">Lanzarote</option>
        <option value="la_gomera">La Gomera</option>
        <option value="la_palma">La Palma</option>
        <option value="la_rioja">La Rioja</option>
        <option value="las_palmas">Las Palmas</option>
        <option value="leon">León</option>
        <option value="lleida">Lleida</option>
        <option value="lugo">Lugo</option>
        <option value="madrid">Madrid</option>
        <option value="malaga">Málaga</option>
        <option value="mallorca">Mallorca</option>
        <option value="menorca">Menorca</option>
        <option value="murcia">Murcia</option>
        <option value="navarra">Navarra</option>
        <option value="ourense">Ourense</option>
        <option value="palencia">Palencia</option>
        <option value="pontevedra">Pontevedra</option>
        <option value="salamanca">Salamanca</option>
        <option value="santa_cruz_de_tenerife">Santa Cruz de Tenerife</option>
        <option value="segovia">Segovia</option>
        <option value="sevilla">Sevilla</option>
        <option value="soria">Soria</option>
        <option value="tarragona">Tarragona</option>
        <option value="teruel">Teruel</option>
        <option value="toledo">Toledo</option>
        <option value="valencia">Valencia</option>
        <option value="valladolid">Valladolid</option>
        <option value="vizcaya">Vizcaya</option>
        <option value="zamora">Zamora</option>
        <option value="zaragoza">Zaragoza</option>
      </select>
    </>
  );
}

export function SelectPropertyCondition({ id, text, ...props }) {
  return (
    <div className="property-atributes">
      <label htmlFor={id}>{text}</label>
      <select id={id} name={id} {...props}>
        <option value="">Selecciona</option>
        <option value="squatter">Ocupado</option>
        <option value="bad">A reformar</option>
        <option value="regular">Regular</option>
        <option value="good">En buen estado</option>
        <option value="new">A estrenar</option>
      </select>
    </div>
  );
}

export function SelectCertificate({ id, text, ...props }) {
  return (
    <div className="property-atributes">
      <label htmlFor={id}>{text}</label>
      <select id={id} name={id} {...props}>
        <option value="">Selecciona</option>
        <option value="EMPTY">Sin certificado</option>
        <option value="F">F</option>
        <option value="E">E</option>
        <option value="D">D</option>
        <option value="C">C</option>
        <option value="B">B</option>
        <option value="A">A</option>
        <option value="A+">A+</option>
      </select>
    </div>
  );
}

export function SelectElevator({ id, text, ...props }) {
  return (
    <div className="property-atributes">
      <label htmlFor={id}>{text}</label>
      <select id={id} name={id} {...props}>
        <option value="">Selecciona</option>
        <option value="has">Sí</option>
        <option value="donthas">No</option>
      </select>
    </div>
  );
}

export function SelectFurniture({ id, text, ...props }) {
  return (
    <div className="property-atributes">
      <label htmlFor={id}>{text}</label>
      <select id={id} name={id} {...props}>
        <option value="">Selecciona</option>
        <option value="empty">Sin muebles</option>
        <option value="half">Algunos muebles</option>
        <option value="full">Totalmente amueblado</option>
      </select>
    </div>
  );
}

export function SelectParking({ id, text, ...props }) {
  return (
    <div className="property-atributes">
      <label htmlFor={id}>{text}</label>
      <select id={id} name={id} {...props}>
        <option value="">Selecciona</option>
        <option value="none">No tiene</option>
        <option value="shared">Comunitario</option>
        <option value="private">Privado</option>
      </select>
    </div>
  );
}

export function SelectPool({ id, text, ...props }) {
  return (
    <div className="property-atributes">
      <label htmlFor={id}>{text}</label>
      <select id={id} name={id} {...props}>
        <option value="">Selecciona</option>
        <option value="none">No</option>
        <option value="shared">Comunitaria</option>
        <option value="private">Privada</option>
      </select>
    </div>
  );
}
