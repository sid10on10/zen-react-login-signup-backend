var express = require('express');
var router = express.Router();
var {url,mongodClient} = require("../config")
const bcryptjs = require("bcryptjs");
const { sendEmail } = require('../common/mailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.write("<h1>Registration page! Use POST method to register Users</h1>");
  res.end()
});

router.post('/', async function(req, res, next) {
  let client;
  try{
    client = await mongodClient.connect(url)
    let db = client.db("react")
    let {email,password} = req.body
    let user = await db.collection("users").findOne({email: email});
    if(user){
      res.json({
        message:"User already Exist Kindly Login"
      })
    }else{
      let salt = await bcryptjs.genSalt(10)
      let hash = await bcryptjs.hash(password,salt)
      password = hash
      await db.collection("users").insertOne({
        email,
        password
      })
      res.json({
          message:"Registration Successful"
      })
      client.close()
    }
  }catch(error){
    client.close()
    console.log(error)
  }
  });

module.exports = router;
