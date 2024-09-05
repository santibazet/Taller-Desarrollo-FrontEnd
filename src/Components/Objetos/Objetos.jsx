import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ObjetoCard from './ObjetoCard';
import Cargando from '../Cargando/Cargando';
import './Objetos.css';

// Se define el componente Objetos y recibe searchTerm como prop

function Objetos({ searchTerm }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estado para los filtros
  const [tipoFilter, setTipoFilter] = useState('');
  const [fechaInicioFilter, setFechaInicioFilter] = useState(null); // Por defecto null
  const [fechaFinFilter, setFechaFinFilter] = useState(null); // Por defecto null
  const [regionFilter, setRegionFilter] = useState('');
  const [paisFilter, setPaisFilter] = useState('');
  const [sitioHistoricoFilter, setSitioHistoricoFilter] = useState('');
  

  // Efecto para cargar los datos y filtrar según searchTerm
  useEffect(() => { 
    const loadData = async () => { 
      const baseUrl = 'https://history-hunters-evening-api.onrender.com/founds'; 

      /* searchTerm contiene los datos del termino de busqueda del usuario, buscando en la api
                                en base a ese termino */
      const url = searchTerm 
        ? `${baseUrl}/search/key?name=${searchTerm}`
        : baseUrl;

      try {
        const response = await fetch(url); // Realiza la petición GET a la URL
        if (!response.ok) {
          setCargando(false);
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json();
        setData(result.data);
        setFilteredData(result.data);
        setCargando(false);
      } catch (error) {
        setCargando(false);
        console.error('Error en la solicitud:', error);
      }
    };

    loadData();
  }, [searchTerm]);

  useEffect(() => { // Efecto para aplicar los filtros a los datos
    const applyFilters = () => { // Función para aplicar los filtros
      let filteredResults = [...data]; // Crea una copia de los datos originales


      // Si se filtra por tipo
      if (tipoFilter) {
        filteredResults = filteredResults.filter( // Filtra los resultados según el tipo seleccionado
          (item) => item.type.toLowerCase() === tipoFilter.toLowerCase()
        );
      }

      // Filtros por fecha

      if (fechaInicioFilter) {

        // Filtrar por fecha de inicio
        filteredResults = filteredResults.filter(
          (item) => new Date(item.createdAt) >= fechaInicioFilter
        );

        // Filtrar por fecha fin (si está seleccionada)
        if (fechaFinFilter) {
          filteredResults = filteredResults.filter(
            (item) => new Date(item.createdAt) <= fechaFinFilter
          );
        }
      }

      // Si se selecciona una region para filtrar
      if (regionFilter) {
        const normalizedRegion = regionFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.region.toLowerCase().includes(normalizedRegion)
        );
      }

      // Si hay un país seleccionado
      if (paisFilter) {
        const normalizedPais = paisFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.country.toLowerCase().includes(normalizedPais)
        );
      }

      // Si se filtra por sitio  historico
      if (sitioHistoricoFilter) {
        const normalizedSitioHistorico = sitioHistoricoFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.description.toLowerCase().includes(normalizedSitioHistorico)
        );
      }
      

      // Establece los datos filtrados en el estado filteredData
      setFilteredData(filteredResults);
    };

    // Llama a la función applyFilters al montar el componente o cuando cambien los filtros
    applyFilters();
  }, [tipoFilter, fechaInicioFilter, fechaFinFilter, regionFilter, paisFilter, sitioHistoricoFilter, data]);

  const tipoOptions = ['Bélicos', 'Cotidianos', 'Otros'];

  return cargando ? ( // Si está cargando
    <Cargando /> // Muestra el componente de carga
    
  ) : ( // Si no está cargando muestra todo
    <div className='page-container'>
      <h2>Opciones de filtrado</h2>
      <div className='filter-container'>
        <select value={tipoFilter} onChange={(e) => setTipoFilter(e.target.value)}>
          <option value=''>Tipo</option>
          {tipoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <DatePicker
          selected={fechaInicioFilter}
          onChange={(date) => setFechaInicioFilter(date)}
          placeholderText='Fecha Inicio'
          dateFormat='dd/MM/yyyy'
          isClearable
        />
        <DatePicker
          selected={fechaFinFilter}
          onChange={(date) => setFechaFinFilter(date)}
          placeholderText='Fecha Fin'
          dateFormat='dd/MM/yyyy'
          minDate={fechaInicioFilter} // Bloquea fechas anteriores a la fecha de inicio
          disabled={!fechaInicioFilter} // Deshabilita si no hay fecha de inicio seleccionada
          isClearable
        />
        <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
          <option value=''>Región</option>
          <option value='Norte'>Norte</option>
          <option value='Sur'>Sur</option>
          <option value='Este'>Este</option>
          <option value='Oeste'>Oeste</option>
          <option value='Noreste'>Noreste</option>
          <option value='Noroeste'>Noroeste</option>
          <option value='Sureste'>Sureste</option>
          <option value='Suroeste'>Suroeste</option>
        </select>
        <input
          type='text'
          placeholder='País...'
          value={paisFilter}
          onChange={(e) => setPaisFilter(e.target.value)}
        />
        <input
          type='text'
          placeholder='Sitio Histórico...'
          value={sitioHistoricoFilter}
          onChange={(e) => setSitioHistoricoFilter(e.target.value)}
        />
      </div>
      <div className='card-container'>
        {filteredData.map((object) => (
          <Link className='link-router' key={object.id} to={`/objetos/${object.id}`}>
            <ObjetoCard
              key={object.id}
              imageUrl={object.images}
              name={object.name}
              description={object.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Objetos;