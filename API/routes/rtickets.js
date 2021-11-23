const express = require('express');
const router = express.Router();
const Rticket = require('../models/Rticket');
const User = require('../models/User');

function selectProps(...props){
    return function(obj){
      const newObj = {};
      props.forEach(name =>{
        newObj[name] = obj[name];
      });
      
      return newObj;
    }
  }

// Methods

// get all tickets
router.get('/all', async (req,res)=>{
    try{
        const rtickets = await Rticket.find();
        res.json(rtickets);
    }
    catch(err){
        res.json(err);
    }
});

// get winners from last week 
router.get('/winners', async (req,res)=>{
    try{
        const rtickets = await Rticket.find();
        let currDate = new Date();
        // set date as 8 days back from current date
        currDate.setDate(currDate.getDate()-8); 
        let prev = rtickets.filter(nextLottery => nextLottery.date > currDate);  
        res.json(prev.map(selectProps("lottery","winner", "prize")));
    }
    catch(err){
        res.json(err);
    }
});

// get very next raffle lottery opening 
router.get('/next', async (req,res)=>{
    try{
        let currDate = new Date();
        const rtickets = await Rticket.find();
        // get the ticket which is immediate next to open
        let nextLottery = rtickets.find(nextLottery => nextLottery.date > currDate);
        // respond with a message specifying timings of opening and other crucial specifications
        res.json({
            message : "Next lottery opens at " + nextLottery.time,
            lottery : nextLottery.lottery,
            date : nextLottery.date,
            prize : nextLottery.prize,
            price : nextLottery.price
        });
    }
    catch(err){
        res.json(err);
    }
});

// post new raffle ticket
router.post('/create', async (req,res)=>{
    let rticket;
    if(req.body.date){
        rticket = new Rticket({
            lottery : req.body.lottery,
            price : req.body.price,
            prize : req.body.prize,
            date : new Date(req.body.date),
            time : req.body.time
        });
    }
    else{
        rticket = new Rticket({
            lottery : req.body.lottery,
            price : req.body.price,
            prize : req.body.prize,
            time : req.body.time
        });
    }
    try{
        rticket.save();
        res.json(rticket);
    }
    catch(err){
        res.json(err);
    }
});


// compute winner for the specified lottery from its applicants through a random generator 
router.put('/winner/:lottery', async (req, res) => {
    const rtickets = await Rticket.find();
    const rticket = await rtickets.find(rticket => rticket.lottery == req.params.lottery);
    const applicants  = rticket.applicants;
    try{ 
        const win = applicants[Math.floor(Math.random()*applicants.length)]
        rticket.winner = win;
        rticket.save();
        res.json(rticket);
    }
    catch(err){
        res.json(err);
    }
});

module.exports = router;
