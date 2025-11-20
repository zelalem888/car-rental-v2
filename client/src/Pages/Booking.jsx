import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DayPicker as EthiopicDayPicker } from 'react-day-picker/ethiopic';
import { DayPicker as USDayPicker } from "react-day-picker";
import "react-day-picker/style.css";


const CarDetailPage = () => {
  const { cid , id } = useParams();
  const [selectedCar, setSelectedCar] = useState();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [error ,setError] = useState()
  const year = new Date().getFullYear()
  const month = new Date().getMonth()

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

        console.log(resultVerify)

        const response = await fetch(`http://localhost:3000/api/vehicle/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData);
        }

        const result = await response.json();
        setSelectedCar(result);
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
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(rentalDetails.pickUpDate=== "" || rentalDetails.returnDate===""){
      setError("invalid date.")
      return
    }
    try {
      const response = await fetch(`http://localhost:3000/api/user/reservation/${cid}/${id}`, {
        method : "POST",
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(rentalDetails)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const result = await response.json();
      console.log(result);
      alert("Booking confirmed!. redirecting to home page.")
      setTimeout(()=>{
        navigate('/models')
      },1000)
    
    } catch (e) {
      throw new Error(e);
    }
  };

  const selectHandler = (range)=>{
    setSelected(range)
    setRentalDetails({
      pickUpDate : range.from.toISOString(),
      returnDate : range.to.toISOString()
    })
  }
  return selectedCar ? (
    <div className="container mx-auto p-6 mt-20">
      <div className="flex flex-col md:flex-row md:space-x-10">
        {/* Car Image */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://www.bentleymotors.com/content/dam/bm/websites/bmcom/bentleymotors-com/homepage/26my-azure/GT%20Azure%20Dynamic%20Desktop.jpg/_jcr_content/renditions/original.image_file.1286.643.file/GT%20Azure%20Dynamic%20Desktop.jpg"
            // alt={selectedCar.name}
            className="w-full h-80 object-cover rounded-lg border hover:shadow-lg hover:scale-105 delay-75 ease-in-out"
          />
        </div>

        {/* Car Details */}
        <div className="w-full md:w-1/2 bg-white shadow-xl rounded-lg p-8">
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
                    numerals="latn"
                    disabled={{before : new Date()}}
                  />
                <p className="bg-green-400 w-fit px-2 rounded-md">Gregorian </p>
                   <USDayPicker
                    mode="range"
                    selected={selected}
                    onSelect={selectHandler}
                    startMonth={new Date(year, month)}
                    numerals="latn"
                    disabled={{before : new Date()}}
                  />
              </div>
              {error && (
                <div>
                  <p className="text-red-400">{error} </p>
                </div>
              )}

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
