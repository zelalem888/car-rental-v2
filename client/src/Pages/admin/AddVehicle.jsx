import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
  const navigate = useNavigate()
  const [formData, setFormdata] = useState({
    A_ID: null,
    vehicleName: "",
    plateNumber: "",
    brandName: "",
    pricePerDay: Number,
    modelYear: Number,
    seatCapacity: Number,
    fuelType: "",
  });
  const [images, setImages] = useState()
  const [plateError, setPlateError] = useState(null);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
          navigate("/admin/login");
          return
        }
        const responseVerify = await fetch(
          "http://localhost:3000/api/admin/verify",
          {
            method: "POST",
            headers: {
              "jwt-token": token,
            },
          }
        );

        if (!responseVerify.ok) {
          localStorage.removeItem("jwt-token")
          navigate("/admin/login");
          return
        }
        const data = await responseVerify.json()

        if (data.user.type != "admin") {
          // localStorage.removeItem("jwt-token")
          navigate(`/superadmin/manage-admins`)
        }

        setFormdata({ ...formData, A_ID: data.user.id })
      } catch (e) {
        throw new Error(e);
      }
    };
    fetchAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.plateNumber.startsWith("ET") && !formData.plateNumber.startsWith("et")) {
      setPlateError("Plate Number Must Start With ET- or et-");
      return;
    }
    const form = new FormData()

    form.append("A_ID", parseInt(formData.A_ID))
    form.append("brandName", formData.brandName)
    form.append("fuelType", formData.fuelType)
    form.append("modelYear", formData.modelYear)
    form.append("plateNumber", formData.plateNumber)
    form.append("pricePerDay", formData.pricePerDay)
    form.append("seatCapacity", formData.seatCapacity)
    form.append("vehicleName", formData.vehicleName)
    for (let i = 0; i < images.length; i++) {
      form.append("images", images[i]);
    }

    try {
      const response = await fetch("http://localhost:3000/api/admin/registervehicle", {
        method: "POST",
        body: form,
      });
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
      const successData = await response.json()
      // alert(successData.message)
      // console.log(successData)
      navigate(`/admin`)

    } catch (e) {
      // alert(e)
      throw new Error(e)

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Vehicle
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* <!-- Vehicle Name --> */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Vehicle Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              max={6}
              onChange={(e) => { setImages(e.target.files) }}
              placeholder="Add Vehicle Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />

          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Vehicle Name
            </label>
            <input
              type="text"
              placeholder="Add Vehicle Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              onChange={(e) => {
                setFormdata({ ...formData, vehicleName: e.target.value });
              }}
              required
            />
          </div>

          {/* <!-- Plate Number --> */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Plate Number
            </label>
            <input
              type="text"
              placeholder="Start With ET-"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              onChange={(e) => {
                setFormdata({ ...formData, plateNumber: e.target.value });
              }}
              required
            />
            {plateError && <p className="text-red-700">{plateError}</p>}
          </div>

          {/* <!-- Brand Name --> */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Brand
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              onChange={(e) => {
                setFormdata({ ...formData, brandName: e.target.value });
              }}
              required
            >
              <option value="">Select Brand</option>
              <option>BMW</option>
              <option>Toyota</option>
              <option>Ford</option>
              <option>Chevrolet</option>
              <option>Mercedes-Benz</option>
              <option>Nissan</option>
              <option>Honda</option>
              <option>Tesla</option>
              <option>Audi</option>
              <option>Volvo</option>
              <option>Porsche</option>
              <option>Jeep</option>
              <option>Kia</option>
              <option>Hyundai</option>
            </select>
          </div>

          {/* <!-- Fuel Type --> */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Fuel Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              onChange={(e) => {
                setFormdata({ ...formData, fuelType: e.target.value });
              }}
              required
            >
              <option value="">Select Fuel Type</option>
              <option>Gasoline</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Electric</option>
            </select>
          </div>

          {/* <!-- Model Year & Seats --> */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Model Year
              </label>
              <input
                type="number"
                placeholder="Add Model Year"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                onChange={(e) => {
                  setFormdata({ ...formData, modelYear: e.target.value });
                }}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Seating Capacity
              </label>
              <input
                type="number"
                placeholder="Add Seat Capacity"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                onChange={(e) => {
                  setFormdata({ ...formData, seatCapacity: e.target.value });
                }}
                required
              />
            </div>
          </div>

          {/* <!-- Price --> */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price Per Day (Birr)
            </label>
            <input
              type="number"
              placeholder="Add Price Per Day"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              onChange={(e) => {
                setFormdata({ ...formData, pricePerDay: e.target.value });
              }}
              required
            />
          </div>

          {/* <!-- Driver --> */}
          {/* <div>
        <label className="block text-gray-700 font-medium mb-1">Driver</label>
        <input
          type="text"
          placeholder="Add Driver Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
        />
      </div> */}

          {/* <!-- Submit Button --> */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow transition"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
