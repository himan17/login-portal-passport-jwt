const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userAuthRoute = require('./routes/userAuthRoute');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 80;

app.use(bodyParser.urlencoded({extended: false})); //
app.use(bodyParser.json());
// app.use(passport.initialize());
app.use(cors());//

// routes
app.use('/api/user', userAuthRoute);

app.get('/', (req, res)=>{
    res.json({success: true});
})

// database
mongoose.connect(process.env.DB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log('Database connected'))
.catch(er=> console.log('Error connecting database\n'+er));

app.listen(PORT, () => { 
    console.log("Server Started at " + PORT); 
});