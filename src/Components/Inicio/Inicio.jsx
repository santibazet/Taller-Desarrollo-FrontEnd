import React, { useEffect } from 'react';
import './Inicio.css';
import Fondo from '../../images/Captutapng.png';
import Button from 'react-bootstrap/Button';

const Inicio = () => {
  // Efecto secundario para cambiar el color de fondo al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const body = document.body;
      const scrollPosition = window.scrollY;

      if (scrollPosition > 100) {
        body.style.backgroundColor = "#f0f0f0";
      } else {
        body.style.backgroundColor = "white";
      }
    };

    window.addEventListener("scroll", handleScroll); // Agregar evento de desplazamiento

    return () => {
      window.removeEventListener("scroll", handleScroll); // Limpiar el evento de desplazamiento al desmontar el componente
    };
  }, []); // Ejecutar solo una vez al montar el componente


   // Función para redirigir al formulario de registro
  const redirectToRegister = () => {
    window.location.assign('/registrate');
  };

  // Función para redirigir a la página de lugares
  const redirectToPlaces = () => {
    window.location.assign('/lugares');
  };


  // Renderizar el componente
  return (
    <div className="con-fondo">
      <img className='con-fondo' src={Fondo} alt="Fondo" />
      <div className="social-icons">
      <Button variant="primary" onClick={redirectToRegister}>Si aún no tienes cuenta registrate aquí</Button>{' '}
        <Button variant="info" onClick={redirectToPlaces}>Explora lugares históricos</Button>{' '}
      </div>
    </div>
  );
}

export default Inicio;
