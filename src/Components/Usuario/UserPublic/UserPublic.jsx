import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cargando from '../../Cargando/Cargando';
import Lugar from '../../Section/Card';

function UserPublicLugar(props) {
  const [data, setData] = useState([]);
  const { datoo } = props; 
  const [cargando, setCargando ] = useState(true);

  useEffect(() => { // Hook useEffect para cargar los datos de lugares al montar el componente
    const loadData = async () => { // Función asincrónica para cargar los datos
      const url = `https://history-hunters-evening-api.onrender.com/places/user/${datoo}`;
      
      try {
        const response = await fetch(url); // Realiza la solicitud de datos
        if (!response.ok) { // Verifica si la respuesta no es exitosa
          setCargando(false); // Actualiza el estado de carga a false
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json(); // Convierte la respuesta a formato JSON
        setData(result.data); // Actualiza el estado con los datos de lugares
        setCargando(false); // Actualiza el estado de carga a false
      } catch (error) {
        setCargando(false);
        console.error('Error en la solicitud:', error);
      }
    };

    loadData(); // Llama a la función para cargar los datos
  }, [data]); // Se ejecuta cuando cambia el estado de data

  return  cargando ? (<Cargando />) :
    ( 
    <div className='card-container'>
      {data.map((card) => (
        <Link className='link-router' to={`/lugares/${card.id}`}>
          <Lugar
            key={card.id}
            imageUrl={card.images}
            name={card.name}
            description={card.description}
          />
        </Link>
      ))}
    </div>
  )
}

export default UserPublicLugar;