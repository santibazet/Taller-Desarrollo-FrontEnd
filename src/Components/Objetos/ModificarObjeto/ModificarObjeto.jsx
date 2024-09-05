import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";


function ModificarObjeto() {
    // Estado para almacenar la lista de lugares
    const [lugares, setLugares] = useState([]);
    const { IdObjeto } = useParams(); // Obtiene el ID del objeto de los parámetros de la URL
    
    // Estado para almacenar el formulario de datos
    const [formData, setFormData] = useState({
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

    // useEffect para cargar la lista de lugares al montar el componente
    useEffect(() => {
        const loadData = async () => {
            const url = 'https://history-hunters-evening-api.onrender.com/places';

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                setLugares(result.data);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        loadData();
    }, []);

    // Función para manejar el envío del formulario de modificación
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://history-hunters-evening-api.onrender.com/founds/update/' + IdObjeto;
    
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Convierte el formulario a formato JSON y lo envía en la solicitud PUT
            });
            
            window.location.assign('/objetos/' + IdObjeto); // Redirecciona a la página del objeto modificado
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
        } catch (error) {
            console.error('Error al enviar la solicitud PUT:', error);
        }
    };
    
    
    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target; // Extrae el nombre y el valor del campo que ha cambiado
        
        if (name === "images") { // Verifica si el campo que ha cambiado es "images"
            
            // Actualiza el estado formData, manteniendo los valores actuales y reemplazando "images" 
                        //con un nuevo array que contiene la URL proporcionada
            setFormData({ ...formData, images: [{ url: value }] });
       
        } else if (name === "placeId") { // Verifica si el campo que ha cambiado es "placeId"
           
            // Convierte el valor a un número y actualiza el estado formData, manteniendo los 
                //valores actuales y reemplazando "placeId" con el nuevo valor numérico
            setFormData({ ...formData, placeId: Number(value) });
        
        } else { // Si el campo que ha cambiado no es "images" ni "placeId"
            
            // Actualiza el estado formData, manteniendo los valores actuales y reemplazando 
                            //el campo que ha cambiado con el nuevo valor
            setFormData({ ...formData, [name]: value });
        }
    };



    return ( // Carga el formulario

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
            <Button type="submit" className='button' variant="secondary">Modificar objeto</Button>


        </Form>
    );

}

export default ModificarObjeto;