import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateVehicle = () => {
  const {vname, vid } = useParams();
  const navigate = useNavigate();
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
  const [plateError, setPlateError] = useState(null);
  const [images, setImages] = useState()
  const [refresh, setRefresh] = useState(!true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
         const token = localStorage.getItem("jwt-token");
           if(!token){
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

          if(data.user.type != "admin"){
                    // localStorage.removeItem("jwt-token")
                    navigate(`/superadmin/manage-admins`)
                }
          // console.log(data)

          // setFormdata({...formData, A_ID : data.id})
        const response = await fetch(
          `http://localhost:3000/api/vehicle/${vname}/${vid}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          navigate("/admin")
          throw new Error(errorData.message);
        }
        const waitedDate = await response.json();
        // console.log(waitedDate);
        setFormdata({
          A_ID : data.user.id,
          vehicleName: waitedDate[0].V_Name,
          plateNumber: waitedDate[0].Plate_Number,
          brandName: waitedDate[0].Brand_Name,
          pricePerDay: waitedDate[0].Price_Per_Day,
          modelYear: waitedDate[0].Model_Year,
          seatCapacity: waitedDate[0].Seating_Capacity,
          fuelType: waitedDate[0].Fuel_Type,
          image: JSON.parse(waitedDate[0].Images)
        });
    
      } catch (e) {
        throw new Error(e);
      }
    };
    fetchData();
  }, [refresh]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.plateNumber.startsWith("ET") &&
      !formData.plateNumber.startsWith("et")
    ) {
      setPlateError("Plate Number Must Start With ET- or et-");
      return;
    }
    // console.log(formData);

    const form = new FormData()

     form.append( "A_ID",parseInt(formData.A_ID))
    form.append( "brandName",formData.brandName)
    form.append( "fuelType",formData.fuelType)
    form.append( "modelYear",formData.modelYear)
    form.append( "plateNumber",formData.plateNumber)
    form.append( "pricePerDay",formData.pricePerDay)
    form.append( "seatCapacity",formData.seatCapacity)
    form.append( "vehicleName",formData.vehicleName)
    if(images){
     for (let i = 0; i < images.length; i++) {
      form.append("images", images[i]);
    }}


    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/vehicle/update/${vid}`,
        {
          method: "PUT",
          body: form,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const successData = await response.json();
      alert(successData.message);
      navigate(`/admin`);
    } catch (e) {
      alert(e);
      throw new Error(e);
    }
  };

  const deleteHandler = async(img)=>{
      try{
        // console.log(img)
        const response = await fetch(`http://localhost:3000/api/admin/vehicle/imagedelete/${vid}`,{
          method: "DELETE",
          headers:{
            "content-type": "application/json"
          },
          body: JSON.stringify({image : img})
        })
        setRefresh((prev) => !prev)
      }catch(e){}
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Vehicle
        </h2>

        {formData &&
        (<>
          <div className="grid grid-cols-1 gap-2">
          {formData.image ? (formData.image.map((img , index)=>(
            <div key={index} className=" flex gap-3 items-center justify-around">
            <img   className="w-[350px] h-fit border-gray-800 border-2 object-cover" src={`http://localhost:3000${img}`} alt="image"/>
            <button onClick={()=>deleteHandler(img)} className="bg-red-600 px-4 text-white text-lg rounded-md self-end">Delete</button>
            </div>
          ))):(
            <p>no image</p>
          )}
          </div>
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
              onChange={(e)=>{setImages(e.target.files)}}
              placeholder="Add Vehicle Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            />

          </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Vehicle Name
              </label>
              <input
                type="text"
                value={formData.vehicleName}
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
                value={formData.plateNumber}
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
                value={formData.brandName}
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
                value={formData.fuelType}
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
                  value={formData.modelYear}
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
                  value={formData.seatCapacity}
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
                value={formData.pricePerDay}
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
                Update Vehicle
              </button>
            </div>
          </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateVehicle;
