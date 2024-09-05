import react, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from 'react-bootstrap/Button';
import './AgregarReviews.css';

function AddReview(props) {

  // Verificación de si el usuario está logueado, y obtiene el id del mismo.
  const estaLogueado = sessionStorage.getItem('id');

  // Estado para almacenar los datos de la review con todos los datos a mostrar en la misma.
  const [reviewData, setReviewData] = useState({
    userId: sessionStorage.getItem('id'),
    rating: 7,
    review: '',
    placeId: props.placeId,
    foundId: props.foundId,
  });


  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualizar los datos de la review con los nuevos valores
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envío de los datos de la review al servidor
      const response = await fetch('https://history-hunters-evening-api.onrender.com/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Convertir los datos de la revisión a formato JSON
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) { // Verificar si la respuesta no es exitosa
        throw new Error('Error!');
      }
      const result = await response.json(); // Convertir la respuesta a formato JSON
      console.log(result.data); // Mostrar los datos devueltos por el servidor en la consola

      // Restablecer los datos de la revisión a los valores predeterminados después del envío exitoso
      setReviewData({
        userId: sessionStorage.getItem('id'),
        rating: 7,
        review: '',
        placeId: props.placeId,
        foundId: props.foundId,
      });

      // Llamar a la función onChange pasada como prop para indicar que se ha agregado una revisión
      props.onChange(true);
    } catch (error) {
      console.error('Hubo un error al enviar la información', error);
      alert('Error al enviar la información');
    }
  }

  // Renderizar el formulario de revisión si el usuario está logueado
  return ( estaLogueado ? ( 
    
    <form onSubmit={handleSubmit}>
      <h2>Deja un comentario</h2>
      <FloatingLabel controlId="floatingInput" label="Escribe aquí un comentario" className="mb-3" >
        <Form.Control type="textarea" name="review" placeholder="Escribe aquí un comentario" value={reviewData.review} onChange={handleChange} />
      </FloatingLabel>

      <Stack spacing={1} onChange={handleChange}>
        <Rating size="large" name="rating" value={reviewData.rating} precision={1} max={10} onChange={(event, newValue) => {
          setReviewData({ ...reviewData, rating: newValue });
        }} />
      </Stack>

      <Button type="submit" className='buttonReview' variant="secondary">Comentar</Button>
    </form>
    
    // Renderizar un mensaje si el usuario no está logueado
  ) : (<div><h5>Debes iniciar sessión para dejar un comentario</h5></div>)
      
  );
}

export default AddReview;