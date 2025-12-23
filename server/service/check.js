const db = require("../db/config");

const checkCountDown = async () => {
  console.log("2 hour mark.")
  const date = new Date();
  const [rows] = await db.query("SELECT Posting_Date, R_ID, Status FROM reservation");
  for (let time of rows) {
    const reservationDate = new Date(time.Posting_Date);
    const diffTime = date - reservationDate;
    //    console.log(diffTime)
    const hour2 = 1000 * 30 ;
    if(diffTime > hour2){
        await db.query("DELETE FROM reservation WHERE R_ID = ? AND Status = 'pending'" , time.R_ID)
        console.log("this reservation deleted" + time.R_ID)
    }else{
        console.log("pending" + time.R_ID)
    }
  }
};

const dailyCheck = async () => {
  console.log("every day mark")
  try {
    const now = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);

    const [rows] = await db.query(
      "SELECT R_ID, Pickup_Date FROM reservation WHERE Status = 'onHold'"
    );

    for (let time of rows) {
      const pickupDate = new Date(time.Pickup_Date);

      if (pickupDate >= now && pickupDate <= sevenDaysFromNow) {
        await db.query(
          "UPDATE reservation SET Status = 'confirmed' WHERE R_ID = ?",
          [time.R_ID]
        );
        console.log("confirmed:", time.R_ID);
      }
    }
  } catch (err) {
    console.error("dailyCheck error:", err);
  }
};


module.exports = {checkCountDown, dailyCheck}
