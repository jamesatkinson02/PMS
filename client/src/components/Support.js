import "./Support.css";
import {React, useReducer, useState} from 'react';
import useToken from '../hooks/useToken'; 

export function Support()
{

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [msg, setMsg] = useState(null);
  const {token, setToken} = useToken();


  const handleSubmit = () => {
    fetch('/api/send-ticket', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({token, name, email, msg})
    }).then(resp => resp.statusText).then(value => alert(msg));

    console.log(name, email, msg);
  }

    return(
//Ticket Systen Frontend    
<div>
<div class="container mt-5">
        <button type="button" class="btn btn-primary ModalTicket" data-bs-toggle="modal" data-bs-target="#myModal">Contact Us</button>
        <div class="modal" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Contact Us</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label class="form-label required">Name</label>
                                <input type="text" class="form-control"  onChange = {(e) => setName(e.target.value)} required/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Email</label>
                                <input type="email" class="form-control" onChange = {(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Type your message here</label>
                                <textarea class="form-control" onChange = {(e) => setMsg(e.target.value)} required></textarea>
                            </div>

                            <div>
                              <em> Contact an admin directly at: <strong>07856463579</strong> </em>
                            </div>

                            <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button class="btn btn-danger" data-bs-dismiss="modal" >Cancel</button>
                        </div>
                        </form>
                    
           
                    </div>
                </div>
            </div>
        </div>
    </div>
    
        

{/* Frequently asked Questions         */}
        <h1><b>Frequently Asked Questions</b></h1>
        <div class="SupportDropdown" id="SupportDrop">
  <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseOne" aria-expanded="false" aria-controls="Support-collapseOne">
        <h5><b>How do I get a refund?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseOne" class="accordion-collapse collapse" aria-labelledby="Support-headingOne" data-bs-parent="#SupportDrop">
      <div class="accordion-body">Please contact our support team if you wish to receive a refund. You may open a support ticket or call us using the info on our contact page.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseTwo" aria-expanded="false" aria-controls="Support-collapseTwo">
      <h5><b>Is the parking secure?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseTwo" class="accordion-collapse collapse" aria-labelledby="Support-headingTwo" data-bs-parent="#SupportDrop">
      <div class="accordion-body">Yes, our security is managed by the UEA security team. Furthermore, security cameras watch over the entire car park.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseThree" aria-expanded="false" aria-controls="Support-collapseThree">
      <h5><b>How late can I cancel?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseThree" class="accordion-collapse collapse" aria-labelledby="Support-headingThree" data-bs-parent="#SupportDrop">
      <div class="accordion-body"> You may cancel your booking <b>12 hours</b> prior to its starting time.
                                You will receive a refund if within this time frame. Should you 
                                wish to cancel later, then you must call us to discuss why. Reasons out 
                                of your control will give you access to a full refund/reschedule.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseFour" aria-expanded="false" aria-controls="Support-collapseFour">
      <h5><b>Can I make an alteration to my booking?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseFour" class="accordion-collapse collapse" aria-labelledby="Support-headingFour" data-bs-parent="#SupportDrop">
      <div class="accordion-body"> Yes, log in to your account to access your bookings.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingFive">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseFive" aria-expanded="false" aria-controls="Support-collapseFive">
      <h5><b>Do I receive money back for leaving early?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseFive" class="accordion-collapse collapse" aria-labelledby="Support-headingFive" data-bs-parent="#SupportDrop">
      <div class="accordion-body"> Unfortunately, we do not give money back for leaving early. We apologize for any inconveniences.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingSix">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseSix" aria-expanded="false" aria-controls="Support-collapseSix">
      <h5><b>How do I cancel my parking spot?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseSix" class="accordion-collapse collapse" aria-labelledby="Support-headingSix" data-bs-parent="#SupportDrop">
      <div class="accordion-body"> Log in to your account to access your bookings. From here you may 
                                cancel a booking you have made. Contact us if you encounter any issues.</div>
    </div>
  </div>


  <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingSeven">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseSeven" aria-expanded="false" aria-controls="Support-collapseSeven">
      <h5><b>My vehicle was damaged, what can I do?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseSeven" class="accordion-collapse collapse" aria-labelledby="Support-headingSeven" data-bs-parent="#SupportDrop">
      <div class="accordion-body"> If someone hits your parked car, the first thing you should do is call the police so they can investigate and create an accident report. 
      You'll also want to notify your insurance agent to start the claims process, as your auto insurance may help cover the damage to your vehicle if your policy includes collision coverage or 
      uninsured motorist coverage. We also have CCTV around the parking lots that we can provide to the authorities.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingEight">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseEight" aria-expanded="false" aria-controls="Support-collapseEight">
      <h5><b>How do I pay?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseEight" class="accordion-collapse collapse" aria-labelledby="Support-headingEight" data-bs-parent="#SupportDrop">
      <div class="accordion-body"> Payment methods include credit/debit cards and PayPal.</div>
    </div>
  </div>

  <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingNine">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseNine" aria-expanded="false" aria-controls="Support-collapseNine">
      <h5><b>Can I pay by Cash?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseNine" class="accordion-collapse collapse" aria-labelledby="Support-headingNine" data-bs-parent="#SupportDrop">
      <div class="accordion-body">  Unfortunately, we do not accept cash for online bookings. To pay by cash, you must pay at the parking lot.</div>
    </div>
  </div>
    
  <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingTen">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseTen" aria-expanded="false" aria-controls="Support-collapseTen">
      <h5><b>How do I write a support ticket?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseTen" class="accordion-collapse collapse" aria-labelledby="Support-headingTen" data-bs-parent="#SupportDrop">
      <div class="accordion-body"> Please click on "Contact us" top right to to write a support ticket.</div>
     </div>
    </div>
    <div class="accordion-item">

    <h2 class="accordion-header" id="Support-headingEleven">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseEleven" aria-expanded="false" aria-controls="Support-collapseEleven">
      <h5><b>What happens if I go over my time limit?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseEleven" class="accordion-collapse collapse" aria-labelledby="Support-headingEleven" data-bs-parent="#SupportDrop">
      <div class="accordion-body"> Unfortunately, if you exceed your time limit you will be fined for every 30 minutes exceeded.</div>
    </div>
    </div>
    
    <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingTwelve">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseTwelve" aria-expanded="false" aria-controls="Support-collapseTwelve">
      <h5><b>Can I change my parking spot?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseTwelve" class="accordion-collapse collapse" aria-labelledby="Support-headingTwelve" data-bs-parent="#SupportDrop">
      <div class="accordion-body"> You may change your parking spot up to 12 hours prior to your original booking.</div>
    </div>
    </div>

    <div class="accordion-item">
    <h2 class="accordion-header" id="Support-headingThirteen">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#Support-collapseThirteen" aria-expanded="false" aria-controls="Support-collapseThirteen">
      <h5><b>Someone is parked in my space, what do I do?</b></h5>
      </button>
    </h2>
    <div id="Support-collapseThirteen" class="accordion-collapse collapse" aria-labelledby="Support-headingThirteen" data-bs-parent="#SupportDrop">
      <div class="accordion-body"> Please get in touch with one of our members of staff via "Contact Us" and they will assist you as soon as possible.</div>
    </div>
    </div>


    </div>
</div>)
}