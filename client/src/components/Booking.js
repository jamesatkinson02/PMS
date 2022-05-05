import React from 'react';
import {Container, Row, Col, Button, Popover, OverlayTrigger, Tooltip, Form, Fade} from 'react-bootstrap';
import './Booking.css';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

function parkingSpaceGrid()
{
    let grid = new Array(18).fill(0).map(() => new Array(20).fill(0));

    for(let rows = 0; rows < 18; rows++)
    {
        for(let cols =0; cols < 25; cols++)
        {
            if(cols%2 != 0)
                grid[rows][cols] = (<Col sm="auto"><OverlayTrigger
                    placement="right"
                    trigger="click"
                    overlay={ <Tooltip id="button-tooltip">
                    {`Row ${rows+1}\nColumn ${cols+1}`}
                  </Tooltip>}
                  ><Button variant="primary"></Button></OverlayTrigger></Col>);
            else
                grid[rows][cols] = (<Col sm="auto"><Button variant="secondary" disabled={true}></Button></Col>);
     
    }
  
}
    return grid;
}

function onParkingSpaceSubmit()
{

}

export function Booking()
{
    /*
    let grid = parkingSpaceGrid();
        return (
            <div class="container">
        <Container>
            {grid.map((rows, i) => (
                <span key={i}>
                <Row sm="auto">
                    {rows.map((cols, j) => (
                        <span key={j}>{cols}</span>
                       
                       
                    ))}
                </Row>
                </span>
            ))}
        */
      return ( 
          <div className="hero-image" >
          <div  className="d-flex justify-content-center align-items-center">
           <div className="bookingContainer">
       <Form className="formColour bookingTextForm">
           <h1 style={{fontFamily:"sans-serif"}}>Find on campus parking in seconds!</h1>
           <p>Choose a parking lot near your destination!</p>
          <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridLocation">
                  <Form.Label>Campus Location</Form.Label>
                  <Form.Select defaultValue="Choose...">
                      <option>Main Car Park</option>
                      <option>West Car Park</option>
                      <option>Triangle Car Park</option>
                  </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="timeFrom">
                  <Form.Label>Parking From</Form.Label>
                  <Form.Control type="date" defaultValue={today} min={today} required/>
                  <Form.Control type="time" defaultValue="0:00" min="0:00" max="23:59" required/>
     
              </Form.Group>
              <Form.Group as={Col} controlId="timeTo">
                  <Form.Label>Parking Till</Form.Label>
                  <Form.Control type="date" defaultValue={today} min={today} max="2022-05-12" required/>
                  <Form.Control type="time" defaultValue="0:00" min="0:15" max="23:59" required/>
     
              </Form.Group>
           
          </Row>
          <Button variant="primary" type="submit">Find Parking Space</Button>
        </Form>
          </div>
          </div>
          </div>
      );
}