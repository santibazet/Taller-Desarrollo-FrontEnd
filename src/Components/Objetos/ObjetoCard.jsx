import { Card, Button } from 'react-bootstrap';
import React from 'react';

function ObjetoCard(props) {
    // Verifica si props.imageUrl está definido y si props.imageUrl[0] está definido antes de acceder a props.imageUrl[0].url
    const imageUrl = props.imageUrl && props.imageUrl[0] && props.imageUrl[0].url;

    return (
        <div className="card-container">
            <Card className="custom-card" bg="dark" text="white">
                {/* Utiliza imageUrl solo si está definido */}
                {imageUrl && <Card.Img variant="top" src={imageUrl} className="card-image" />}
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

export default ObjetoCard;

