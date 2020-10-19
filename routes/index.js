var express = require('express');
var router = express.Router();
var {url,mongodClient} = require("../config")

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
      let user = db.collection("users").findOne({email})
      if(user){
        let reset_string = Math.random().toString(36).substr(2, 5);
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
