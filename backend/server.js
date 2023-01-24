require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
mongoose.set('strictQuery', false);

//express app
const app = express();

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path, req.method);
next();
})

//routes
app.use('/api/workouts', workoutRoutes);

// app.get('/', (req, res) => {
//     const pet = {"dsfdsf": "dfghdfh",
//     "dsfdsf": "dfghdfh"
//     };
//     res.json(pet);
// })

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT, 'localhost', (error) => {
            error ? console.log(error) : console.log(`connected to DB & listening port ${process.env.PORT}`);
    });
    })
    .catch((error)=>{
        console.log(error)
    })

