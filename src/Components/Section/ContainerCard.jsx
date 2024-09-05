import React, { useState, useEffect } from 'react';
import Lugar from './Card';
import Cargando from '../Cargando/Cargando';
import { Link } from 'react-router-dom';
import './ContainerCard.css';

function ContainerCard({ searchTerm }) {

  // Estados para gestionar los filtros y la data
  const [caracteristicasFilter, setCaracteristicasFilter] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [puntuacionFilter, setPuntuacionFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [paisFilter, setPaisFilter] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Efecto para cargar la data inicial y al cambiar el término de búsqueda
  useEffect(() => {
    const loadData = async () => {
      const baseUrl = 'https://history-hunters-evening-api.onrender.com/places';
      const url = searchTerm
        ? `${baseUrl}/search/key?name=${searchTerm}`
        : baseUrl;

      try {
        const response = await fetch(url); // Solicita los datos
        if (!response.ok) {
          setCargando(false);
          throw new Error('Error al obtener los datos');
        }
        const result = await response.json(); // Convierte la respuesta en JSON
        setData(result.data); // Actualiza el estado con la data original
        setFilteredData(result.data); // Inicialmente, la data filtrada es igual a la data original
        setCargando(false);
      } catch (error) {
        setCargando(false);
        console.error('Error en la solicitud:', error);
      }
    };

    loadData();
  }, [searchTerm]);

  // Efecto para aplicar los filtros a la data
  useEffect(() => {
    const applyFilters = () => {
      let filteredResults = [...data]; // Copia la data original para aplicar los filtros
      
       // Filtra por características si el filtro está activo
      if (caracteristicasFilter) {
        const normalizedCaracteristicas = caracteristicasFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.characteristics.some((char) =>
            char.toLowerCase().includes(normalizedCaracteristicas)
          )
        );
      }
      
      // Filtra por tipo si el filtro está activo
      if (tipoFilter) {
        filteredResults = filteredResults.filter(
          (item) => item.type.toLowerCase() === tipoFilter.toLowerCase()
        );
      }

      // Filtra por puntuación si el filtro está activo
      if (puntuacionFilter) {
        filteredResults = filteredResults.filter(
          (item) => Math.round(item.score) === parseInt(puntuacionFilter)
        );
      }

      // Filtra por región si el filtro está activo
      if (regionFilter) {
        const normalizedRegion = regionFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.region.toLowerCase() === normalizedRegion
        );
      }

      // Filtra por país si el filtro está activo
      if (paisFilter) {
        const normalizedPais = paisFilter.toLowerCase();
        filteredResults = filteredResults.filter((item) =>
          item.country.toLowerCase().includes(normalizedPais)
        );
      }

      // Actualiza el estado de la data filtrada con los resultados finales
      setFilteredData(filteredResults);
    };

    applyFilters();
  }, [caracteristicasFilter, tipoFilter, puntuacionFilter, regionFilter, paisFilter, data]); // Dependencias del efecto: los filtros y la data

  const tipoOptions = ['Bélicos', 'Cotidianos', 'Otros'];
  const puntuacionOptions = Array.from({ length: 11 }, (_, index) => index); // Opciones del 0 al 10
  const regionOptions = ['Norte', 'Sur', 'Este', 'Oeste', 'Noreste', 'Noroeste', 'Sureste', 'Suroeste'];

  // Renderiza la página con los filtros y la data filtrada
  return cargando ? (
    <Cargando />
  ) : (
    <div className='page-container'>
      <h2>Opciones de filtrado</h2>
      <div className='filter-container'>
        <input
          type='text'
          placeholder='Características...'
          value={caracteristicasFilter}
          onChange={(e) => setCaracteristicasFilter(e.target.value)}
        />
        <select value={tipoFilter} onChange={(e) => setTipoFilter(e.target.value)}>
          <option value=''>Tipo</option>
          {tipoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          value={puntuacionFilter}
          onChange={(e) => setPuntuacionFilter(e.target.value)}
        >
          <option value=''>Puntuación</option>
          {puntuacionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
          <option value=''>Región</option>
          {regionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type='text'
          placeholder='País...'
          value={paisFilter}
          onChange={(e) => setPaisFilter(e.target.value)}
        />
      </div>
      <div className='card-container'>
        {filteredData.map((card) => (
          <Link className='link-router' key={card.id} to={`/lugares/${card.id}`}>
            <Lugar
              imageUrl={card.images}
              name={card.name}
              description={card.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ContainerCard;