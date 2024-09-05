import { Card, Button } from 'react-bootstrap';
import React from 'react';
import './Card.css';

function Lugar(props) {
    return (
        
        <div className="card-container">
            <Card className="custom-card" bg="dark" text="white">
                <Card.Img variant="top" src={props.imageUrl[0].url} className="card-image" />
                <Card.Body>
                    
                        <Card.Title>Nombre: {props.name}</Card.Title>
                        <Card.Text>
                            Descripción: {props.description}
                        </Card.Text>
                    
                        <Button variant="primary">Saber más</Button>
                        
                </Card.Body>
            </Card>
        </div>
        
    );
}

export default Lugar;
