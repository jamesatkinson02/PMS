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

app.use('/api/delete-parkingLot', (req,res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
  {
    if(err)
      res.status(401).send(err);
      else{
        const buffer = fs.readFileSync(`${__dirname}/db/drivers.json`);
        const json = JSON.parse(buffer);
        const parkingLots = json.locations.filter(parkingLots => parkingLots.name !== req.body.name);
        json.locations = parkingLots;
        const reservations = json.reservations.filter(reserves => reserves.parkingLot !== req.body.name);
        json.reservations = reservations;
        
        fs.writeFileSync(`${__dirname}/db/drivers.json`, JSON.stringify(json));
        res.send("Parking lot deleted!");

        
    
      }

  })
})

app.use("/api/parking-usage", (req,res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
  {
    if(err)
      res.status(401).send(err);
    else
    {
      const buffer = fs.readFileSync(`${__dirname}/db/drivers.json`);
      const json = JSON.parse(buffer);
      const parkingLots = json.locations.filter(parkingLots => parkingLots.spacesTable);
      const reservations = json.reservations;

      res.send({parkingLots: parkingLots, reservations: reservations});
    }
  })
})

app.use("/api/ban-user", (req, res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
  {
    if(err)
      res.status(401).send(err);
    else
    {
      const buffer = fs.readFileSync(`${__dirname}/db/drivers.json`);
      const json = JSON.parse(buffer);

      console.log(json);
      
      const userToBan = json.users.filter(users => users.username !== req.body.username);

      json.users = userToBan;

      fs.writeFileSync(`${__dirname}/db/drivers.json`, JSON.stringify(json));

      res.send({"message": "User banned!"});
    }
  })
})

app.use("/api/accounts-info", (req,res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
  {
    if(err)
      res.status(401).send(err);
    else
    {
      const buffer = fs.readFileSync(`${__dirname}/db/drivers.json`);
      const json = JSON.parse(buffer);
      
      const nonAdmin = json.users.filter(users => users.admin === false)

      res.send(nonAdmin);

      
    }
  })
})

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

  let exists = obj.users.find(user => user.username === req.body.username);

  if(exists)
  {
    res.status(400).send({message: "User Already exists!"});
    
  }
  else
  {
    obj.users.push({username: req.body.username, password : req.body.password, email: req.body.email, 
      carRegistration: req.body.carRegistration, contactNumber: req.body.contactNumber, admin: false});
  
    fs.writeFileSync(`${__dirname}/db/drivers.json`, JSON.stringify(obj));
  
  }
  

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
      
      let spot = json.reservations.find(reserve => req.body.bookingID === reserve.bookingID);
      
      let result = json.reservations.filter(reserve => req.body.bookingID !== reserve.bookingID);

      json.reservations = result;

      
      let findRow = json.locations.find(location => location.name === spot.parkingLot);

    
     
      for(let i=0; i < findRow.spacesTable.length; i++)
     {
         if(findRow.spacesTable[i][spot.row])
         {
           console.log("yes");
           findRow.spacesTable[i][spot.row][spot.column] = 1;
         }
     }
     
     findRow.freeSpaces++;


     json.locations.forEach(element => {
       if(element.name === findRow.name)
         {
           element = findRow;
     }});

      

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

      let findRow = json.locations.find(location => location.name === req.body.parkingLot);

      

       for(let i=0; i < findRow.spacesTable.length; i++)
      {
          if(findRow.spacesTable[i][req.body.row])
          {
            if(findRow.spacesTable[i][req.body.row][req.body.column] !== 1)
            {
              res.status(400).send("Space has already been reserved!");
              return;
            }
            findRow.spacesTable[i][req.body.row][req.body.column] = id;
          }
      }
      
      findRow.freeSpaces--;
      console.log(findRow.freeSpaces);
      json.locations.forEach(element => {
        if(element.name === findRow.name)
          {
            element = findRow;
          }
      });
      
      json.reservations.push({user:decoded.name, bookingID:id, parkingLot: req.body.parkingLot, row:req.body.row, column:req.body.column, price: req.body.price, dateFrom: req.body.dateFrom, dateTo: req.body.dateTo, timeFrom: req.body.timeFrom, timeTo: req.body.timeTo})

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
       res.send({spacesTable:parkingLocation.spacesTable, spaces:parkingLocation.spaces, freeSpaces:parkingLocation.freeSpaces, prices: parkingLocation.pricing, longitude: parkingLocation.longitude, latitude: parkingLocation.latitude });
        
      }
   
    }
  })
 

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

