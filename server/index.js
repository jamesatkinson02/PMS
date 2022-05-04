const express = require("express");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');
const crypto = require('crypto'); 


const PORT = process.env.PORT || 3001;
var cors = require('cors');
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
     
      jwt.sign({admin: isUserFound.admin, name: isUserFound.username}, process.env.TOKEN_SECRET, {expiresIn: '1800s'}, function(err, tok)
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

  obj.users.push({username: req.body.username, password : req.body.password, email: req.body.email, carRegistration: req.body.carRegistration, admin: false});

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
