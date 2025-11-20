import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateBooking = () => {
  const { rid } = useParams();
  const [reservedCar, setReservedCar] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [rentalDetails, setRentalDetails] = useState({
    pickUpDate: "",
    returnDate: "",
  });
  const [deletePopUp, setDeletePopUp] = useState(false);

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
          return    
        }
        // setReservedCar(reservationResult);
        setRentalDetails({
          pickUpDate: reservationResult[0].Pickup_Date,
          returnDate: reservationResult[0].Return_Date,
        });
        console.log(reservationResult);

        const response = await fetch(
          `http://localhost:3000/api/vehicle/${reservationResult[0].V_ID}`
        );
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
                <label htmlFor="pickUpDate" className="text-sm text-gray-600">
                  Pick-up Date
                </label>
                <input
                  type="date"
                  name="pickUpDate"
                  defaultValue={new Date(rentalDetails.pickUpDate).toLocaleDateString("en-CA")}
                  onChange={(e)=> setRentalDetails({...rentalDetails , pickUpDate : e.target.value})}
                  className="p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="dropOffDate" className="text-sm text-gray-600">
                  Drop-off Date
                </label>
                <input
                  type="date"
                  name="returnDate"
                  defaultValue={new Date(rentalDetails.returnDate).toLocaleDateString("en-CA")}
                  onChange={(e)=> setRentalDetails({...rentalDetails , returnDate : e.target.value})}
                  className="p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="location" className="text-sm text-gray-600">
                  Pickup Location
                </label>
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
              className="mt-6 w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-400 transition ease-in-out duration-200"
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
