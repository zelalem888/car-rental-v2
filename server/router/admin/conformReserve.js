const express = require('express');
const db = require("../../db/config");

const router = express.Router()

// ==============all reservation info API==================

router.get("/reservation/vehicle", async(req, res) =>{
    try{
        const [allReservation] = await db.query("SELECT * FROM reservation")
        res.send(allReservation)
    }catch(error){
        res.send({message : error})
    }
})

// ============== confirm reservation API==================

router.put("/reservation/confirm/:adminid/:reservationid", async (req, res) => {
  const reservationID = req.params.reservationid;
  const adminID = req.params.adminid
  const status = 'confirmed'
  const date = new Date().toLocaleString();
  const results = [status, reservationID]

  try {
    const [findID] = await db.query(
      "SELECT * FROM reservation WHERE R_ID = ?",
      reservationID
    );
    if (findID.length === 0) {
      return res.send({ message: "there is no reservation in this ID to update.",
        ID:reservationID
       });
    }   

    try {
     const [UpdateData] = await db.query(
        "UPDATE reservation SET status = ? WHERE R_ID = ?",
        results
      );

      const [data] = await db.query(
      "SELECT * FROM reservation WHERE R_ID = ?", reservationID);
      const [vehicleData] = await db.query(
      "SELECT * FROM vehicle WHERE V_ID = ?", data[0].V_ID);

      const result = [data[0].C_ID,data[0].V_ID, adminID ,data[0].R_ID, data[0].Pickup_Date, data[0].Return_Date , vehicleData[0].Price_Per_Day]

    

      await db.query(
        "INSERT INTO rent (C_ID, V_ID, A_ID,Reservation_R_ID, Pickup_Date,Return_Date,Daily_Fee) VALUES (?,?,?,?,?,?,?)",result
      )



      res.send({ message: "rented Success." , ReservationID : reservationID}).status(200)
    } catch (error) {
      res.send({ message: error });
    }
  } catch (error) {
    res.send({ message: error });
  }
  
});













module.exports = router