import React, { useState, useEffect } from 'react';
import { Rating, Stack } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";


function ModificarLugar() {
    const { IdLugar } = useParams(); // Obtiene el IdLugar de los parámetros de la URL
    const [formData, setFormData] = useState({ // Estado para los datos del formulario
        userId: sessionStorage.getItem('id'), // Obtiene el userId de la sesión actual
        name: '',
        description: '',
        address: '',
        images: [{ url: '' }],
        type: '',
        characteristics: [],
        score: 1,
        country: 'Uruguay',
    });


    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        try {
            const url = 'https://history-hunters-evening-api.onrender.com/places/update/' + IdLugar;
    
            const response = await fetch(url, { // Método PUT para actualizar los datos
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Convierte los datos del formulario a JSON
            });

            window.location.assign('/lugares/' + IdLugar); // Redirige al usuario a la página del lugar modificado

            
            const data = await response.json(); // Convierte la respuesta en JSON
            console.log('Respuesta del servidor:', data); // Muestra la respuesta del servidor en la consola
        } catch (error) {
            console.error('Error al enviar la solicitud PUT:', error); 
        }
    };
    
    

     // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtiene el nombre y el valor del campo
        if (name === "images") {
            setFormData({ ...formData, images: [{ url: value }] }); // Actualiza el estado de las imágenes
        } else if (name === "characteristics") {
            setFormData({ ...formData, characteristics: value.split(',') }); // Actualiza el estado de las características
        } else {
            setFormData({ ...formData, [name]: value }); // Actualiza el estado del campo correspondiente
        }
    };


    return (

        <Form className="text-light" onSubmit={handleSubmit}>
                        

                        <Form.Control type="text" placeholder="Nombre" name="name" value={formData.name} onChange={handleChange} /><br/>
                        <Form.Control type="text" placeholder="Descripción del Lugar" name="description" value={formData.description} onChange={handleChange} /><br/>
                        <Form.Control type="text" placeholder="Ubicación" name="address" value={formData.address} onChange={handleChange} /><br/>
                        <Form.Control type="text" placeholder="Ingresa URL de la imágen aquí" name="images" value={formData.images[0].url} onChange={handleChange} /><br/>
                        <Form.Control type="text" placeholder="Características del Lugar" name="characteristics" value={formData.characteristics} onChange={handleChange} /><br/>

                        <div className='puntuacion'>
                            <Stack spacing={1} value={formData.score} onChange={handleChange}>
                                <Rating size="large" name="score" defaultValue={3} precision={1} max={10} />
                            </Stack>

                        </div><br/>

                        <Form.Select aria-label="Default select example" name="type" value={formData.type} onChange={handleChange}>
                            <option value="Belicos">Bélicos</option>
                            <option value="Cotidianos">Cotidianos</option>
                            <option value="Otros">Otros</option>
                        </Form.Select><br/>

                        <Form.Select aria-label="Default select example" name="country" value={formData.country} onChange={handleChange}>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Brasil">Brasil</option>
                        </Form.Select><br/>

                        <Form.Select aria-label="Default select example" name="region" value={formData.region} onChange={handleChange}>
                        <option value="Norte">Norte</option>
                            <option value="Sur">Sur</option>
                            <option value="Este">Este</option>
                            <option value="Oeste">Oeste</option>
                            <option value="Sureste">Sureste</option>
                            <option value="Suroeste">Suroeste</option>
                            <option value="Noroeste">Noroeste</option>
                            <option value="Noreste">Noreste</option>
                        </Form.Select><br/>
                        <Button type="submit" className='button' variant="secondary">Modificar lugar</Button>
                    </Form>

    );

}

export default ModificarLugar;