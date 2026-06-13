const express = require('express');
const dotenv = require('dotenv');
const superAdminRoute = require('./router/superadmin/super.admin.route')
const adminAuthRoute = require("./router/admin/auth.admin.route")
const adminConfirmReservation = require("./router/admin/confirm.reserve.route")
const adminVehicleCRUDRoute = require("./router/admin/vehicle.CRUD.route")
const userAuthRoute = require('./router/user/auth.user.route');
const userInfoRoute = require("./router/user/user.route")
const vehicleReservationRoute = require('./router/user/vehicle.reservation.route')
const vehicleRoute = require('./router/vehicle/vehicle.route');
const {checkCountDown, dailyCheck} = require('./service/check');
const bodyParser = require('body-parser');
const cors = require("cors");


dotenv.config()

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded())
app.use(express.json())
app.use("/uploads", express.static("uploads"));
const port = process.env.PORT || 4000
// ======superAdmin=====
app.use('/api', superAdminRoute)

// =======admin=========
app.use('/api', adminAuthRoute)
app.use('/api', adminConfirmReservation)
app.use('/api', adminVehicleCRUDRoute)

// =======user==========

app.use('/api', userAuthRoute)
app.use('/api', userInfoRoute)
app.use('/api', vehicleReservationRoute)
app.use('/api', vehicleRoute)


setInterval( async()=>{
    await checkCountDown()
},1000 * 60 * 30)

setInterval(async ()=>{
    await dailyCheck()
}, 1000 * 60 * 60 * 24 )


app.listen(port,"0.0.0.0", (req, res) => {
    console.log(`backend is running on port ${port}`)

})