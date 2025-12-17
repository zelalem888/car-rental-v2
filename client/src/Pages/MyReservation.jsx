import { Check, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import print from "../components/printPDF/print";
import "./MyReservation.css";
import printHistory from "../components/printPDF/printHistory";

const MyReservation = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [tokenId, setTokenId] = useState();
  const [popup, setPopup] = useState(null);
  const [rent, setRent] = useState();
  const [image, setImage] = useState();
  const [pending, setPending] = useState([]);
  const [confirmed, setConfirmed] = useState([]);
  const [old, setOld] = useState([]);
  const [reject, setReject] = useState([]);
  const [findDriver, setFindDriver] = useState()
  const [history, setHistory] = useState("pending");

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

        // console.log(result)
        let allData = [];
        let historyData = [];
        let rejectData = [];

        const vehicleSearch = async (key) => {
          const vehicleDetail = await fetch(
            `http://localhost:3000/api/vehicle/${key}`
          );

          if (!vehicleDetail.ok) {
            console.log("there is no data on this vehicle.");
            return;
          }
          const data = await vehicleDetail.json();
          return data;
        };

        for (let vID of result) {
          const data = await vehicleSearch(vID.V_ID);
          //  console.log(data)
          if (vID.V_ID == data[0].V_ID) {
            const image = JSON.parse(data[0].Images);
            allData.push({ ...vID, ...data[0], image: image });
          }
        }

        const pendingList = allData.filter((item) => item.Status == "pending");
        const confirmedList = allData.filter(
          (item) => item.Status == "confirmed"
        );

        setPending(pendingList);
        setConfirmed(confirmedList);

        const historyResponse = await fetch(
          `http://localhost:3000/api/history/${id}`
        );
        if (!historyResponse.ok) {
          console.log("there is no rent.");
        }

        const historyResult = await historyResponse.json();
        const filteredHIstory = historyResult.filter(
          (item) => item.Refund != null
        );
        // console.log(historyResult)
        for (let vID of filteredHIstory) {
          const data = await vehicleSearch(vID.V_ID);
          // console.log(data);
          if (vID.V_ID == data[0].V_ID) {
            const image = JSON.parse(data[0].Images);
            historyData.push({ ...vID, ...data[0], image: image });
            // console.log(historyData);
          }
        }

        setOld(historyData);

        const RejectResponse = await fetch(
          `http://localhost:3000/api/reject/${id}`
        );
        if (!RejectResponse.ok) {
          console.log("there is no rejected rent.");
        }

        const RejectResult = await RejectResponse.json();
        const filteredReject = RejectResult.filter(
          (item) => item.Action_Type == "rejected"
        );
        for (let vID of filteredReject) {
          const data = await vehicleSearch(vID.V_ID);
          // console.log(data);
          if (vID.V_ID == data[0].V_ID) {
            const image = JSON.parse(data[0].Images);
            rejectData.push({ ...vID, ...data[0], image: image });
            // console.log(rejectData);
          }
        }

        setReject(rejectData)


      } catch (e) {
        console.log("network Error", e);
      }
    };
    fetchData();
  }, [tokenId, id, navigate]);

  const printHandler = async (id) => {

    const token = localStorage.getItem("jwt-token");
    const response = await fetch(
      `http://localhost:3000/api/reservation/single/${id}`,
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

    print(result)
  }

  const printHistoryHandler = async (id) => {

    console.log(id)
    const historyResponse = await fetch(
      `http://localhost:3000/api/history/single/${id}`
    );
    if (!historyResponse.ok) {
      console.log("there is no rent.");
    }
    const historyResult = await historyResponse.json();
    console.log(historyResult)
    console.log(historyResponse)
    printHistory(historyResult)
  }

  return (
    <>
      <h2 className="text-3xl w-[96%] mx-auto font-bold mt-20 text-gray-800">
        Reservation List
      </h2>

      <div className="flex gap-10 mb-12 justify-center">
        <a
          onClick={() => setHistory("pending")}
          className={`text-2xl font-medium transition-all hover:text-green-500 relative
                  ${history === "pending" ? "text-green-500" : "text-gray-700"
            } cursor-pointer select-none
                  after:content-[''] after:absolute after:w-0 after:h-1 after:bg-green-500 
                  after:left-0 after:-bottom-1 after:transition-all hover:after:w-full
                  ${history === "pending" ? "after:w-full" : ""}`}
        >
          Awaiting
        </a>
        <a
          onClick={() => setHistory("confirm")}
          className={`text-2xl font-medium transition-all hover:text-green-500 relative
                  ${history === "confirm" ? "text-green-500" : "text-gray-700"
            } cursor-pointer select-none
                  after:content-[''] after:absolute after:w-0 after:h-1 after:bg-green-500 
                  after:left-0 after:-bottom-1 after:transition-all hover:after:w-full
                  ${history === "confirm" ? "after:w-full" : ""}`}
        >
          Approved
        </a>
        <a
          onClick={() => setHistory("history")}
          className={`text-2xl font-medium transition-all hover:text-green-500 relative
                  ${history === "history" ? "text-green-500" : "text-gray-700"
            } cursor-pointer select-none
                  after:content-[''] after:absolute after:w-0 after:h-1 after:bg-green-500 
                  after:left-0 after:-bottom-1 after:transition-all hover:after:w-full
                  ${history === "history" ? "after:w-full" : ""}`}
        >
          Archive
        </a>
        <a
          onClick={() => setHistory("rejected")}
          className={`text-2xl font-medium transition-all hover:text-green-500 relative
                  ${history === "rejected" ? "text-green-500" : "text-gray-700"
            } cursor-pointer select-none
                  after:content-[''] after:absolute after:w-0 after:h-1 after:bg-green-500 
                  after:left-0 after:-bottom-1 after:transition-all hover:after:w-full
                  ${history === "rejected" ? "after:w-full" : ""}`}
        >
          Declined
        </a>
      </div>
      {history && history === "pending" ? (
        Array.isArray(pending) && pending.length > 0 ? (
          pending.map((item) => (

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
                    <strong>Rented Days:</strong> {item.Rent_Day} Day/s
                  </p>
                  <p>
                    <strong>Total Payment:</strong> {item.total_Payment} Birr
                  </p>
                  {item.D_ID === null ?
                    <p>
                      <strong>Driver: </strong> No
                    </p> : (
                      <p>
                        <strong>Driver: </strong> {item.driverDetail.full_name}
                      </p>
                    )}
                  {item.D_ID === null ? "" : (
                    <p>
                      <strong>Driver Phone Number: </strong> {item.driverDetail.phone}
                    </p>
                  )}
                  <p>
                    <strong>Posted:</strong>{" "}
                    {new Date(item.Posting_Date).toLocaleDateString("en-CA")}
                  </p>
                </div>
              </div>
              {/* RIGHT SIDE PRICE & BUTTON */}
              <div
                className={`w-1/4 p-6 flex flex-col justify-between items-end ${item.Status == "pending" ? "bg-yellow-500" : "bg-green-500"
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

                <button
                  onClick={() => navigate(`/booking/update/${item.R_ID}`)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>

          ))
        ) : (
          <p className="text-lg mt-4">No pending reservation found.</p>
        )
      ) : history === "confirm" ? (
        Array.isArray(confirmed) && confirmed.length > 0 ? (
          confirmed.map((item) => (
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
                    <strong>Rented Days:</strong> {item.Rent_Day} Day/s
                  </p>
                  <p>
                    <strong>Total Payment:</strong> {item.total_Payment} Birr
                  </p>
                  {item.D_ID === null ?
                    <p>
                      <strong>Driver: </strong> No
                    </p> : (
                      <p>
                        <strong>Driver: </strong> {item.driverDetail.full_name}
                      </p>
                    )}
                  {item.D_ID === null ? "" : (
                    <p>
                      <strong>Driver Phone Number: </strong> {item.driverDetail.phone}
                    </p>
                  )}
                  <p>
                    <strong>Posted:</strong>{" "}
                    {new Date(item.Posting_Date).toLocaleDateString("en-CA")}
                  </p>
                </div>
              </div>
              {/* RIGHT SIDE PRICE & BUTTON */}
              <div
                className={`w-1/4 p-6 flex flex-col justify-between items-end ${item.Status == "pending" ? "bg-yellow-500" : "bg-green-500"
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
                <button
                  onClick={() => printHandler(item.R_ID)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Print
                </button>
              </div>
            </div>

          ))
        ) : (
          <p className="text-lg mt-4">No confirmed reservations found.</p>
        )
      ) : history === "history" ? (
        Array.isArray(old) && old.length > 0 ? (
          old.map((item) => (

            <div
              key={item.V_ID}
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
                    <strong>Rented Days:</strong> {item.Total_Rent_Day} Day/s
                  </p>
                  <p>
                    <strong>Total Payment:</strong> {item.Total_paid} Birr
                  </p>
                  <p>
                    <strong>Over payment:</strong> {item.over_payment || 0}{" "}
                    birr
                  </p>
                  <p>
                    <strong>Refund:</strong> {item.Refund || 0} birr
                  </p>
                  {item.D_ID === null ?
                    <p>
                      <strong>Driver: </strong> No
                    </p> : (
                      <p>
                        <strong>Driver: </strong> {item.driverDetail.full_name}
                      </p>
                    )}
                  {item.D_ID === null ? "" : (
                    <p>
                      <strong>Driver Phone Number: </strong> {item.driverDetail.phone}
                    </p>
                  )}
                </div>
              </div>
              {/* RIGHT SIDE PRICE & BUTTON */}
              <div
                className={`w-1/4 p-6 flex flex-col justify-between items-end
                  bg-gray-500`}
              >
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    {item.Price_Per_Day} /birr
                  </p>
                  <p className="text-sm text-gray-700 -mt-1">
                    Cost of rental daily
                  </p>
                </div>
                <button
                  onClick={() => printHistoryHandler(item.Reservation_R_ID)}
                  className="mt-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                >
                  Print
                </button>
              </div>
            </div>

          ))
        ) : (
          <p className="text-lg mt-4">No reservation history found.</p>
        )
      ) : history === "rejected" ? (
        Array.isArray(reject) && reject.length > 0 ? (
          reject.map((item) => (

            <div
              key={item.V_ID}
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
                  <p className="align center">
                    <strong>Status:</strong> <span className="text-red-500"><strong>{item.Action_Type}</strong></span>
                  </p>
                  <p>
                    <strong>Pickup:</strong>{" "}
                    {new Date(item.Pickup_Date).toLocaleDateString("en-CA")}
                  </p>
                  <p>
                    <strong>Return:</strong>{" "}
                    {new Date(item.Return_Date).toLocaleDateString("en-CA")}
                  </p>
                  <p>
                    <strong>Rented Days:</strong> {item.Rent_Days} Day/s
                  </p>
                  <p>
                    <strong>Total Payment:</strong> {item.Total_Charge} Birr
                  </p>
                  <p>
                    <strong>Over payment:</strong> {item.over_payment || 0}{" "}
                    birr
                  </p>
                  <p>
                    <strong>Refund:</strong> {item.Refund || 0} birr
                  </p>
                  {item.D_ID === null ?
                    <p>
                      <strong>Driver: </strong> No
                    </p> : (
                      <p>
                        <strong>Driver: </strong> {item.driverDetail.full_name}
                      </p>
                    )}
                  {item.D_ID === null ? "" : (
                    <p>
                      <strong>Driver Phone Number: </strong> {item.driverDetail.phone}
                    </p>
                  )}
                </div>
              </div>
              {/* RIGHT SIDE PRICE & BUTTON */}
              <div
                className={`w-1/4 p-6 flex flex-col justify-between items-end
                  bg-gray-500`}
              >
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    {item.Price_Per_Day} /birr
                  </p>
                  <p className="text-sm text-gray-700 -mt-1">
                    Cost of rental daily
                  </p>
                </div>
              </div>
            </div>

          ))
        ) : (
          <p className="text-lg mt-4">No rejection history found.</p>
        )
      ) : (

        <p>There is no reservation</p>

      )}
    </>
  );
};

export default MyReservation;
