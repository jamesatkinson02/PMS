import React, {useEffect, useState} from 'react';
import useToken from "../hooks/useToken.js";
import {Container, Row, Col, Button, Popover, OverlayTrigger, Tooltip, Form, Fade, Alert} from 'react-bootstrap';
import './Booking.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {Icon} from 'leaflet';
import marker from '../images/parking-location.png';
const myIcon = new Icon({iconUrl: marker, iconSize:[32,32]});


//gets present date
var today = toStrDate(new Date());

//maximum stay of up to 10 days
var tenDaysFromNow = toStrDate(addDays(today, 10)); 

function addDays(date, days)
{
    
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
    
}

function toStrDate(date)
{
    var strDate = new Date(date);
    var dd = String(strDate.getDate()).padStart(2, '0');
    var mm = String(strDate.getMonth() + 1).padStart(2, '0');
    var yyyy = strDate.getFullYear();
    strDate = yyyy + '-' + mm + '-' + dd;  
    return strDate; 
}

function parseStrDate(str)
{
    return new Date(str);

}

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
    const [formValues, setFormValues] = useState({
        parkingLot: '',
        dateFrom: '',
        dateTo: '',
        timeFrom: '',
        timeTo: ''
    });

    const changeHandler = e => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
     }

    const [tenDayError, setTenDayError] = useState(false);
 
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

            //checks if dates are more than 10 days apart, which is prohibited.
            if(((new Date(formValues.dateTo).getTime() - new Date(formValues.dateFrom).getTime()) / (1000*3600*24)) > 10)
            {
                setTenDayError(true);
                return;
            }

            fetch('/api/request-parking', {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({token, parkingLot:formValues.parkingLot, dateFrom:formValues.dateFrom, dateTo:formValues.dateTo, timeFrom:formValues.timeFrom, timeTo:formValues.timeTo})
            }).then(resp => resp.json()).then(data => {
                    

            });



        

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
                            <Form.Control as="select" defaultValue="Choose..." name="parkingLot" id="parkingLot" onChange={changeHandler} >
                                <option disabled="disabled">Choose...</option>
                                <option>Main Car Park</option>
                                <option>West Car Park</option>
                                <option>Triangle Car Park</option>
                            </Form.Control>
                            </Form.Group>
                            
                            <Form.Group as={Col}>
                                <Form.Label>Parking From</Form.Label>
                                <Form.Control type="date"  min={today} name="dateFrom" id="dateFrom" onChange={changeHandler } required/>
                                <Form.Control type="time" min="0:00" max="23:59" name="timeFrom" id="timeFrom" onChange={changeHandler} required/>
     
                            </Form.Group>
                            
                            <Form.Group as={Col}>
                                <Form.Label>Parking Till</Form.Label>
                                <Form.Control type="date" min={formValues.dateFrom} name="dateTo" id="dateTo" onChange={changeHandler} required/>
                                <Form.Control type="time" min={"0:00"} max="23:59" name="timeTo" id="timeTo" onChange={changeHandler} required/>
                                <Alert key={'alert'} variant="danger" style={{opacity:"90%"}} style={{marginTop:"10px"}} show={tenDayError} onClose={() => setTenDayError(false)} dismissible>You can only park up to a maximum of 10 days!</Alert>
           
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