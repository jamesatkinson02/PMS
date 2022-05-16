import React from 'react';
import "./About.css";

export function About()
{
    return(<div>
        <h1 className='about'>About</h1>
 
        <p >Commuting to and from university should be a stress-free experience. This, however, is often not the
            case. Many of those working or studying at the University of East Anglia live far enough away from
            campus that they are unable to walk or cycle in each morning. They instead might commute by car
            and commuting by car necessitates that they must also park their car somewhere each morning.</p>
        <p>Not knowing for certain if you will be able to find a parking space can be stressful and if a commuter
            is unable to find an appropriate parking space, they may be forced to try and find a space elsewhere
            which can lead to delays getting into campus.</p>
        <p>The aim of our system is to alleviate this feeling of uncertainty for commuters at UEA by allowing
            them to ascertain ahead of time if there are spaces available in the car park. By allowing commuters
            to reserve spaces in the future, they will ensure that they won’t have to waste time searching for a
            parking space once they arrive, and they will be certain that a space is waiting for them when they
            arrive.</p>
        <p>Our parking management system provides a streamlined approach to parking, saving valuable
            minutes off our commuter’s journeys and allowing them to focus on what really matters.</p>
        
        Developers: Sam Sanders, Khalid Mihaimied, Harvey Robinson, James Atkinson, Ercan Arslan
        <img class="d-block w-100 img-2" src={require("../images/large-car-park.jpeg")} alt="..."></img>
    </div>

    )
}