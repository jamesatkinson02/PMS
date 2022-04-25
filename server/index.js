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

console.log(process.env.TOKEN_SECRET);

app.use("/login", (req, res) => {

  const data = fs.readFileSync(`${__dirname}/db/drivers.json`);
  const json = JSON.parse(data.toString());
  if(json.password == crypto.createHash('md5').update(req.body.password).digest('hex'))
  {
    jwt.sign({admin: false, name: req.body.username}, process.env.TOKEN_SECRET, {expiresIn: '1800s'}, function(err, tok)
    {
      res.send({token:tok});
    });
  }
  else
  {
    res.status(400).send({message: 'Incorrect username/password!'});
  }

});

app.use("/register", (req, res) => {
  req.body.password = crypto.createHash('md5').update(req.body.password).digest("hex");
  const str = JSON.stringify(req.body);
  fs.appendFileSync(`${__dirname}/db/drivers.json`, str, {'flags': 'a'});
  
})

app.use('/verify-token', (req, res) => {
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
