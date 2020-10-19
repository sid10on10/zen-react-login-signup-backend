var express = require('express');
var router = express.Router();
var {url,mongodClient} = require("../config")
const { sendEmail } = require('../common/mailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/reset_password",async function(req,res,next){
  let client;
  try {
      client = await mongodClient.connect(url)
      let db = client.db("react")
      let {email} = req.body
      let user = await db.collection("users").findOne({email})
      if(user){
        let userId = user._id
        let reset_string = Math.random().toString(36).substr(2, 5);
        let update = await db.collection("users").findOneAndUpdate({email},{$set:{reset_token:reset_string}})
        let payload = `Reset Your Password here http://localhost:3000/reset/${userId}/${reset_string}`
        let sending = sendEmail(email,"Reset Link",payload)
        console.log(sending)
        res.json({
          message:"Email sent check your email for reset password"
        })
      }else{
        res.json({
          message:"No user found with this email"
        })
      }

  } catch (error) {
    client.close()
    console.log(error)
  }
})

module.exports = router;
