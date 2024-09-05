import { Button, Form, FloatingLabel } from 'react-bootstrap';
import React, { useState } from 'react';
import Cargando from '../Cargando/Cargando';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    
    // Define los headers de la solicitud HTTP a la API
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Define el estado para el correo electrónico, contraseña y estado de carga
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setcargando] = useState(false);

    function onLogin() {
        // Muestra el estado de carga
        setcargando(true);
        // Realiza la solicitud HTTP para iniciar sesión
        fetch("https://history-hunters-evening-api.onrender.com/users/login",
            {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: myHeaders
            })
            .then((response) => response.json()) // Parsea la respuesta como JSON
            .then((result) => { 
                // Verifica si el inicio de sesión fue exitoso
                if (result.status === 200) {
                    // Si el inicio de sesión fue exitoso, guarda el ID del usuario en sessionStorage y redirige a la página de inicio
                    const data = result.data;
                    sessionStorage.setItem('id', data.user.id);
                    window.location.assign('/inicio');
                } else {
                    // Si el inicio de sesión falla, muestra una alerta
                    alert('Usuario no encontrado');
                }
                setcargando(false);
            })
            .catch((error) => {
                setcargando(false);
                console.error(error)
            });
    }


// Renderiza el componente de carga si el estado de carga es verdadero
    // De lo contrario, renderiza el formulario de inicio de sesión

    return cargando ? (<Cargando />) :
        (
            <div className='login'>


                <FloatingLabel
                    controlId="floatingInput"
                    label="Correo electrónico"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="Correo electrónico" onChange={(event) => setEmail(event.target.value)}/>
                </FloatingLabel>

                <Form.Text className="text-light">
                    Tus datos personales estan protegidos con nosotros.
                </Form.Text>

                <FloatingLabel controlId="floatingPassword" label="Contraseña">
                    <Form.Control type="password" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)}/>
                </FloatingLabel>


                
                    <Form.Label className="text-light">Si aún no tienes una cuenta </Form.Label><Link to={`/registrate`}> Registrate aquí </Link>

                    <div className='container' >
                        <Button className='button' variant="secondary" onClick={onLogin} type="submit">
                            Ingresar
                        </Button>
                    </div>
                
            </div>
        );
}

export default Login;