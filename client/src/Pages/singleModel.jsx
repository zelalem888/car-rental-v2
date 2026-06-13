import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Car,
    CarFront,
    ChevronLeft,
    ChevronRight,
  Filter,
  Search,
  Fuel,
  Users,
  Briefcase,
  Star,
  ChevronDown,
  Settings,
  Calendar,
  MapPin,
  CalendarCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const SingleModel = () => {
  const [fetchedData, setFetchedData] = useState();
  const { name, id } = useParams();
  const [tokenId , setTokenId] = useState()
  const [index, setIndex] = useState(0);
  const navigate = useNavigate()
  const [imageCount, setImageCount] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/vehicle/${name}/${id}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        
        const waitedDate = await response.json();
        waitedDate[0].image = JSON.parse(waitedDate[0].Images)
        
       setFetchedData(waitedDate);
       setImageCount(waitedDate[0].image.length)
      } catch (e) {
        throw new Error(e);
      }
    };
    fetchData();
  }, [name, id]);

  const booking = async()=>{
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
        if(!responseVerify.ok){
          navigate("/login")
          return
        }
        const resultVerify = await responseVerify.json();
        navigate(`/booking/${fetchedData[0].V_ID}`)
  }

  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 max-md:grid-cols-1 items-center gap-2">
            {fetchedData && (
              <>
                <motion.div
                  key={fetchedData.V_ID}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div
                    className={`flex gap-5 rounded-xl p-6 transition-all duration-300 
                                     group-hover:-translate-y-2`}
                  >
                    {/* data Image */}
                      <button 
                       onClick={() => setIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1))}
                      > <ChevronLeft className="text-white bg-green-500 rounded-full w-7 h-7"/> </button>
                    <div className="flex aspect-[4/3] rounded-lg bg-white mb-6 ">
                 
                      <img
                        src={`http://localhost:3000${fetchedData[0].image[index]}`}
                        alt=""
                        className="h-full w-full object-cover rounded-lg"
                      />
                  
                    </div>
                      <button
                        onClick={() =>
                           setIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1)) }
                      > <ChevronRight className="text-white bg-green-500 rounded-full w-7 h-7" /></button>
                      
                  </div>
                </motion.div>
                <motion.div
                  key={fetchedData.V_ID}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  {/* data Info */}
                  <div className="space-y-4">
                    <div className="grid grid-rows-[3fr_1fr] items-end">
                      <div>
                        {" "}
                        <div className="flex-row">
                          
                            <h3 className="text-5xl font-bold mb-2">
                             {fetchedData[0].Brand_Name} {fetchedData[0].V_Name}
                            </h3>
                            <span className="text-2xl font-bold text-green-500">
                              Birr {fetchedData[0].Price_Per_Day}
                            </span>
                            <span className="text-sm text-gray-600">/day</span>
                          
                        </div>
                        {/* Features */}
                        <div className=" py-4 border-t border-gray-200">
                          <div className="flex items-center gap-6 py-1">
                            <Car className="w-5 h-5 text-gray-500" />
                            <span>{fetchedData[0].V_Name}</span>
                          </div>
                           <div className="flex items-center gap-6 py-1">
                            <Users className="w-5 h-5 text-gray-500" />
                            <span>{fetchedData[0].Seating_Capacity} Seats</span>
                          </div>
                          
                          <div className="flex items-center gap-6 py-1">
                            <Fuel className="w-5 h-5 text-gray-500" />
                            <span>{fetchedData[0].Fuel_Type}</span>
                          </div>
                              <div className="flex items-center gap-6 py-1">
                            <CarFront className="w-5 h-5 text-gray-500" />
                            <span>{fetchedData[0].Plate_Number} - Plate Number</span>
                          </div>
                          <div className="flex items-center gap-6 py-1">
                            <CalendarCheck className="w-5 h-5 text-gray-500" />
                            <span>{fetchedData[0].Model_Year} - Model Year</span>
                          </div>
                        </div>

                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={booking}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 
                                         transition-colors"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleModel;
