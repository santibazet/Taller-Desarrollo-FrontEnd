import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';


function AgregarObjeto() {
    const [lugares, setLugares] = useState([]); // Estado para los lugares disponibles
    const [formData, setFormData] = useState({ // Estado para los datos del formulario
        userId: Number(sessionStorage.getItem('id')), // Obtiene el ID de usuario de la sesión
        placeId: 1,
        name: '',
        description: '',
        date: '',
        images: [{ url: '' }],
        type: 'Belicos',
        city: '',
        country: 'Uruguay',
        region: 'Este'
    });

    useEffect(() => { // Hook useEffect para cargar los lugares disponibles al montar el componente
        const loadData = async () => { // Función asincrónica para cargar los lugares
            const url = 'https://history-hunters-evening-api.onrender.com/places'; // URL para obtener los lugares

            try {
                const response = await fetch(url); // Realiza la solicitud de lugares
                if (!response.ok) { // Verifica si la respuesta no es exitosa
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json(); // Convierte la respuesta a formato JSONvvvvvvvvvvvvv
                setLugares(result.data); // Actualiza el estado con los lugares obtenidos
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        loadData(); // Llama a la función para cargar los lugares
    }, []); // Se ejecuta una vez al montar el componente

    const handleSubmit = async (e) => { // Función para manejar el envío del formulario
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        try {
            const response = await fetch('https://history-hunters-evening-api.onrender.com/founds/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Error!');
            }
            const result = await response.json(); // Convierte la respuesta a formato JSON
            console.log(result.data); // Muestra los datos en la consola
            alert('Información enviada correctamente'); // Muestra una alerta de éxito
            setFormData({ // Restablece los valores del formulario
                userId: Number(sessionStorage.getItem('id')),
                placeId: 1,
                name: '',
                description: '',
                date: '',
                images: [{ url: '' }],
                type: 'Belicos',
                city: '',
                country: 'Uruguay',
                region: 'Este'
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
        } else if (name === "placeId") { // Verifica si el campo es "placeId"
            setFormData({ ...formData, placeId: Number(value) }); // Actualiza el estado del ID de lugar con el valor convertido a número
        } else {
            setFormData({ ...formData, [name]: value }); // Actualiza el estado del formulario con el nombre y valor del campo
        }
    };

    return (


        <Accordion>
            <Accordion.Item eventKey="1">
                <Accordion.Header><h5>Agregar Objeto</h5></Accordion.Header>
                <Accordion.Body>
                    <Form className="text-light" onSubmit={handleSubmit}>


                        <Form.Select aria-label="Default select example" name="placeId" value={formData.placeId} onChange={handleChange}>
                            {lugares.map((lugar) => (
                                <option value={lugar.id}>{lugar.name}</option>
                            ))}
                        </Form.Select>
                        <br />
                        <Form.Control type="text" placeholder="Nombre" name="name" value={formData.name} onChange={handleChange} />
                        <br />
                        <Form.Control type="text" placeholder="Descripción del Lugar" name="description" value={formData.description} onChange={handleChange} />
                        <br />

                        <Form.Control type="text" placeholder="Ingresa URL de la imágen aquí" name="images" value={formData.images[0].url} onChange={handleChange} />
                        <br />
                        <Form.Control type="text" placeholder="Ciudad" name="city" value={formData.city} onChange={handleChange} />
                        <br />

                        <Form.Select aria-label="Default select example" name="type" value={formData.type} onChange={handleChange}>
                            <option value="Belicos">Bélicos</option>
                            <option value="Cotidianos">Cotidianos</option>
                            <option value="Otros">Otros</option>
                        </Form.Select>
                        <br />
                        <Form.Select aria-label="Default select example" name="country" value={formData.country} onChange={handleChange}>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Brasil">Brasil</option>
                        </Form.Select>
                        <br />
                        <Form.Select aria-label="Default select example" name="region" value={formData.region} onChange={handleChange}>
                        <option value="Norte">Norte</option>
                            <option value="Sur">Sur</option>
                            <option value="Este">Este</option>
                            <option value="Oeste">Oeste</option>
                            <option value="Sureste">Sureste</option>
                            <option value="Suroeste">Suroeste</option>
                            <option value="Noroeste">Noroeste</option>
                            <option value="Noreste">Noreste</option>
                        </Form.Select>
                        <br />
                        <Button type="submit" className='button' variant="secondary">Agregar objeto</Button>


                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>



    );
}

export default AgregarObjeto;