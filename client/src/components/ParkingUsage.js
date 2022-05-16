import {React, useState, useEffect} from 'react';
import {Card, Container, Row, Col, Button, Modal} from 'react-bootstrap';
import useToken from "../hooks/useToken";

export default function ParkingUsage()
{

    const {token, setToken} = useToken();
    const [stats, setStats] = useState([]);
    const [parkingState, setParkingState] = useState(null);
     const handleSubmit = () => 
    {
        fetch('/api/delete-parkingLot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token, name: parkingState})
        }).then(resp => resp.text()).then(msg => alert(msg));
        window.location.reload();
    }


    const viewBookings = useEffect(() => {
        fetch('/api/parking-usage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        
            },
            body: JSON.stringify({token:token})
        }).then(resp => resp.json()).then(value => {
            setStats(value.parkingLots);
        })
    }, []);

        return <Container> <h1>Parking Usage</h1> {stats.map(parkingLots => <Card style={{marginTop:"10px"}}>
            <Card.Header>
                <Card.Title>Parking Lot</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col><strong>{parkingLots.name}</strong></Col>
                    <Col>Total Spaces: <strong>{parkingLots.spaces}</strong></Col>
                    <Col>Free Spaces: <strong>{parkingLots.freeSpaces}</strong></Col>
                </Row>
            </Card.Body>
            <Card.Footer><Button style={{float:"right"}} variant="danger" onClick={() => setParkingState(parkingLots.name)}>Remove Parking Lot</Button></Card.Footer>
        </Card>)} 
         <Modal show={ parkingState !== null}>
        <Modal.Header closeButton>
                <Modal.Title id="container-model-title-vcenter">
                    Cancel Booking
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick = {() => handleSubmit()}>Yes</Button> <Button variant="danger" onClick = {() => setParkingState(null)}>No</Button>    
            </Modal.Footer>
        </Modal> </Container>
}