import { Edit, List } from 'lucide-react';
import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Users = () => {

    const [userData, setUserData] = useState();
  const [adminID, setAdminID] = useState()
  const navigate = useNavigate();

    useEffect(()=>{

          const fetchUser = async () => {
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
          navigate("/admin/login");
          return
        }
        const adminData = await responseVerify.json()
        
          if(adminData.user.type != "admin"){
                    // localStorage.removeItem("jwt-token")
                    navigate(`/superadmin/manage-admins`)
                }

       setAdminID(adminData.user.id)

        const response = await fetch(`http://localhost:3000/api/user/all`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData);
        }

        const data = await response.json();
        setUserData(data);
        console.log(data)

      } catch (e) {
        throw new Error(e);
      }
    };
        
    fetchUser()

    },[])

 
     return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Vehicle List</h2>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
              <th className="py-3 px-4 text-left">Date of Birth</th>
              <th className="py-3 px-4 text-left">Nationality</th>
              <th className="py-3 px-4 text-left">City</th>
              <th className="py-3 px-4 text-left">Register Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {userData &&
              userData.map((user, index) => (
                <tr
                  key={user.C_ID}
                  className={`border-b hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4 font-medium text-gray-800">
                    {user.FullName}
                  </td>
                  <td className="py-2 px-4">{user.Email}</td>
                  <td className="py-2 px-4">{user.PhoneNumber}</td>
                  <td className="py-2 px-4">{new Date(user.DoB).toLocaleDateString()}</td>
                  <td className="py-2 px-4 text-center">
                    {user.Nationality}
                  </td>
                  <td className="py-2 px-4 text-center">{user.City}</td>
                  <td className="py-2 px-4 text-orange-500 font-semibold">
                    {new Date(user.Register_Date).toLocaleDateString()}
                  </td>

                  {/* ✅ Actions: Edit + Delete */}
                  <td className="py-2 px-4 text-center flex justify-center gap-2">
                    {/* Edit */}
                    <button
                      onClick={() =>
                        navigate(`/admin/user/${user.C_ID}`)
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      <List size={16} />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users
