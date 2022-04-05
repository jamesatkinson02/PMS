const express = require("express");

const PORT = process.env.PORT || 3001;
var cors = require('cors');
const app = express();

app.use(cors());

app.use("/login", (req, res) => {
  res.send({token: 'abc123'});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});