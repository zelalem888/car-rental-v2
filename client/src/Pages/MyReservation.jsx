import { useEffect, useState } from "react"
import { useParams,useNavigate } from "react-router-dom"

const MyReservation =()=>{

    const {id} = useParams()
    const [userData , setUserData] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
         const fetchUser = async () => {
        {
          const token = localStorage.getItem("jwt-token");
          try {
            const response = await fetch("http://localhost:3000/api/user/verify",
              {
                method: "POST",
                headers: {
                  "jwt-token": token,
                },
              });

            if(!response.ok){
                navigate('/')
            return
            }
            const result = await response.json()

          } catch (e) {
                console.log("network Error", e)
          }
        }
      };
      fetchUser();

        const fetchData = async()=>{
            try{
                const response = await fetch(`http://localhost:3000/api/user/reservation/${id}`)
                if(!response.ok){
                    console.log("there is no reservation.")
                }

                const result = await response.json()
                setUserData(result)
                console.log(result)

            }catch(e){
                console.log("network Error", e)
            }
        }
        fetchData()
    },[])

    return(
        <>
        <div className="p-6 mt-16">
      <h2 className="text-2xl font-bold mb-4">Reservation List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">R_ID</th>
              <th className="p-3 border-b text-left">C_ID</th>
              <th className="p-3 border-b text-left">V_ID</th>
              <th className="p-3 border-b text-left">Pickup Date</th>
              <th className="p-3 border-b text-left">Return Date</th>
              <th className="p-3 border-b text-left">Status</th>
              <th className="p-3 border-b text-left">Confirmation No.</th>
              <th className="p-3 border-b text-left">Posting Date</th>
            </tr>
          </thead>

          <tbody>
            {userData && userData.map((item) => (
              <tr
                key={item.R_ID}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 border-b">{item.R_ID}</td>
                <td className="p-3 border-b">{item.C_ID}</td>
                <td className="p-3 border-b">{item.V_ID}</td>
                <td className="p-3 border-b">
                  {item.Pickup_Date.slice(0, 10)}
                </td>
                <td className="p-3 border-b">
                  {item.Return_Date.slice(0, 10)}
                </td>
                <td
                  className={`p-3 border-b font-semibold 
                    ${item.Status === "confirmed" ? "text-green-600" : "text-yellow-600"}
                  `}
                >
                  {item.Status}
                </td>
                <td className="p-3 border-b text-sm">{item.Confirmation_Number}</td>
                <td className="p-3 border-b">
                  {item.Posting_Date.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </>
    )
}

export default MyReservation