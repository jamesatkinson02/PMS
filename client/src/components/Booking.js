import React, {useReducer, useState} from 'react';
import useToken from "../hooks/useToken.js";
import {Container, Row, Col, Button, Popover, OverlayTrigger, Tooltip, Form, Fade, Alert, Card, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
import './Booking.css';
import formReducer from '../reducers/formReducer.js';
import {BookingSearch} from './BookingSearch';
import { useNavigate } from 'react-router-dom';

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
  const initialFormState = {
    parkingLot: '',
    dateFrom: '',
    dateTo: '',
    timeFrom: '',
    timeTo: '',
    tenDayError: false,
    location: {longitude:null, latitude: null},
    
  }

    const [state, dispatch] = useReducer(formReducer,initialFormState );
    const [noMoreSpaces, setNoMoreSpaces] = useState(false);
    const changeHandler = e => {
      dispatch({type: 'FORM INPUT', field: e.target.name, payload: e.target.value});
     }

    let {token, setToken} = useToken();

    let navigate = useNavigate();


    
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
            if(((new Date(state.dateTo).getTime() - new Date(state.dateFrom).getTime()) / (1000*3600*24)) > 10)
            {
                dispatch({type: 'TOGGLE TEN DAY ERROR'});
                return;
            }

            const request =  fetch('/api/request-parking', {
              method: 'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({token, parkingLot:state.parkingLot, dateFrom:state.dateFrom, dateTo:state.dateTo, timeFrom:state.timeFrom, timeTo:state.timeTo})
          });
          

          request.then(resp => resp.json()).then(data => {
            if(data.error)
            {
              console.error(data.error);
              //dispatch({type: 'TOGGLE NO MORE SPACES MODAL'});
              setNoMoreSpaces(true);
              return;
            }
           //   dispatch({type: 'SET MAP LOCATION', location:{longitude:data.longitude, latitude:data.latitude}});
              navigate('/booking/search', {state: {token: token, pricing: data.prices, spacesTable:data.spacesTable, spaces: data.spaces, freeSpaces: data.freeSpaces, parkingLot: state.parkingLot, timeFrom:state.timeFrom, timeTo:state.timeTo, dateFrom:state.dateFrom, dateTo: state.dateTo, longitude: data.longitude, latitude:data.latitude}});
              
              
            });
            
            
        }
        
       return(  //state.location.longitude && state.location.latitude ? <BookingSearch state={state} />
       //:    
          <div>
            <Modal show={noMoreSpaces} onHide={() => setNoMoreSpaces(false)}>
            <Modal.Header closeButton>
                <Modal.Title id="container-model-title-vcenter">
                    PMS
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Unfortunately, All parking spaces have been reserved! <br />Please try again later.
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setNoMoreSpaces(false)}>Close</Button>
            </Modal.Footer>
            </Modal>
          <div className="hero-image" >
              <div  className="d-flex justify-content-center align-items-center">
                <div className="bookingContainer">
                    <Form className="formColour bookingTextForm" onSubmit={handleSubmit} method="POST">
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
                                <Form.Control type="date" min={state.dateFrom} max={addDays(state.dateFrom, 10)} name="dateTo" id="dateTo" onChange={changeHandler} required/>
                                {state.dateFrom === state.dateTo ? <Form.Control type="time" min={state.timeFrom} max="23:59" name="timeTo" id="timeTo" onChange={changeHandler} required/> :  <Form.Control type="time" min={"0:00"} max="23:59" name="timeTo" id="timeTo" onChange={changeHandler} required/>}
                                
                                <Alert key={'alert'} variant="danger" style={{opacity:"90%", marginTop:"10px"}} show={state.tenDayError} onClose={() => dispatch({type: 'TOGGLE TEN DAY ERROR'})} dismissible>You can only park up to a maximum of 10 days!</Alert>
           
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">Find Parking Space</Button>
                    </Form>
                </div>
          </div>

        </div>
  
        </div>)
       
             
}