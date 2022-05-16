import React, {useRef, useState, useMemo, useReducer } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents, Rectangle} from 'react-leaflet';
import {Icon} from 'leaflet';
import { Navigate, useLocation } from 'react-router-dom';
import {Row, Card, Container, Col, Form, Alert, Button, Tabs, Tab, Modal, Dropdown} from 'react-bootstrap';
import "./BookingSearch.css"
import PayPal from "./Paypal"
import useToken from "../hooks/useToken";
import "leaflet-routing-machine";
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;

//stops webpack overwriting the image urls for leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const serviceCharge = 1.38;

function generateParkingSpaces(rows, cols)
{
   let columns = new Array(cols);

   for(let i=0; i < cols; i++)
   {    
            columns[i] = <Col sm="auto" width="auto"><Button variant="primary"></Button></Col>      

   }

   return columns;
}


export function BookingSearch(props)
{
    const {state} = useLocation();
    let [show, setShow] = useState(false);
    const [checkout, setCheckOut] = useState(false);
    const [row, setRow] = useState(null);
    const [column, setColumn] = useState(null);
    

    let {token, setToken} = useToken();
 
    let obj = {pricing: null, spacesTable: null, spaces: null, freeSpaces: null, parkingLot: null, timeFrom: null, timeTo: null, dateFrom: null, dateTo: null, longitude: null, latitude: null};
    let parkingPrices = [];
    let numHours = 0; 

    let payment = 0;
    let map = null;

    const shape = [[52.623236, 1.241426], [52.623400, 1.241490]];

    let spacesOptions = [];


    let mapLocation = [];
    if(state)
    {
        
        obj = state;
        obj.spacesTable.map(row => Object.keys(row).forEach((key) => spacesOptions.push(<option>{key}</option>)))
        
    
        let dateFromObj = new Date(obj.dateFrom + " " + obj.timeFrom + ":00");
        let dateToObj = new Date(obj.dateTo + " " + obj.timeTo + ":00");
        
        mapLocation = [obj.longitude, obj.latitude];

        numHours = ((dateToObj.getTime() - dateFromObj.getTime()) / (1000*3600*24))*24;
        
        obj.pricing.map(item => parkingPrices.push(<div><strong>{item.title}</strong><br />{item.prices.map(pricing => <div>{pricing.title}: <strong>£{pricing.price}</strong></div>)}<br /></div>));

        const isWeekend = (dateFromObj.getDay() <= 7 && dateFromObj.getDay() >= 6) && (dateToObj.getDay() <= 7 || dateToObj.getDay() >= 6);
        
        if(dateFromObj.getHours() >= 6 && dateToObj.getHours() <= 10 && !isWeekend)
        {
            payment = 5 + serviceCharge;
        }
        else if(dateFromObj.getHours() >= 10 && dateToObj.getHours() <= 18 && !isWeekend)
        {

            if(numHours <= 1)
                payment = 1 + serviceCharge;
            else if(numHours == 2)
                payment = 3 + serviceCharge;
            else{
                payment = numHours + 0.5 + serviceCharge;
            }
        
        }
        else
        {
            payment = 1 + serviceCharge;
        }
        
    }
    else
    {
        mapLocation = [52.623116, 1.247257];     //placeholder val remove after
    }

    const changeHandler = (e) => {};

    const reserveSpace = () => {
        const request =  fetch('/api/make-reservation', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({token: token, parkingLot:obj.parkingLot, row:row, column:column, price:payment, dateFrom:obj.dateFrom, dateTo:obj.dateTo, timeFrom:obj.timeFrom, timeTo:obj.timeTo})
        }).then(resp => resp.text());
        setShow(false);

        console.log(row);

        request.then(string => alert(string));
        
        
    }

    const createOrder = (data, actions)  => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "0.01",
              },
            },
          ],
        });
    }
      
      const onApprove = (data, actions) => {
        return actions.order.capture();
      }

    const handleSubmit = () => {
        return (
            <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title id="container-model-title-vcenter">
                    Confirm Reservation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit = {reserveSpace}>
                    <Row>
                        <Col>
                    <Form.Group>
                        <Form.Label>Row</Form.Label>
                        <Form.Select defaultValue="Choose Section..." onChange={(e) => setRow(e.target.value)} required>
                            <option disabled="disabled">Choose Section...</option>
                            {spacesOptions}
                        </Form.Select>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                        <Form.Label>Column</Form.Label><br/>
                        <Form.Text className="text-muted"></Form.Text>
                        <Form.Control placeholder={`From 0 to ${spacesOptions.length-1}`} type="number" min={0} max={spacesOptions.length-1} onChange={(e) => setColumn(e.target.value)} required></Form.Control>
                        </Form.Group>
                        </Col>
                </Row>
                <Button variant="primary" type="submit">Pay Now</Button>
                </Form>
            </Modal.Body>
            
            <Modal.Footer>
            
               
                <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
         </Modal>);
    }

    const MapLocator = () =>
       {
           if(state)
           {
                 map = useMap();
                const message = ['University Drive', obj.parkingLot];
                    map.panTo(mapLocation);
               
               let route = L.Routing.control({
                   waypoints: [
                       L.latLng(52.623116, 1.247257),
                       L.latLng(mapLocation[0], mapLocation[1])
                    ],
                    draggableWaypoints: false,
                    addWaypoints:false,
                    createMarker: function(i,wp)
                    {
                        return L.marker(wp.latLng).bindPopup(message[i]);
                    },

                }).addTo(map);
                
                route.getContainer().hidden = true;
                
            }

         return <div></div>
       }

      
       const displayMap = useMemo(() => (
            <MapContainer  center={mapLocation} zoom={12} style={{height:'100vh'}}>
                <TileLayer attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" 
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <MapLocator />   
                <Rectangle bounds={shape} pathOptions={{color:'black'}} />
            </MapContainer> 
       ), [],)
       
       return (
       <Container fluid="xs" style={{backgroundColor:'lightgrey'}}>
           {/*
              <Row>
            <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                            <Form.Label>Campus Location</Form.Label>
                            <Form.Control as="select" defaultValue={obj.parkingLot} name="parkingLot" id="parkingLot" onChange={changeHandler} >
                                <option disabled="disabled">Choose...</option>
                                <option>Main Car Park</option>
                                <option>West Car Park</option>
                                <option>Triangle Car Park</option>
                            </Form.Control>
                            </Form.Group>
                            
                            <Form.Group as={Col}>
                                <Form.Label>Parking From</Form.Label>
                                <Form.Control type="date"  defaultValue={obj.dateFrom} name="dateFrom" id="dateFrom" onChange={changeHandler } required/>
                                <Form.Control type="time" min="0:00" max="23:59" name="timeFrom" id="timeFrom" onChange={changeHandler} required/>
     
                            </Form.Group>
                            
                            <Form.Group as={Col}>
                                <Form.Label>Parking Till</Form.Label>
                                <Form.Control type="date" defaultValue={obj.dateTo} name="dateTo" id="dateTo" onChange={changeHandler} required/>
                                <Form.Control type="time" min={"0:00"} max="23:59" name="timeTo" id="timeTo" onChange={changeHandler} required/>
                                <Alert key={'alert'} variant="danger" style={{opacity:"90%", marginTop:"10px"}} show={state.tenDayError} onClose={() => dispatch({type: 'TOGGLE TEN DAY ERROR'})} dismissible>You can only park up to a maximum of 10 days!</Alert>
           
                            </Form.Group>
                        <Form.Group as={Col}> <Button variant="primary" type="submit">Find Parking Space</Button>
                       </Form.Group>
                        </Row>
                    </Form>
                    </Row>
           */}
                   
           <Row style={{marginLeft:"5px"}}>
               
               {state ?
               <Col md="auto" class="col-xs-3" style={{float:"left"}}>
                   <Card style={{height:'100vh'}}>
                       <Card.Header>{obj.parkingLot} </Card.Header>
                       <Card.Body>
                           <Row>
                               <Col>
                                    <Card.Text>From: <br/><strong>{obj.dateFrom}</strong><br/><strong>{obj.timeFrom}</strong></Card.Text>
                               </Col>
                                    <Col><Card.Text>Till: <br/><strong>{obj.dateTo}</strong><br/><strong>{obj.timeTo}</strong></Card.Text>
                               </Col>
                            </Row>
                            <Row>
                                <Card.Text>Total Duration: <strong>{numHours} hours</strong></Card.Text>
                            </Row>
                            <Card>
                                <Card.Header>
                                    <Tabs defaultActiveKey="Information" id="booking-tab" className="mb-3">

                                       <Tab eventKey="Information" title="Information">
                                           {parkingPrices.map(item => item)}
                                           <strong>Service Fee is £{serviceCharge}</strong>
                                       </Tab>
                                       <Tab eventKey="Reviews" title="Reviews">
                                           <p> Reviews </p>
                                       </Tab>
                                       
                                       <Tab eventKey="how-to-park" title="How to Park">
                                           <p> How to Park </p>
                                       </Tab>
                                       
                                    </Tabs>
                                </Card.Header>
                            </Card>
                            <Row>
                                <Button variant="primary"  onClick={() => setShow(true)}>Reserve for £{payment}</Button>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col> : null } 
                
                <Col class="col-xs-3">
                    {displayMap}
                </Col>
            </Row>

            {show ? handleSubmit() : null}
         
        </Container> );
}