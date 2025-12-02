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
  const [error, setError] = useState();
  const [index, setIndex] = useState(0);
  const [imageCount, setImageCount] = useState();
  const [dateDiff, setDateDiff] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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

        const response = await fetch(`http://localhost:3000/api/vehicle/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          throw new Error(errorData.message || "Something went wrong");
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

  const [rentalDetails, setRentalDetails] = useState({
    pickUpDate: "",
    returnDate: "",
    rentDay: 0,
    totalPayment: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rentalDetails.pickUpDate === "" || rentalDetails.returnDate === "") {
      setError("invalid date.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/reservation/${userData.id}/${id}`,
        {
          method: "POST",
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
      alert("Booking confirmed!. redirecting to home page.");
      setTimeout(() => {
        navigate("/models");
      }, 1000);
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
    setDateDiff(totalRentDay);

    const pricePerDay = selectedCar[0].Price_Per_Day;
    const totalPay = parseFloat(pricePerDay) * parseFloat(totalRentDay);
    setTotalPrice(totalPay);
    setRentalDetails({
      pickUpDate: range.from.toLocaleDateString("en-CA"),
      returnDate: range.to.toLocaleDateString("en-CA"),
      rentDay: parseInt(totalRentDay),
      totalPayment: parseFloat(totalPay),
    });
  };
  return selectedCar ? (
    <div className="container mx-auto p-6 mt-20">
      <div className="grid grid-cols-[3fr_2fr] max-lg:grid-cols-1">
        {/* Car Image */}
        <div className="w-full  mb-8 md:mb-0">
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
        </div>

        {/* Car Details */}
        <div className="w-full bg-white shadow-xl rounded-lg p-8">
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
                  startMonth={new Date(year, month)}
                  timeZone="+03:00"
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
              {error && (
                <div>
                  <p className="text-red-400">{error} </p>
                </div>
              )}
              <table class="w-full border border-gray-300 mt-4">
                <tbody>
                  <tr class="border-b">
                    <td class="p-3 text-green-900 font-semibold">
                      Days of Rent
                    </td>
                    <td class="p-3 text-xl">{dateDiff} day/s</td>
                  </tr>
                  <tr>
                    <td class="p-3 text-green-900 font-semibold">
                      Total Payment
                    </td>
                    <td class="p-3 text-xl">{totalPrice} Birr</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex flex-col">
                <label htmlFor="location" className="text-sm text-gray-600">
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="location"
                  value="Main Office"
                  className="p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition ease-in-out duration-200"
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
