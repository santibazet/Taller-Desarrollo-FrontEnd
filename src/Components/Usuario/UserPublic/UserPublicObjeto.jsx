import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Cargando from '../../Cargando/Cargando';
import ObjetoCard from '../../Objetos/ObjetoCard';
import { Button } from 'react-bootstrap';

function UserPublicObjetos(props) {
  const [data, setData] = useState([]); // Estado para los datos de objetos
  const { datoo } = props; // Obtiene datoo de las props
  const [cargando, setCargando ] = useState(true); // Estado para controlar la carga de datos

  useEffect(() => { // Hook useEffect para cargar los datos de objetos al montar el componente
    const loadData = async () => { // Función asincrónica para cargar los datos
      const url = `https://history-hunters-evening-api.onrender.com/founds/user/${datoo}`;
      
      try {
        const response = await fetch(url); // Realiza la solicitud de datos
        if (!response.ok) { // Verifica si la respuesta no es exitosa
          setCargando(false);
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json(); // Convierte la respuesta a formato JSON
        setData(result.data); // Actualiza el estado con los datos de objetos
        setCargando(false); // Actualiza el estado de carga a false
      } catch (error) {
        setCargando(false);
        console.error('Error en la solicitud:', error);
      }
    };

    loadData(); // Llama a la función para cargar los datos
  }, [data]); // Se ejecuta cuando cambia el estado de data

  return cargando ? (<Cargando />) :
    ( 
        <div className='card-container'>
        {data.map((object) => (
          <Link className='link-router' to={`/objetos/${object.id}`}>
            <ObjetoCard
              key={object.id}
              imageUrl={object.images}
              name={object.name}
              description={object.description}
            />
          </Link>
          
        ))}
      </div>
  )
}

export default UserPublicObjetos;