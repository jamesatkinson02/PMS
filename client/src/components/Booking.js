import React from 'react';
import {Container, Row, Col, Button, Popover, OverlayTrigger, Tooltip} from 'react-bootstrap';
import './Booking.css';

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
    let grid = parkingSpaceGrid();
        return (
            <div style={{ display: 'block', padding: 30 }}>
        <h1>Booking</h1>
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
  
    
      </Container>

      
      </div>

      );
      
}