const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userAuthRoute = require('./routes/userAuthRoute');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API",
			version: "1.0.0",
			description: "Authentication Portal API",
		},
		servers: [
			{
				url: "https://login-portal-app.herokuapp.com/api/user",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
const PORT = process.env.PORT || 80;

app.use(bodyParser.urlencoded({extended: false})); //
app.use(bodyParser.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
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