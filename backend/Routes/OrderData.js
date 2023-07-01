const express = require('express')
const router = express.Router() 
const order = require('../models/Orders')

router.post('/orderData', async(req, res) => {
    let data = req.body.order_data
    await data.slice(0, 0, {Order_data: req.body.order_date})

    let eId = await order.findOne({'email': req.body.email})
    console.log(eId)
    if(eId === null){
        try{
            await order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({success: true})
            })
        }
        catch(error){
            console.log(error.message)
            // res.send("Server Error", error.message)
            res.status(404).send({error: error.message});
        }
    }
    else{
        try{
            await order.findOneAndUpdate({email: req.body.email},
                {$push: {order_data: data}}).then(() => {
                    res.json({success: true})
                })
        }
        catch (error){
            // res.send("Server Error", error.message)
            res.status(404).send({error: error.message});
        }
    }
})

module.exports = router ;