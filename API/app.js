const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//Middle-ware
app.use(bodyParser.json());
app.use(cors());

//Routers
const raffleTicktesRoute = require('./routes/rtickets');
const usersRoute = require('./routes/users');

//Routes
app.use('/rtickets',raffleTicktesRoute);
app.use('/users',usersRoute);

app.get('/',(req,res)=>{
    res.send("We are on home, Backend is running!");
});

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser : true },
    ()=>console.log('Connected to DB!!')
);

app.listen(8000);
