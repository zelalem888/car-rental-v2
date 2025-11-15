const express = require('express')
const { allReservationService,confirmReservationService } = require("../../service/admin/confirm.reseve.sevice")


exports.allReservationController= async(req, res) =>{
    try{
        const allReservation = await allReservationService()
        res.status(200).json(allReservation)
    }catch(error){
        res.status(400).json({message : error})
    }
}


// ===========================================================

exports.confirmReservationController = async(req, res) => {

  try {
    const reservation = await confirmReservationService(req.params)

      res.status(200).json({ message: "rented Success."})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
}