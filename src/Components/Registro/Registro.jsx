import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';

function Registro() {
    // Estado para el form de registro
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        address: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // Acceder a la función de navegación

    const handleChange = (e) => { // Función para manejar los cambios en los campos del formulario
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onLoginn = () => { // Define la función aquí
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("https://history-hunters-evening-api.onrender.com/users/login", {
            method: "POST",
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            }),
            headers: myHeaders
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 200) {
                    const data = result.data;
                    sessionStorage.setItem('id', data.user.id);
                    window.location.assign('/inicio');
                } else {
                    alert('Usuario no encontrado');
                }

            })
            .catch((error) => {
                console.error(error)
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try { // Envío de la solicitud POST para registrar al usuario
            const response = await fetch('https://history-hunters-evening-api.onrender.com/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            const data = result.data;
            console.log('Usuario registrado:', data);
            alert('Usuario creado exitosamente!');
            onLoginn();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='login'>
            <Form className="text-light" onSubmit={handleSubmit}>
                <InputGroup hasValidation>
                    <InputGroup.Text>Nombre</InputGroup.Text>
                    <Form.Control type="text" required isInvalid name="name" value={formData.name} onChange={handleChange} />
                </InputGroup>
                <br />

                <InputGroup hasValidation>
                    <InputGroup.Text>Apellido</InputGroup.Text>
                    <Form.Control type="text" required isInvalid name="lastName" value={formData.lastName} onChange={handleChange} />
                </InputGroup>
                <br />

                <InputGroup hasValidation>
                    <InputGroup.Text>Dirección</InputGroup.Text>
                    <Form.Control type="text" required isInvalid name="address" value={formData.address} onChange={handleChange} />
                </InputGroup>
                <br />

                <InputGroup hasValidation>
                    <InputGroup.Text>Correo electrónico</InputGroup.Text>
                    <Form.Control type="text" required isInvalid name="email" value={formData.email} onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">
                        Ingresa tu correo electrónico.
                    </Form.Control.Feedback>
                </InputGroup>

                <InputGroup hasValidation>
                    <InputGroup.Text>Contraseña</InputGroup.Text>
                    <Form.Control type="text" required isInvalid name="password" value={formData.password} onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">
                        Ingresa una contraseña.
                    </Form.Control.Feedback>
                </InputGroup>

                <div className='container'>
                    <Button className='button' variant="secondary" type="submit" >
                        Registrarse
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Registro;