import React, { useEffect, useState } from "react";
import { CheckCircle, FileStack, LoaderIcon } from "lucide-react";
import { useParams } from "react-router-dom";
const ConfirmedReservations = () => {
  const { id } = useParams();
  const [adminID, setAdminID] = useState()
  const [pending, setPending] = useState([]);
  const [detail, setDetail] = useState(false);
  const [vehicle, setVehicle] = useState();
  const [customer, setCustomer] = useState();
  const [refresh, setRefresh] = useState(!true);
  const [rid, setRId] = useState();

  useEffect(() => {
    const fetchData = async () => {

      const token = localStorage.getItem("jwt-token");

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
          localStorage.removeItem("jwt-token");
          navigate("/admin/login");
          return;
        }
        const data = await responseVerify.json();

        
          if(data.user.type != "admin"){
                    // localStorage.removeItem("jwt-token")
                    navigate(`/superadmin/manage-admins`)
                }

        setAdminID(data.user.id);

      const response = await fetch(
        "http://localhost:3000/api/reservation/vehicle/confirmed"
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }
      const result = await response.json();
      setPending(result);
    };
    fetchData();
  }, [refresh]);

  const moreDetail = async ({ C_ID, V_ID }) => {
    try {
      const vehicleResponse = await fetch(
        `http://localhost:3000/api/vehicle/${V_ID}`
      );
      if (!vehicleResponse.ok) {
        const errorData = await vehicleResponse.json();
        throw new Error(errorData.message);
      }
      const vehicleResult = await vehicleResponse.json();
      setVehicle(vehicleResult);

      const customerResponse = await fetch(
        `http://localhost:3000/api/user/admin/${C_ID}`
      );
      if (!customerResponse.ok) {
        const errorData = await customerResponse.json();
        setCustomer(null);
        throw new Error(errorData.error);
      }
      const customerResult = await customerResponse.json();
      setCustomer(customerResult);
    } catch (e) {
      throw new Error(e);
    }
  };

  const vehicleReturned = async ({ id, rid }) => {
    console.log(id, rid);
    try {
      const confirmResponse = await fetch(
        `http://localhost:3000/api/reservation/done/${id}/${rid}`,
        {
          method: "PUT",
        }
      )
      
      setDetail(false);
      setRefresh(!false);

      console.log( await confirmResponse.json())
      if (!confirmResponse.ok) {
        const errorData = await confirmResponse.json();
        throw new Error(errorData);
      }
      const confirmResult = await confirmResponse.json();
      alert("The vehicle Available from now.");
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          confirmed Vehicle List
        </h2>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Pickup Date</th>
              <th className="py-3 px-4 text-left">Return Date</th>
              <th className="py-3 px-4 text-left">More Details</th>
            </tr>
          </thead>

          <tbody>
            {pending &&
              pending.map((r, index) => (
                <tr
                  key={r.R_ID}
                  className={`border-b hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 font-medium text-gray-800">
                    {r.Posting_Date.slice(0, 10)}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(r.Pickup_Date).toLocaleDateString("en-CA")}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(r.Return_Date).toLocaleDateString("en-CA")}
                  </td>

                  <td className="py-2 px-4 text-center flex justify-center gap-2">
                    <button
                      onClick={() => {
                        moreDetail({ C_ID: r.C_ID, V_ID: r.V_ID });
                        setRId(r.R_ID);
                        setDetail(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      <FileStack size={16} />
                      <span>More Detail</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {detail && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[60%]">
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 ">
                <div className="">
                  <div className="">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">
                      Customer
                    </h2>
                    {customer && (
                      <>
                        <p>
                          <span className="text-red-500">Full Name</span> :{" "}
                          {customer[0].FullName}{" "}
                        </p>
                        <p>
                          <span className="text-red-500">Phone Number</span> :{" "}
                          {customer[0].PhoneNumber}
                        </p>
                        <p>
                          <span className="text-red-500">Date of Birth</span> :{" "}
                          {customer[0].DoB.slice(0, 10)}{" "}
                        </p>
                        <p>
                          <span className="text-red-500">Nationality</span> :{" "}
                          {customer[0].Nationality}{" "}
                        </p>
                        <p>
                          <span className="text-red-500">City</span> :{" "}
                          {customer[0].City}{" "}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="border-l-2 border-slate-600 px-4">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Vehicle
                  </h2>
                  {vehicle && (
                    <>
                      <p>
                        <span className="text-red-500">Vehicle Name</span> :{" "}
                        {vehicle[0].V_Name}{" "}
                      </p>
                      <p>
                        <span className="text-red-500">Plate Number</span> :{" "}
                        {vehicle[0].Plate_Number}
                      </p>
                      <p>
                        <span className="text-red-500">Brand Name</span> :{" "}
                        {vehicle[0].Brand_Name}{" "}
                      </p>
                      <p>
                        <span className="text-red-500">Price Per Day</span> :{" "}
                        {vehicle[0].Price_Per_Day}{" "}
                      </p>
                      <p>
                        <span className="text-red-500">Model Year</span> :{" "}
                        {vehicle[0].Model_Year}{" "}
                      </p>
                      <p>
                        <span className="text-red-500">Seat Capacity</span> :{" "}
                        {vehicle[0].Seating_Capacity}{" "}
                      </p>
                      <p>
                        <span className="text-red-500">Fuel Type</span> :{" "}
                        {vehicle[0].Fuel_Type}{" "}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-between space-x-3 pt-6">
                <div>
                  <p className="flex gap-2 px-4 py-2 text-gray-800 rounded-md">
                    <CheckCircle className="text-green-700" />
                    Complete
                  </p>
                </div>
                <div className="flex space-x-2">
                 <button
                    onClick={() => {
                      vehicleReturned({ id: adminID, rid: rid })
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md"
                  >
                    Vehicle Returned
                  </button>
                  <button
                    onClick={() => {
                      setDetail(false);
                    }}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmedReservations;
