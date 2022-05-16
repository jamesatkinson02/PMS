import {React, useState, useEffect} from 'react';
import {Card, Container, Row, Col, Button, Modal} from 'react-bootstrap';
import useToken from "../hooks/useToken";



export default function ManageAccounts()
{
    const [accounts, setAccounts] = useState([]);
   
    let {token, setToken} = useToken();
    const [show, setShow] = useState(null);

    const accountInfo = useEffect(() => {
        let resp = fetch('/api/accounts-info', {
            method: 'POST',
            headers:{
                'Content-Type':'Application/json',
            },
            body:JSON.stringify({token:token})
            
        }).then(resp => resp.json()).then(value => {
            setAccounts(value);
        })
    }, []) 

    const handleSubmit = () => {
        fetch('api/ban-user', {
            method: 'POST',
            headers:{
                'Content-Type':'Application/json',
            },
            body:JSON.stringify({token:token, username:show})
        });

        setAccounts(null);
        window.location.reload();
    }

    const banModal = (name) => {
  
    }

    return <div> <Container>
        {accounts.map(acc => 
        <Card>
            <Card.Header>
            <Card.Title>Account Information</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                Name: <br/>
                <strong>{acc.username}</strong>
                </Col>
                <Col>
                Email:<br/>
                <strong>{acc.email}</strong>
                </Col>
                <Col>
                Contact Number:<br/>
                <strong>{acc.contactNumber}</strong>
                </Col>
                <Col>
                Car Registration Plate:<br/>
                <strong>{acc.carRegistration}</strong>
                </Col>

    
                
                
       
                </Row>
            </Card.Body>
            <Card.Footer>
                <Button style={{float:"right"}} variant="danger" onClick={() => setShow(acc.username)}>Ban User</Button>
    
            </Card.Footer>
        </Card>
            )}

{show ?       <Modal show={show !== null}>
        <Modal.Header closeButton>
                <Modal.Title id="container-model-title-vcenter">
                    Cancel Booking
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to Ban <strong>{show}?</strong>               
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick = {() => handleSubmit()}>Yes</Button> <Button variant="danger" onClick = {() => setShow(null)}>No</Button>
            </Modal.Footer>
        </Modal> : null}
            
        </Container></div>
}