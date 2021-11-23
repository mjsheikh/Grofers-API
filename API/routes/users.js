const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Rticket = require('../models/Rticket');

// Methods

// get all users
router.get('/all', async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.json(err);
    }
});

// post a new user
router.post('/create', async (req,res)=>{
        const user = new User({
            name : req.body.name,
            email : req.body.email,
            contact : req.body.contact
        });
    
    try{
        user.save();
        res.json(user);
    }
    catch(err){
        res.json(err);
    }
});

// purchase new ticket from a given user name, update his applications and the given ticket's applicants
router.put('/purchase/:name/:lottery', async (req, res) => {
    const rtickets = await Rticket.find();
    const users  = await User.find();
    const rticket = rtickets.find(rticket => rticket.lottery == req.params.lottery);
    const user = users.find(user => user.name == req.params.name);
    try{
        // check if ticket already purchased
        if(user.applications.includes(req.params.lottery)){
            res.json({message : "Raffle ticket already purchased!"});
        }
        else{
            rticket.applicants.push(user.name);
            user.applications.push(rticket.lottery);
            rticket.save();
            user.save();
        }
        res.json(user);
    }
    catch(err){
        res.json(err);
    }
});


module.exports = router;
