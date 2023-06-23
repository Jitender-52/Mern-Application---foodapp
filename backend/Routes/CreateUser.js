const express = require('express')
const router = express.Router()
const User = require('../models/User')

const { body, validationResult } = require('express-validator');

router.post("/createuser",[
body('name', 'Invalid Name').isLength({ min: 3 }),
body('email', 'Invalid Email').isEmail(),
body('password', 'Incorrect Password').isLength({ min: 5 })
]
,async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(), validationerror : true});
    }

    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: req.body.password
        })
        res.json({success: true});
    } catch (error) {
        console.log(error);
        res.json({success: false});
    }
})

router.post("/login", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })]
    ,async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: "Validation Error" });
        //   return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({email});
            if(!userData){
                return res.status(400).json({errors: "Try login with correct emailID"});
            }
            if(req.body.password !== userData.password){
                return res.status(400).json({errors: "Password Incorrect!"});
            }
            return res.json({success: true});
        } catch (error) {
            // console.log(error);
            res.json({success: fasle});
        }
    })

module.exports = router;
