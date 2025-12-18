const db = require("../db/config");

module.exports = async () => {
  const date = new Date();
  const [rows] = await db.query("SELECT Posting_Date, R_ID FROM reservation");
  for (let time of rows) {
    const reservationDate = new Date(time.Posting_Date);
    const diffTime = date - reservationDate;
    //    console.log(diffTime)
    const hour2 = 1000 * 60 * 60 * 2 ;
    if(diffTime > hour2){
        await db.query("DELETE FROM reservation WHERE R_ID = ?" , time.R_ID)
        console.log("this reservation deleted" + time.R_ID)
    }else{
        console.log("pending" + time.R_ID)
    }
  }
};
