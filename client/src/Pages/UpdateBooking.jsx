import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DayPicker as EthiopicDayPicker } from "react-day-picker/ethiopic";
import { DayPicker as USDayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const UpdateBooking = () => {
  const { rid } = useParams();
  const [reservedCar, setReservedCar] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [userData, setUserData] = useState({});
  const [selected, setSelected] = useState();
  const [imageCount, setImageCount] = useState();
  const [index, setIndex] = useState(0);
  const [dateDiff, setDateDiff] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [rentalDetails, setRentalDetails] = useState({
    pickUpDate: "",
    returnDate: "",
    rentDay: 0,
    totalPayment: 0,
  });
  const [deletePopUp, setDeletePopUp] = useState(false);
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
            headers: {
              "jwt-token": token,
            },
          }
        );

        if (!responseVerify.ok) {
          const errorData = await responseVerify.json();
          navigate("/login");
          throw new Error(errorData);
        }

        const resultVerify = await responseVerify.json();
        setUserData(resultVerify);

        console.log(resultVerify);

        const reservationResponse = await fetch(
          `http://localhost:3000/api/reservation/single/${rid}`
        );
        if (!reservationResponse.ok) {
          const errorData = await reservationResponse.json();
          throw new Error(errorData);
        }

        const reservationResult = await reservationResponse.json();
        if (reservationResult.length < 1) {
          navigate("/");
          return;
        }
        // setReservedCar(reservationResult);
        setRentalDetails({
          pickUpDate: new Date(reservationResult[0].Pickup_Date).toLocaleDateString("en-CA"),
          returnDate: new Date(reservationResult[0].Return_Date).toLocaleDateString("en-CA"),
          rentDay: reservationResult[0].Rent_Day,
          totalPayment: reservationResult[0].total_Payment
        });
        setSelected({
          from: new Date(reservationResult[0].Pickup_Date).toLocaleDateString("en-CA"),
          to: new Date(reservationResult[0].Return_Date).toLocaleDateString("en-CA"),
        });
        console.log(reservationResult);

        // let pickUpDate = new Date(reservationResult[0].Pickup_Date);
        // let returnDate = new Date(reservationResult[0].Return_Date);
        // const diffMs = returnDate - pickUpDate;
        // const totalRentDay = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        // setDateDiff(totalRentDay);
        // const pricePerDay = selectedCar[0].Price_Per_Day;
        // const totalPay = parseFloat(pricePerDay) * parseFloat(totalRentDay);
        // setTotalPrice(totalPay);

        const response = await fetch(
          `http://localhost:3000/api/vehicle/${reservationResult[0].V_ID}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData);
        }

        const result = await response.json();
        result[0].image = JSON.parse(result[0].Images);

        setSelectedCar(result);
        setImageCount(result[0].image.length);

        console.log(result);
      } catch (e) {
        throw new Error(e);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/reservation/update/${rid}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(rentalDetails),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const result = await response.json();
      console.log(result);
      alert("Booking confirmed!");
      navigate("/");
    } catch (e) {
      throw new Error(e);
    }
  };

  const selectHandler = (range) => {
    setSelected(range);
    let pickUpDate = new Date(range.from.toLocaleDateString("en-CA"));
    let returnDate = new Date(range.to.toLocaleDateString("en-CA"));
    const diffMs = returnDate - pickUpDate;
    const totalRentDay = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    const pricePerDay = selectedCar[0].Price_Per_Day;
    const totalPay = parseFloat(pricePerDay) * parseFloat(totalRentDay);
    
    setRentalDetails({
      pickUpDate: range.from.toISOString(),
      returnDate: range.to.toISOString(),
      rentDay: totalRentDay,
      totalPayment:totalPay
    });
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reservation/delete/${rid}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const result = await response.json();
      console.log(result);
      navigate("/");
    } catch (e) {
      throw new Error(e);
    }
  };

  return selectedCar ? (
    <div className="container mx-auto p-6 mt-20">
      <div className="grid grid-cols-[3fr_2fr]  max-lg:grid-cols-1">
        {/* Car Image */}
        <motion.div
          key={selectedCar.V_ID}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group"
        >
          <div
            className={`flex gap-5 rounded-xl p-6 transition-all duration-300 
                                     group-hover:-translate-y-2`}
          >
            {/* data Image */}
            <button
              onClick={() =>
                setIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1))
              }
            >
              {" "}
              <ChevronLeft className="text-white bg-green-500 rounded-full w-7 h-7" />{" "}
            </button>
            <div className="flex aspect-[4/3] rounded-lg bg-white mb-6 ">
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
              {" "}
              <ChevronRight className="text-white bg-green-500 rounded-full w-7 h-7" />
            </button>
          </div>
        </motion.div>

        {/* Car Details */}
        <div className="w-full  bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {selectedCar[0].V_Name}
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            {selectedCar[0].Brand_Name} - {selectedCar[0].Price_Per_Day}{" "}
            Birr/day
          </p>

          {/* Car Rating */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-semibold text-gray-500">
                {selectedCar[0].Plate_Number}
              </span>
            </div>
            <span className="text-sm text-gray-500"> (Plate Number)</span>
          </div>

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
                <label htmlFor="dropOffDate" className="text-sm text-gray-600">
                  Pick a Date
                </label>
                <p className="bg-green-400 w-fit px-2 rounded-md">Ethiopian </p>
                <EthiopicDayPicker
                  mode="range"
                  selected={selected}
                  onSelect={selectHandler}
                  timeZone="+03:00"
                  startMonth={new Date(year, month)}
                  numerals="latn"
                  disabled={{ before: new Date() }}
                />
                <p className="bg-green-400 w-fit px-2 rounded-md">Gregorian </p>
                <USDayPicker
                  mode="range"
                  selected={selected}
                  onSelect={selectHandler}
                  startMonth={new Date(year, month)}
                  timeZone="+03:00"
                  numerals="latn"
                  disabled={{ before: new Date() }}
                />
              </div>

              <div>
                <table class="w-full border border-gray-300 mt-4">
                  <tbody>
                    <tr class="border-b">
                      <td class="p-3 text-green-900 font-semibold">
                        Days of Rent
                      </td>
                      <td class="p-3 text-xl">{rentalDetails.rentDay} day/s</td>
                    </tr>
                    <tr>
                      <td class="p-3 text-green-900 font-semibold">
                        Total Payment
                      </td>
                      <td class="p-3 text-xl">{rentalDetails.totalPayment} Birr</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Pickup Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue="Main Office"
                  className="p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-400 transition ease-in-out duration-200"
            >
              Confirm Booking
            </button>
          </form>
          <button
            onClick={() => {
              setDeletePopUp(true);
            }}
            className="mt-6 w-full py-3 bg-red-900 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition ease-in-out duration-200"
          >
            Delete Booking
          </button>
          {deletePopUp && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Confirm Deletion
                </h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this item? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setDeletePopUp(false);
                    }}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteHandler}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="container mx-auto p-4">Loading...</div>
  );
};

export default UpdateBooking;
