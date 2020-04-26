const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post("/api/generatetoken", (req, res) => {
  const user = {
    id:1,
    name:'username',
    email:'username@gmail.com'
  }
  
  const keydata = fs.readFileSync('../NodeJwtAuthProject/secretkey.txt', 'utf8');
  jwt.sign({user}, keydata, {expiresIn: '24h'},(err, token)=>{
    res.json({
       token
    });
  }); 
});


app.post("/api/verifytoken", verifyToken, (req, res) => {
  const keydata = fs.readFileSync('../NodeJwtAuthProject/secretkey.txt', 'utf8');
   jwt.verify(req.token,keydata, (err, resData)=>{
      if(err) {
        res.sendStatus(403);
      }else{
        res.json({
          message: 'Verification succesfull..',
          resData
        });
      }
   });
  
});

 
  function verifyToken(req, res, next) {
    console.log('request =' + req.body.token);
    const bearerToken=req.body.token;//JSON.stringify(req.body.token);
     
      if(typeof bearerToken !== 'undefined') {
        req.token = bearerToken;
        next();
      } else {
        res.sendStatus(403);
      }
  
  }

   

app.listen(5000, () => console.log('Server start on port 5000'));