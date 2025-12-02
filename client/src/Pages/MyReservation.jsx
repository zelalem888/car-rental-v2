import { Check, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MyReservation.css";

const MyReservation = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [tokenId, setTokenId] = useState();
  const [popup, setPopup] = useState(null);
  const [rent, setRent] = useState();
  const [image, setImage] = useState();

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
          setTokenId(result);
        } catch (e) {
          console.log("network Error", e);
        }
      }
    };
    fetchUser();
  }, [navigate]);
  useEffect(() => {
    if (!tokenId) return;
    const fetchData = async () => {
      const token = localStorage.getItem("jwt-token");

      try {
        const response = await fetch(
          `http://localhost:3000/api/user/reservation/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          console.log("there is no reservation.", tokenId);
          navigate(`/myreservation/${tokenId.id}`);
        }

        const result = await response.json();

        let allData = [];

        for (let vID of result) {
          const vehicleDetail = await fetch(
            `http://localhost:3000/api/vehicle/${vID.V_ID}`
          );
          if (!vehicleDetail.ok) {
            console.log("there is no data on this vehicle.");
            return;
          }
          const data = await vehicleDetail.json();
          if (vID.V_ID == data[0].V_ID) {
            const image = JSON.parse(data[0].Images);
            allData.push({ ...vID, ...data[0], image: image });
          }
        }

        setUserData(allData);

        console.log(allData);
        // console.log(userData);
      } catch (e) {
        console.log("network Error", e);
      }
    };
    fetchData();
  }, [tokenId, id, navigate]);

  const popupHandler = async (id) => {
    setPopup(id);
    try {
      const response = await fetch(`http://localhost:3000/api/rented/${id}`);
      if (!response.ok) {
        console.log("there is no rent.");
      }

      const result = await response.json();
      setRent(result);
      console.log(result);
    } catch (e) {}
  };

  return (
    <>
      <h2 className="text-3xl w-[96%] mx-auto font-bold mt-20 text-gray-800">
        Reservation List
      </h2>

      {Array.isArray(userData) && userData.length > 0 ? (
        userData.map((item) => (
          <>
            <div
              key={item.R_ID}
              className="mt-6 mb-4 w-[96%] mx-auto bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden flex"
            >
              {/* LEFT SIDE IMAGE */}
              <div className="w-1/3 bg-gray-100 flex items-center justify-center">
                <img
                  src={`http://localhost:3000${item.image[0]}`}
                  alt="Car"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* MIDDLE DETAILS */}
              <div className="w-2/3 p-5 flex flex-col gap-3">
                <h2 className="text-xl font-semibold">
                  {item.Brand_Name} {item.V_Name}
                </h2>

                <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                  <span>🚗 Seats: {item.Seating_Capacity}</span>
                  <span>🛄 Fuel Type: {item.Fuel_Type}</span>
                  <span>🚪 Model Year: {item.Model_Year}</span>
                  <span>⚙ Plate Number: {item.Plate_Number}</span>
                </div>

                {/* DATE + STATUS INFO */}
                <div className="mt-3 grid grid-cols-2 border-t pt-3 text-sm">
                  <p>
                    <strong>Pickup:</strong>{" "}
                    {new Date(item.Pickup_Date).toLocaleDateString("en-CA")}
                  </p>
                  <p>
                    <strong>Return:</strong>{" "}
                    {new Date(item.Return_Date).toLocaleDateString("en-CA")}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        item.Status === "confirmed"
                          ? "text-green-800"
                          : "text-yellow-800"
                      }
                    >
                      {item.Status}
                    </span>
                  </p>
                   <p>
                    <strong>Rented Days:</strong>{" "}
                    {item.Rent_Day} Day/s
                  </p>
                  <p>
                    <strong>Total Payment:</strong>{" "}
                    {item.total_Payment} Birr
                  </p>
                  <p> 
                    <strong>Posted:</strong>{" "}
                    {new Date(item.Posting_Date).toLocaleDateString("en-CA")}
                  </p>
                </div>
              </div>
              {/* RIGHT SIDE PRICE & BUTTON */}
              <div
                className={`w-1/4 p-6 flex flex-col justify-between items-end ${
                  item.Status == "pending" ? "bg-yellow-500" : "bg-green-500"
                }`}
              >
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    {item.Price_Per_Day} /birr
                  </p>
                  <p className="text-sm text-gray-700 -mt-1">
                    Cost of rental daily
                  </p>
                </div>

                {item.Status === "pending" ? (
                  <button
                    onClick={() => navigate(`/booking/update/${item.R_ID}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => popupHandler(item.R_ID)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    Details
                  </button>
                )}
              </div>
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden 
    ${popup == item.R_ID ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="bg-white w-full max-w-[96%] mx-auto mt-4  border border-green-300">
                {/* Header */}
                <div className="bg-green-500/90 text-white px-6 py-3 flex justify-between items-center">
                  <h2 className="text-lg font-bold">Rent Details</h2>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() => setPopup(null)}
                      className="px-3 py-1 bg-white text-green-600 rounded hover:bg-gray-200 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="print-area p-6">
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
                          <td className="p-3">
                            {rent[0].over_payment ?? "0.00"} Birr
                          </td>
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
                          <td className="p-3">
                            {rent[0].Down_Payment ?? "0.00"} Birr
                          </td>
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
                          <td className="p-3">
                            {rent[0].Refund ?? "0.00"} Birr
                          </td>
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
          </>
        ))
      ) : (
        <p className="text-lg mt-4">No reservations found.</p>
      )}
    </>
  );
};

export default MyReservation;
