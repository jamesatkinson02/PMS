import { React, useEffect, useState} from 'react';
import {Container, Card, ListGroup, Row, Col, Button, Modal} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import useToken from '../hooks/useToken';
import "./myBookings.css"

export default function MyBookings()
{
    const [bookings, setBookings] = useState([]);
    const [currentBooking, setCurrentBooking] = useState(null);
    const navigate = useNavigate();

    const initialState = {
        dateFrom: '',
        dateTo: '',
        timeFrom: '',
        timeTo: '',
    }

    let {token, setToken} = useToken();

    const cancelBooking = () => {
        fetch('/api/delete-bookings', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({token:token, bookingID:currentBooking})
        });
        setCurrentBooking(null);
        location.reload();
    }


    const viewBookings = useEffect(() => {
        fetch('/api/my-bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        
            },
            body: JSON.stringify({token:token})
        }).then(resp => resp.json()).then(data => {
         //   data.reservations.sort((a,b) => (new Date(a.dateFrom).getDay() >  new Date(b.dateFrom).getDay()) ? 1 : -1);

            data.reservations.sort((a,b) => {
                return new Date(b.dateFrom).getDate() - new Date(a.dateFrom).getDate();
            })
            setBookings(data.reservations);
        })
    }, []);


    return (
    <div  className="myBookingsContainer">
    <Container>
        {bookings.length == 0 ? <Card><Card.Header><h3>You currently have no parking reservations!</h3></Card.Header><Card.Body><Button onClick={() => navigate("/booking")}>Click to book</Button></Card.Body></Card> : null}
        {bookings.map(reserves =>
            <Row>
                <Col>
            <Card style={{padding:"5px", width:"auto"}}> 
                <Card.Header><strong>General Information</strong></Card.Header>
                <Card.Body>
                 <Row>
                <Col>
                <Card.Text>Parking Lot:<br/><strong>{reserves.parkingLot}</strong></Card.Text>
                {reserves.image ? <img id="your-img" src={require(`../images/${reserves.image}`)} /> : null}
                </Col>
                        <Col>
                        <Card.Text>From<br/><strong>{reserves.dateFrom}</strong><br/><strong>{reserves.timeFrom}</strong></Card.Text>
                        </Col>
                        <Col>
                        <Card.Text>To<br/><strong>{reserves.dateTo}</strong><br/><strong>{reserves.timeTo}</strong></Card.Text>
                        
                        </Col>
               
                        <Col>
                        <br/><Button className="myBookingsButton" variant="danger" onClick={() => setCurrentBooking(reserves.bookingID)}>Delete</Button>
       
                        <Button className="myBookingsButton" variant="success" onClick = {() => alert("A space has been deallocated!")}>I am Leaving</Button>
                        </Col>
                  

                </Row>
                </Card.Body>   
                <Card.Footer>
                    <Card.Text>Total: <strong>£{reserves.price}</strong></Card.Text>
                    </Card.Footer>     
            </Card>
          
            </Col>
            </Row>

            
        )}
        {(currentBooking !== null) ? <Modal show={(currentBooking !== null)} onHide={() => setCurrentBooking(null)} centered>
            <Modal.Header closeButton>
                <Modal.Title id="container-model-title-vcenter">
                    Cancel Booking
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to cancel your reservation?
               
                
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick = {() => cancelBooking()}>Yes</Button> <Button variant="danger" onClick = {() => setCurrentBooking(null)}>No</Button>
            </Modal.Footer>
        </Modal> : null }
        <Button onClick={() => navigate("/booking")}>Add a New Booking</Button>
    </Container>
    </div>
    );
} 
