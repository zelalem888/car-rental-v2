const express = require('express')
const { allReservationService,confirmReservationService } = require("../../service/admin/confirm.reseve.sevice")


exports.allReservationController= async(req, res) =>{
    try{
        const allReservation = await allReservationService()
        res.send(allReservation)
    }catch(error){
        res.send({message : error})
    }
}


// ===========================================================

exports.confirmReservationController = async(req, res) => {

  try {
    const reservation = await confirmReservationService(req.params)

      res.send({ message: "rented Success." , ReservationID : reservation}).status(200)
  } catch (error) {
    res.send({ message: error });
  }
  
}