import {Spinner} from 'react-bootstrap';
import './Cargando.css'
import logoo from '../../images/Logo11.png';

function Cargando() {

  return (
  <div className='contenedor-cargando'>
  <Spinner className='spinner' animation="grow" variant="dark" />
  <img className="imagen-central" src={logoo} alt='logo central'/>
  </div>
  )
};

export default Cargando;