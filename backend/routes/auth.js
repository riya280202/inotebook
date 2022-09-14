const express = require("express")
const { body, validationResult } = require('express-validator');
const User = require ("../models/User")
const router = express.Router();
const bcrypt = require("bcryptjs")
const JWT_SECRET = 'riyaisastudent'
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser")


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


//create login
router.post("/login",[
    body('email','Enter a valid email').isEmail(),
    body('password','Enter valid password').exists()
], async function(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    };

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).send({error: "try to login with correct credentials"})
        }
        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare){
            return res.status(400).send({error: "try to login with correct credentials"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
            const authToken = jwt.sign (data, JWT_SECRET)
            res.json({AuthToken: authToken})

    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }
})


//create verify 
router.post("/getUser", fetchUser , async(req,res) => {
    try {
        userId= req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }
})

module.exports = router;