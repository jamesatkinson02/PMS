import React, {useState} from 'react';
import useToken from "../hooks/useToken.js";
import {Container, Row, Col, Button, Popover, OverlayTrigger, Tooltip, Form, Fade} from 'react-bootstrap';
import './Booking.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {Icon} from 'leaflet';
import marker from '../images/marker-icon.png';
const myIcon = new Icon({iconUrl: marker, iconSize:[48,48]});
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

export function Booking()
{

    const [parkingLot, setParkingLot] = useState();
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [timeFrom, setTimeFrom] = useState();
    const [timeTo, setTimeTo] = useState();

    let {token, setToken} = useToken();
    
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

        const handleSubmit = async e => {
            e.preventDefault();

            fetch('/api/request-parking', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({token, parkingLot, dateFrom, dateTo, timeFrom, timeTo})
            }).then(resp => resp.json()).then(json => console.log(json));

        }

        const coordinates = [52.623041, 1.244426];
      return ( 
          <div>
          <div className="hero-image" >
              <div  className="d-flex justify-content-center align-items-center">
                <div className="bookingContainer">
                    <Form className="formColour bookingTextForm" onSubmit={handleSubmit}>
                        <h1 style={{fontFamily:"sans-serif"}}>Find on campus parking in seconds!</h1>
                        <p>Choose a parking lot near your destination!</p>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                            <Form.Label>Campus Location</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="parkingLot" onChange={e => setParkingLot(e.target.value)} >
                                <option disabled="disabled">Choose...</option>
                                <option>Main Car Park</option>
                                <option>West Car Park</option>
                                <option>Triangle Car Park</option>
                            </Form.Control>
                            </Form.Group>
                            
                            <Form.Group as={Col}>
                                <Form.Label>Parking From</Form.Label>
                                <Form.Control type="date"  min={today} name="dateFrom" onChange={e => setDateFrom(e.target.value)} required/>
                                <Form.Control type="time" min="0:00" max="23:59" name="timeFrom" onChange={e => setTimeFrom(e.target.value)} required/>
     
                            </Form.Group>
                            
                            <Form.Group as={Col}>
                                <Form.Label>Parking Till</Form.Label>
                                <Form.Control type="date" min={today} max="2022-05-12" name="dateTo" onChange={e => setDateTo(e.target.value)} required/>
                                <Form.Control type="time" min="0:15" max="23:59" name="timeTo" onChange={e => setTimeTo(e.target.value)} required/>
                            </Form.Group>
           
                        </Row>
                        <Button variant="primary" type="submit">Find Parking Space</Button>
                    </Form>
                </div>
          </div>

        </div>
        <MapContainer center={coordinates} zoom={12} style={{height:'50vh'}}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={myIcon}>
        <Popup>
            <span>
              A pretty CSS3 popup. <br/> Easily customizable.
            </span>
        </Popup>
      </Marker>
    </MapContainer>;

        </div>
        
    );
}