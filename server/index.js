const express = require("express");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fs = require('fs');


const PORT = process.env.PORT || 3001;
var cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

console.log(process.env.TOKEN_SECRET);

app.use("/login", (req, res) => {
  jwt.sign(req.body, process.env.TOKEN_SECRET, {expiresIn: '1800s'}, function(err, tok)
  {
    res.send({token:tok});
  });

});

app.use("/register", (req, res) => {
  const str = JSON.stringify(req.body);
  fs.appendFileSync(`${__dirname}/db/drivers.json`, '\n' + str, err => {
    if(err)
    {
      console.error(err);
    }
  })
  
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
