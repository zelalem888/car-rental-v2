import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit, Plus, Trash2 } from "lucide-react";
import AdminNavBar from "../../components/default/AdminNavBar";

const AdminVehicle = () => {
  const [adminData, setAdminData] = useState();
  const [allVehicle, setAllVehicle] = useState([]);
  const [deltePopUp, setDeletePopUp] = useState(false);
  const [targetID , setTargetID] = useState(null)
  const [error, SetError] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {

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
          navigate("/admin/login");
          return
        }

        const response = await fetch(`http://localhost:3000/api/admin/${id}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData);
        }

        const data = await response.json();
        setAdminData(data);

        const allVehicle = await fetch(`http://localhost:3000/api/vehicles`);

        if (!allVehicle.ok) {
          const errorData = await allVehicle.json();
          throw new Error(errorData);
        }
        const vehicleData = await allVehicle.json();
        setAllVehicle(vehicleData);
      } catch (e) {
        throw new Error(e);
      }
    };
    fetchAdmin();
  }, [deltePopUp]);

  const handleDelete = async (V_ID) => {
    setDeletePopUp(true)
    setTargetID(V_ID)
  };

  const cancelDelete = ()=>{
    setDeletePopUp(false)
  }
  const confirmDelete =async ()=>{
    try{
      const responseDelete = await fetch(`http://localhost:3000/api/admin/vehicle/delete/${targetID}`,{
        method : "DELETE"
      })
      if(!responseDelete.ok){
        const errorData = await responseDelete.json();
          throw new Error(errorData);
      }

      const deleteData = await responseDelete.json()
      console.log(deleteData.message)
          setDeletePopUp(false)

    }catch(e){
      throw new Error(e)
    }
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Vehicle List</h2>

        {/* ✅ Add Vehicle Button */}
        <button
          onClick={() => navigate(`/admin/add/${id}`)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          <Plus size={18} />
          <span>Add Vehicle</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Vehicle Name</th>
              <th className="py-3 px-4 text-left">Plate Number</th>
              <th className="py-3 px-4 text-left">Brand</th>
              <th className="py-3 px-4 text-left">Fuel Type</th>
              <th className="py-3 px-4 text-left">Seats</th>
              <th className="py-3 px-4 text-left">Year</th>
              <th className="py-3 px-4 text-left">Price/Day</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allVehicle &&
              allVehicle.map((v, index) => (
                <tr
                  key={v.V_ID}
                  className={`border-b hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 font-medium text-gray-800">
                    {v.V_Name}
                  </td>
                  <td className="py-2 px-4">{v.Plate_Number}</td>
                  <td className="py-2 px-4">{v.Brand_Name}</td>
                  <td className="py-2 px-4">{v.Fuel_Type}</td>
                  <td className="py-2 px-4 text-center">
                    {v.Seating_Capacity}
                  </td>
                  <td className="py-2 px-4 text-center">{v.Model_Year}</td>
                  <td className="py-2 px-4 text-orange-500 font-semibold">
                    {v.Price_Per_Day} Birr
                  </td>

                  {/* ✅ Actions: Edit + Delete */}
                  <td className="py-2 px-4 text-center flex justify-center gap-2">
                    {/* Edit */}
                    <button
                      onClick={() =>
                        navigate(`/admin/update/${id}/${v.V_Name}/${v.V_ID}`)
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(v.V_ID)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                    
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {deltePopUp && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                          <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Confirm Deletion
                          </h2>
                          <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this item? This
                            action cannot be undone. 
                          </p>
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={cancelDelete}
                              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={confirmDelete}
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
  );
};
export default AdminVehicle;
