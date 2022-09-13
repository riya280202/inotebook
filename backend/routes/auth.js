const express = require("express")
const { body, validationResult } = require('express-validator');
const User = require ("../models/User")
const router = express.Router();
const bcrypt = require("bcryptjs")
const JWT_SECRET = 'riyaisastudent'
const jwt = require('jsonwebtoken');


//create a user using: POST "/api/auth/createUser". no login required
router.post("/createUser",[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    };
    try{
        let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({error: "sorry a user with this address already exists"})
    }
    const salt = await bcrypt.genSaltSync(10);
    const secPass= await bcrypt.hashSync(req.body.password, salt)
        //create a user
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      const data ={
        user:{
            id : user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET)

      //res.json(user)
      res.json({authToken})
    } catch (error){
        console.log(error.message)
        res.status(500).send("some error occured")
    }
    
} );

module.exports = router;