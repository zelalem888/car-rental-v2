import { Check, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MyReservation.css"

const MyReservation = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [tokenId, setTokenId] = useState()
  const [popup, setPopup] = useState(false);
  const [rent , setRent] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      {
        const token = localStorage.getItem("jwt-token");
        try {
          const response = await fetch(
            "http://localhost:3000/api/user/verify",
            {
              method: "POST",
              headers: {
                "jwt-token": token,
              },
            }
          );

          if (!response.ok) {
            navigate("/");
            return;
          }
          const result = await response.json();
          setTokenId(result)
        } catch (e) {
          console.log("network Error", e);
        }
      }
    };
    fetchUser();
  },[navigate])
useEffect(()=>{
    if (!tokenId) return;
    const fetchData = async () => {
        const token = localStorage.getItem("jwt-token");

      try {
        const response = await fetch(
          `http://localhost:3000/api/user/reservation/${id}`,{
            headers:{
              "authorization" : `Bearer ${token}`
            }
          }
        );
        if (!response.ok) {
          console.log("there is no reservation." , tokenId);
          navigate(`/myreservation/${tokenId.id}`)
        }

        const result = await response.json();
        setUserData(result);
        console.log(result);
      } catch (e) {
        console.log("network Error", e);
      }
    };
    fetchData();
  }, [tokenId, id, navigate]);

  const popupHandler = async (id)=>{
    setPopup(true)
    try{
        const response = await fetch(
          `http://localhost:3000/api/rented/${id}`
        );
        if (!response.ok) {
          console.log("there is no rent.");
        }

        const result = await response.json();
        setRent(result);
        console.log(result);
      
    }catch(e){

    }
  }

  return (
    <>
      <div className="p-6 mt-16">
        <h2 className="text-2xl font-bold mb-4">Reservation List</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b text-left">Pickup Date</th>
                <th className="p-3 border-b text-left">Return Date</th>
                <th className="p-3 border-b text-left">Status</th>
                <th className="p-3 border-b text-left">Confirmation No.</th>
                <th className="p-3 border-b text-left">Posting Date</th>
                <th className="p-3 border-b text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(userData) && userData.length > 0 ?
                userData.map((item) => (
                  <tr
                    key={item.R_ID}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 border-b">
                      { new Date(item.Pickup_Date).toLocaleDateString("en-CA")}
                    </td>
                    <td className="p-3 border-b">
                      {new Date(item.Return_Date).toLocaleDateString("en-CA")}
                    </td>
                    <td
                      className={`p-3 border-b font-semibold 
                    ${
                      item.Status === "confirmed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  `}
                    >
                      {item.Status}
                    </td>
                    <td className="p-3 border-b text-sm">
                      {item.Confirmation_Number}
                    </td>
                    <td className="p-3 border-b">
                      {item.Posting_Date.slice(0, 10)}
                    </td>
                    <td className="p-3 border-b">
                      {item.Status === "pending" ? (
                        <button
                          onClick={() =>
                            navigate(`/booking/update/${item.R_ID}`)
                          }
                          className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={()=> popupHandler(item.R_ID)}
                            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-blue-600 transition"
                          >
                            <Check size={16} />
                            <span>Details</span>
                          </button>
                          {popup && (
                            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
                              <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-green-300">
                                {/* Header */}
                                <div className="bg-green-500 text-white px-6 py-3 rounded-t-xl flex justify-between items-center">
                                  <h2 className="text-lg font-bold">
                                    Rent Details
                                  </h2>

                                  <div className="flex items-center gap-3">
                                    {/* PRINT BUTTON */}
                                    <button
                                      onClick={() => window.print()}
                                      className="px-3 py-1 bg-white text-green-600 rounded hover:bg-gray-200 transition"
                                    >
                                      Print
                                    </button>

                                    {/* CLOSE BUTTON */}
                                    <button
                                      onClick={() => setPopup(false)}
                                      className="px-3 py-1 bg-white text-green-600 rounded hover:bg-gray-200 transition"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>

                                {/* Body */}
                                <div className="print-area">
                                <div className="p-6">
                                  <table className="w-full border border-green-300 rounded-lg overflow-hidden shadow">
                                  {rent && (
                                    <tbody>
                                      <tr className="border-b border-green-200">
                                        <th className="p-3 bg-green-100 text-green-700 w-1/3 text-left font-semibold">
                                          Pickup Date
                                        </th>
                                        <td className="p-3">
                                          {rent[0].Pickup_Date?.slice(0, 10)}
                                        </td>
                                      </tr>

                                      <tr className="border-b border-green-200">
                                        <th className="p-3 bg-green-100 text-green-700 text-left font-semibold">
                                          Return Date
                                        </th>
                                        <td className="p-3">
                                          {rent[0].Return_Date?.slice(0, 10)}
                                        </td>
                                      </tr>

                                      <tr className="border-b border-green-200">
                                        <th className="p-3 bg-green-100 text-green-700 text-left font-semibold">
                                          Total Rent Days
                                        </th>
                                        <td className="p-3">{rent[0].Total_Rent_Day} Days</td>
                                      </tr>

                                      <tr className="border-b border-green-200">
                                        <th className="p-3 bg-green-100 text-green-700 text-left font-semibold">
                                          Daily Fee
                                        </th>
                                        <td className="p-3">{rent[0].Daily_Fee} Birr</td>
                                      </tr>

                                      <tr className="border-b border-green-200">
                                        <th className="p-3 bg-green-100 text-green-700 text-left font-semibold">
                                          Over Payment
                                        </th>
                                        <td className="p-3">{rent[0].over_payment === null ? "0.00" :rent[0].over_payment } Birr</td>
                                      </tr>

                                      <tr className="border-b border-green-200">
                                        <th className="p-3 bg-green-100 text-green-700 text-left font-semibold">
                                          Fuel Charged
                                        </th>
                                        <td className="p-3">{rent[0].Fule_Charged}</td>
                                      </tr>

                                      <tr className="border-b border-green-200">
                                        <th className="p-3 bg-green-100 text-green-700 text-left font-semibold">
                                          Down Payment
                                        </th>
                                        <td className="p-3">{rent[0].Down_Payment === null ? "0.00" : rent[0].Down_Payment} Birr</td>
                                      </tr>

                                      <tr className="border-b border-green-200">
                                        <th className="p-3 bg-green-100 text-green-700 text-left font-semibold">
                                          Total Paid
                                        </th>
                                        <td className="p-3">{rent[0].Total_Paid} Birr</td>
                                      </tr>

                                      <tr className="border-b border-green-200">
                                        <th className="p-3 bg-green-100 text-green-700 text-left font-semibold">
                                          Refund
                                        </th>
                                        <td className="p-3">{rent[0].Refund === null ? "0.00" : rent[0].Refund } Birr</td>
                                      </tr>

                                      <tr>
                                        <th className="p-3 bg-green-100 text-green-700 text-left font-semibold">
                                          Confirmation Number
                                        </th>
                                        <td className="p-3">{rent[0].Confirmation_Number}</td>
                                      </tr>
                                    </tbody>
                                    )}
                                  </table>
                                </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                )):(
                    <p className="text-lg">No reservations found.</p>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
};

export default MyReservation;
