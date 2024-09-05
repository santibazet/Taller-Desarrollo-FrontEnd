import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Cargando from "../Cargando/Cargando";
import './InfoObjetos.css';
import Reviews from "../Reviewss/Reviewss";
import AddReview from "../AgregaReview/AgregaReview";
import ModificarObjeto from "./ModificarObjeto/ModificarObjeto";

function InfoObjectCard() {
    // Estado para almacenar los datos del objeto, del lugar, del usuario y las reviews
    const [data, setData] = useState(null);
    const [dataLugar, setDataLugar] = useState(null);
    const [dataUser, setDataUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [dejoReview, setDejoReview] = useState(false);
    const { IdObjeto } = useParams();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);

    // useEffect para cargar los datos del objeto
    useEffect(() => {
        const loadData = async () => {
            const url = 'https://history-hunters-evening-api.onrender.com/founds/' + IdObjeto;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        loadData();
    }, []);


    // useEffect para cargar los datos del usuario creador del objeto
    useEffect(() => {

        if (data) {
            const loadDataa1 = async () => {
                const url2 = `https://history-hunters-evening-api.onrender.com/users/profile/${data.userId}`;

                try {
                    const response2 = await fetch(url2);
                    if (!response2.ok) {
                        throw new Error('Error al obtener los datos');
                    }
                    const result2 = await response2.json();
                    setDataUser(result2.data);
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            };
            

            loadDataa1();
        }
    }, [data]);

    


    // useEffect para cargar los datos del lugar donde se encontró el objeto
    useEffect(() => {

        if (data) {
            const loadDataa = async () => {
                const url1 = 'https://history-hunters-evening-api.onrender.com/places/' + data.placeId;

                try {
                    const response1 = await fetch(url1);
                    if (!response1.ok) {
                        throw new Error('Error al obtener los datos');
                    }
                    const result1 = await response1.json();
                    setDataLugar(result1.data);
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            };

            loadDataa();
        }
    }, [data]);


    // useEffect para cargar las reviews relacionadas con el objeto
    useEffect(() => {

        if (data) {
            const loadDataReview = async () => {
                try {
                    const urlReviews = 'https://history-hunters-evening-api.onrender.com/reviews';
                    const responseReviews = await fetch(urlReviews);
                    if (!responseReviews.ok) {
                        throw new Error('Error al obtener los datos');
                    }
                    const resultReviews = await responseReviews.json();
                    const reviewsSinFiltrar = resultReviews.data;
                    const reviewsParaEsteSitio = reviewsSinFiltrar.filter((review) => review.foundId === Number(IdObjeto));


                    setReviews(reviewsParaEsteSitio);
                    setDejoReview(false);
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            }

            loadDataReview();
        }




    }, [data, dejoReview]);

    // Función para manejar la eliminación del objeto
    const handleSubmitDelete = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://history-hunters-evening-api.onrender.com/founds/delete/' + IdObjeto;
    
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            window.location.assign('/objetos/');

    
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
        } catch (error) {
            console.error('Error al enviar la solicitud DELETE:', error);
        }
    };


    // Renderizado condicional basado en la carga de datos
    return data && dataLugar && dataUser ? (
        <>
            <div className="info-contenedor">
                <img className="imagen" src={data.images[0].url} alt={data.name} />
                <div className="texto">
                    {data.date && <h6><strong>Subido el </strong>{data.date}</h6>}


                <Button variant="primary" onClick={handleShow}>
                        Modificar
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDelete}>
                        Eliminar
                    </Button>
                    
                    
                    


                    <h2><strong>Nombre: </strong>{data.name}</h2>
                    <p><strong>Descripción: </strong> {data.description}</p>
                    <Link className="link-router" to={`/lugares/${data.placeId}`}>
                        <h5>Se encontró en:  {dataLugar && dataLugar.name}</h5>
                    </Link>
                    <p>De tipo: {data.type}</p>
                    <p><strong>Ubicación - </strong>País: {data.country}, Región: {data.region}</p>
                    <Link to={`/usuario/${data.userId}`}>{dataUser && <h5 className="creadoUsuario">Creado por {dataUser.name} {dataUser.lastName}</h5>}</Link>
                    {reviews.length > 0 && (<Reviews reviews={reviews} />)}
                    <AddReview foundId={IdObjeto} onChange={setDejoReview} />
                </div>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModificarObjeto object={IdObjeto}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    ) : (<Cargando />)
}

export default InfoObjectCard;