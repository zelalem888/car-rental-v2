const express = require('express');
const dotenv = require('dotenv');
const vehicle = require('./router/vehicle/vehicle');
const login = require('./router/user/auth.user');
const vehicleReservation = require('./router/user/vehicleReservation')
const confirmReservation = require("./router/admin/conformReserve")
const bodyParser = require('body-parser');

dotenv.config()

const app = express()
app.use(bodyParser.urlencoded())
app.use(express.json())
const port = 4000

app.use('/api', login)
app.use('/api', vehicle)
app.use('/api', vehicleReservation)
app.use('/api', confirmReservation)

app.listen(port , (req , res )=>{
    console.log(`backend is running on port ${port}`)

})