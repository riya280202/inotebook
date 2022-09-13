const express = require("express")
const { body, validationResult } = require('express-validator');
const User = require ("../models/User")
const router = express.Router();


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
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      res.json(req.body)
    } catch (error){
        console.log(error.message)
        res.status(500).send("some error occured")
    }
    
} );

module.exports = router;