import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function AgregarLugar() {
    const [formData, setFormData] = useState({ // Estado para los datos del formulario
        userId: sessionStorage.getItem('id'), // Obtiene el ID de usuario de la sesión
        name: '',
        description: '',
        address: '',
        images: [{ url: '' }],
        type: '',
        characteristics: [],
        score: 1,
        country: 'Uruguay',
        region: ''
    });

    const handleSubmit = async (e) => { // Función para manejar el envío del formulario
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        try {
            const response = await fetch('https://history-hunters-evening-api.onrender.com/places/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convierte los datos del formulario a JSON
            });
            if (!response.ok) {
                throw new Error('Error!');
            }
            const result = await response.json(); // Convierte la respuesta a formato JSON
            console.log(result.data); // Muestra los datos en la consola
            alert('El lugar se creó correctamente'); // Mensaje de exito
            setFormData({ // Restablece los valores del formulario
                userId: sessionStorage.getItem('id'),
                name: '',
                description: '',
                address: '',
                images: [{ url: '' }],
                type: '',
                characteristics: [],
                score: 0,
                country: 'Uruguay',
                region: ''
            });
        } catch (error) {
            console.error('Hubo un error al enviar la información', error);
            alert('Error al enviar la información');
        }
    };


    const handleChange = (e) => { // Función para manejar el cambio en los campos del formulario
        const { name, value } = e.target; // Obtiene el nombre y el valor del campo
        if (name === "images") { // Verifica si el campo es "images"
            setFormData({ ...formData, images: [{ url: value }] }); // Actualiza el estado de las imágenes con la URL proporcionada
        } else if (name === "characteristics") { // Verifica si el campo es "characteristics"
            setFormData({ ...formData, characteristics: value.split(',') }); // Actualiza el estado de características con el valor separado por comas
        } else {
            setFormData({ ...formData, [name]: value }); // Actualiza el estado del formulario con el nombre y valor del campo
        }
    };

    useEffect(() => { // Hook useEffect para realizar acciones después de cada renderizado

       if(handleSubmit){ // Verifica si el formulario ha sido enviado
        console.log('se actualiza la página con exito');
       }
    }, [formData]);




    return (



        <Accordion>
            <Accordion.Item eventKey="1">
                <Accordion.Header><h5>Agregar Lugar</h5></Accordion.Header>
                <Accordion.Body>
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



                        <Button type="submit" className='button' variant="secondary">Agregar lugar</Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>




    );
}

export default AgregarLugar;