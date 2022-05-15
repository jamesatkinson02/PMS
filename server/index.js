const express = require("express");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');
const crypto = require('crypto'); 


const PORT = process.env.PORT || 3001;
var cors = require('cors');
const { allowedNodeEnvironmentFlags } = require("process");
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.use("/api/login", (req, res) => {
  let obj = {
    users: []
  }

  const data = fs.readFileSync(`${__dirname}/db/drivers.json`);

  if(data.length == 0)
  {
    res.status(400).send({message: 'User table empty!'});
    return;
  }


  obj = JSON.parse(data);
  
  const isUserFound = obj.users.find(item => item.username === req.body.username && item.password === crypto.createHash('md5').update(req.body.password).digest('hex'));


    if(isUserFound)
    {
     
      jwt.sign({admin: isUserFound.admin, name: isUserFound.username}, process.env.TOKEN_SECRET, {expiresIn: '1h'}, function(err, tok)
      {
        res.send({token:tok});
      });
    }
    else
    {
   
      res.status(400).send({message:'Incorrect username/password!'});
    }

});

app.use("/api/register", (req, res) => {
  req.body.password = crypto.createHash('md5').update(req.body.password).digest("hex");
  const str = JSON.stringify(req.body);

  let obj = {
    users: []
  }

  const buffer = fs.readFileSync(`${__dirname}/db/drivers.json`);

  obj = JSON.parse(buffer);

  obj.users.push({username: req.body.username, password : req.body.password, email: req.body.email, 
  carRegistration: req.body.carRegistration, contactNumber: req.body.contactNumber, admin: false});

  fs.writeFileSync(`${__dirname}/db/drivers.json`, JSON.stringify(obj));


})

app.use('/api/verify-token', (req, res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
  {
    if(err)
    {
      res.send(err);
    }
    else
      res.send(decoded);
  });
})

app.use("/api/my-bookings", (req,res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
  {
    if(err)
      res.status(401).send(err);
    else
    {
      const buffer = fs.readFileSync(`${__dirname}/db/drivers.json`);

      const json = JSON.parse(buffer);
      let reservation = json.reservations.filter(reserve => reserve.user === decoded.name);


      reservation.map(reserve => {json.locations.map(loc => {reserve.parkingLot === loc.name ? reserve["image"] = loc["image"] : null })});
      if(reservation)
      {
        res.send({reservations: reservation});
      }
    }
  })
})

app.use("/api/delete-bookings", (req,res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
  {
    if(err)
      res.status(401).send(err);
    else{
      const buffer = fs.readFileSync(`${__dirname}/db/drivers.json`);

      const json = JSON.parse(buffer);

      let result = json.reservations.filter(reserve => req.body.bookingID !== reserve.bookingID);

      json.reservations = result;

      fs.writeFileSync(`${__dirname}/db/drivers.json`, JSON.stringify(json));

    }
  })
})

app.use('/api/make-reservation', (req, res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
  {
    if(err)
      res.status(401).send(err);
    else
    {
      const buffer = fs.readFileSync(`${__dirname}/db/drivers.json`);


      var crypto = require("crypto");
      var id = crypto.randomBytes(20).toString('hex');

      const json = JSON.parse(buffer);
      json.reservations.push({user:decoded.name, bookingID:id, parkingLot: req.body.parkingLot, price: req.body.price, dateFrom: req.body.dateFrom, dateTo: req.body.dateTo, timeFrom: req.body.timeFrom, timeTo: req.body.timeTo})

      fs.writeFileSync(`${__dirname}/db/drivers.json`, JSON.stringify(json));
    }
  })
})

app.use('/api/request-parking', (req, res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
  {

    if(err)
      res.status(401).send(err);
    else
    {

      const buffer = fs.readFileSync(`${__dirname}/db/drivers.json`);


      const json = JSON.parse(buffer);

      const parkingLocation = json.locations.find(location => location.name === req.body.parkingLot);


      if(parkingLocation)
      {
        if(parkingLocation.freeSpaces <= 0)
        {
          res.send({error: "Unfortunately, all parking spaces have been reserved!\nPlease Try Again Later!"});
          console.log("yes");
          return;
        }
        //json.reservations.push({user:decoded.name, parkingLot: req.body.parkingLot, dateFrom: req.body.dateFrom, dateTo: req.body.dateTo, timeFrom: req.body.timeFrom, timeTo: req.body.timeTo})


       // fs.writeFileSync(`${__dirname}/db/drivers.json`, JSON.stringify(json));
       res.send({spaces: parkingLocation.spaces, freeSpaces:parkingLocation.freeSpaces, prices: parkingLocation.pricing, longitude: parkingLocation.longitude, latitude: parkingLocation.latitude });
      }
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});