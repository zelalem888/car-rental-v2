import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { DayPicker as EthiopicDayPicker } from "react-day-picker/ethiopic";
import { DayPicker as USDayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CarDetailPage = () => {
  const { id } = useParams();
  const [selectedCar, setSelectedCar] = useState();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [driver, setDriver] = useState()
  const [error, setError] = useState();
  const [index, setIndex] = useState(0);
  const [imageCount, setImageCount] = useState();
  const [dateDiff, setDateDiff] = useState(0);
  const [pay, setPay] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [driverPrice, setDriverPrice] = useState(0);
  const [pickUpDate ,  setPickupDate] = useState()
  const year = new Date().getFullYear();
  const month = new Date().getMonth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt-token");
        const responseVerify = await fetch(
          "http://localhost:3000/api/user/verify",
          {
            method: "POST",
            headers: { "jwt-token": token },
          }
        );

        if (!responseVerify.ok) {
          const errorData = await responseVerify.json();
          navigate("/login");
          throw new Error(errorData);
        }

        const resultVerify = await responseVerify.json();
        setUserData(resultVerify);

        const response = await fetch(`http://localhost:3000/api/vehicle/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData)
          throw new Error(errorData.message || "Something went wrong");
        }



        const result = await response.json();
        console.log(result)
        if(result[0].status == "onHold"){
          const pickDate = new Date(result[0].Pickup_Date)
          setPickupDate(pickDate.setDate(pickDate.getDate()- 7))
        }
        result[0].image = JSON.parse(result[0].Images);

        setSelectedCar(result);
        setImageCount(result[0].image.length);


        const driverResult = await fetch(`http://localhost:3000/api/driver/active`)
        if (!driverResult.ok) {
          console.log("there is no driver available right now.")
          return
        }

        setDriver(await driverResult.json())
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const [rentalDetails, setRentalDetails] = useState({
    pickUpDate: "",
    returnDate: "",
    rentDay: 0,
    vehicleDriver: "NoDriver",
    tax: 0,
    TotalPayment: 0,
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rentalDetails.pickUpDate === "" || rentalDetails.returnDate === "") {
      setError("Invalid date.");
      return;
    }
    if (!acceptedTerms) {
      setError("Please accept the Terms & Conditions before confirming.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/reservation/${userData.id}/${id}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(rentalDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const result = await response.json();
      // console.log(result);
      alert("Booking confirmed!. redirecting to home page.");
      setTimeout(() => {
        navigate(`/verifyid/${userData.id}`);
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  const DRIVER_FEE_PER_DAY = 100;

  const selectHandler = (range) => {
    setSelected(range);

    const pickUpDate = new Date(range.from.toLocaleDateString("en-CA"));
    const returnDate = new Date(range.to.toLocaleDateString("en-CA"));

    const diffMs = returnDate - pickUpDate;
    const totalRentDay = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    setDateDiff(totalRentDay);

    // convert to number safely
    const pricePerDay = parseFloat(selectedCar[0].Price_Per_Day);

    // base price
    const payAmount = pricePerDay * totalRentDay;

    // driver fee (ONLY if selected)
    let driverFee = 0;

    if (rentalDetails.vehicleDriver !== "NoDriver") {
      driverFee = DRIVER_FEE_PER_DAY * totalRentDay;
    }
    setDriverPrice(driverFee);

    const subTotal = payAmount + driverFee;

    // tax and total with rounding
    const taxAmount = parseFloat((subTotal * 0.15).toFixed(2));
    const totalPayment = parseFloat((subTotal + taxAmount).toFixed(2));

    // show on UI
    setPay(subTotal);
    setTax(taxAmount);
    setTotalPrice(totalPayment);

    // SEND TO BACKEND 
    setRentalDetails((prev) => ({
      ...prev,
      pickUpDate: range.from.toLocaleDateString("en-CA"),
      returnDate: range.to.toLocaleDateString("en-CA"),
      rentDay: totalRentDay,
      Payment: subTotal,
      tax: taxAmount,
      TotalPayment: totalPayment,
      vehicleDriver: prev.vehicleDriver
    }));
  };


  return selectedCar ? (
    <div className="container mx-auto p-6 mt-20">
      <div className="grid grid-cols-[3fr_2fr] max-lg:grid-cols-1">
        {/* Car Image */}
        <div className="w-full mb-8 md:mb-0">
          <motion.div
            key={selectedCar.V_ID}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="flex gap-5 rounded-xl p-6 transition-all duration-300 group-hover:-translate-y-2">
              <button
                onClick={() =>
                  setIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1))
                }
              >
                <ChevronLeft className="text-white bg-green-500 rounded-full w-7 h-7" />
              </button>
              <div className="flex aspect-[4/3] rounded-lg bg-white mb-6">
                <img
                  src={`http://localhost:3000${selectedCar[0].image[index]}`}
                  alt=""
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <button
                onClick={() =>
                  setIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1))
                }
              >
                <ChevronRight className="text-white bg-green-500 rounded-full w-7 h-7" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Car Details */}
        <div className="w-full bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {selectedCar[0].V_Name}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {selectedCar[0].Brand_Name} - {selectedCar[0].Price_Per_Day} Birr/day
          </p>

          {/* Car Features */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="text-xl text-gray-600">🪑</div>
              <span>{selectedCar[0].Seating_Capacity} seats</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xl text-gray-600">🚗</div>
              <span>{selectedCar[0].Model_Year} Model</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-xl text-gray-600">⛽</div>
              <span>{selectedCar[0].Fuel_Type} fuel</span>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Pick a Date</label>
                <p className="bg-green-400 w-fit px-2 rounded-md">Ethiopian</p>
                <EthiopicDayPicker
                  mode="range"
                  selected={selected}
                  onSelect={selectHandler}
                  startMonth={new Date(year, month)}
                  timeZone="+03:00"
                  numerals="latn"
                  disabled={{ before: new Date() , after : pickUpDate }}
                />
                <p className="bg-green-400 w-fit px-2 rounded-md">Gregorian</p>
                <USDayPicker
                  mode="range"
                  selected={selected}
                  onSelect={selectHandler}
                  startMonth={new Date(year, month)}
                  timeZone="+03:00"
                  numerals="latn"
                  disabled={{ before: new Date(), after : pickUpDate}}
                />
              </div>
              {error && (
                <div>
                  <p className="text-red-400">{error} </p>
                </div>
              )}
              <table className="w-full border border-gray-300 mt-4">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 text-green-900 font-semibold">
                      Days of Rent
                    </td>
                    <td className="p-3 text-xl">{dateDiff} day/s</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-green-900 font-semibold">Payment</td>
                    <td className="p-3 text-xl">{pay} Birr</td>
                  </tr>
                  {driverPrice > 0 && (
                    <tr>
                      <td className="p-3 text-green-900 font-semibold">Driver</td>
                      <td className="p-3 text-xl">{driverPrice} Birr</td>
                    </tr>
                  )}
                  <tr>
                    <td className="p-3 text-green-900 font-semibold">Tax (15%)</td>
                    <td className="p-3 text-xl">{tax} Birr</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-green-900 font-semibold">
                      Total Payment
                    </td>
                    <td className="p-3 text-xl">{totalPrice} Birr</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Pickup Location</label>
                <input
                  type="text"
                  value="Main Office"
                  className="p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-col  mt-4">
              <label className="text-sm text-gray-600">Pick a Driver</label>
              <select
                value={rentalDetails.vehicleDriver}
                onChange={(e) => {
                  const value = e.target.value;

                  let newDriverPrice = 0;

                  if (value !== "NoDriver") {
                    newDriverPrice = DRIVER_FEE_PER_DAY * dateDiff;
                  }

                  setDriverPrice(newDriverPrice);

                  setRentalDetails((prev) => ({
                    ...prev,
                    vehicleDriver: value,
                  }));

                  const baseRent = selectedCar[0].Price_Per_Day * dateDiff;
                  const subTotal = baseRent + newDriverPrice;
                  const taxAmount = parseFloat((subTotal * 0.15).toFixed(2));
                  const totalPayment = parseFloat((subTotal + taxAmount).toFixed(2));

                  setPay(subTotal);
                  setTax(taxAmount);
                  setTotalPrice(totalPayment);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >

                <option value="NoDriver">No Driver</option>
                {driver?.map((drivers) => (
                  <option key={drivers.D_ID} value={drivers.D_ID}>{drivers.full_name}</option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  if (e.target.checked) setError(null);
                }}
                className="w-4 h-4 mt-1"
              />
              <label className="text-sm text-gray-700">
                I agree to the
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Terms &amp; Conditions
                </a>
              <p className="text-sm text-red-400">
                Please pay within 2 hours.
               </p>
              </label>
            </div>

            <button
              type="submit"
              disabled={!acceptedTerms}
              className="mt-6 w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="container mx-auto p-4">Loading...</div>
  );
};

export default CarDetailPage;
