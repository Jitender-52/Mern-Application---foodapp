const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtSecret = "IAmaWebDeveloper"

const { body, validationResult } = require('express-validator');

router.post("/createuser",[
body('name', 'Enter Valid Name ...!').isLength({ min: 3 }),
body('email', 'Enter Valid Email ...!').isEmail(),
body('password', 'Enter Valid Password ...!').isLength({ min: 5 }),
body('location', 'Enter Valid Address ...!').isLength({ min: 1 })
]
,async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(), validationerror : true});
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: secPassword
            // password: req.body.password
        }).then(res.json({success: true}))

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

                const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
    
                if(!pwdCompare){
                    return res.status(400).json({errors: "Password Incorrect!"});
                }
            }

            const data = {
                user:{
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret);
            return res.json({success: true, authToken:authToken});
        } catch (error) {
            // console.log(error);
            res.json({success: fasle});
        }
    })

module.exports = router;
