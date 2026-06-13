import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
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
  Ellipsis,
  CalendarCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Models = () => {
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };
  const statusColor = {
    pending: "text-yellow-800",
    available: "text-green-800",
    confirmed: "text-red-800",
  };
  const statusTitle = {
    pending: "booked",
    available: "available",
    confirmed: "rented",
  };
  const statusIcon = {
    pending: <Ellipsis className="w-5 h-5 text-yellow-800" />,
    confirmed: <CalendarCheck className="w-5 h-5 text-red-800" />,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/vehicles");
        if (!response.ok) {
          console.log("there is not token to login.", await response.json());
        }

        const result = await response.json();
        // setResult(await response.json())

        // console.log(result);

        const reserveResponse = await fetch(
          "http://localhost:3000/api/reservation/vehicle"
        );
        if (!reserveResponse.ok) {
          console.log("can not fetch the reservation list from vehicles.");
        }

        const reserveResult = await reserveResponse.json();
        // console.log(reserveResult);

       for(let i = 0 ; i <result.length; i++){
        result[i].status = ""
       }

        for (let i = 0; i < result.length; i++) {
          // result[i].image = JSON.parse(result[i].Images)
          result[i].image = result[i].Images
            ? JSON.parse(result[i].Images)
            : [];
          for (let j = 0; j < reserveResult.length; j++) {
            if (result[i].V_ID == parseInt(reserveResult[j].V_ID)) {
              result[i].status = reserveResult[j].Status;
              result[i].availableFor = reserveResult[j].Return_Date;

                if (reserveResult[j].Status === "onHold") {
                const pickup = new Date(reserveResult[j].Pickup_Date);

                // pickup date - 7 days
                const availableUntil = new Date(pickup);
                availableUntil.setDate(pickup.getDate() - 7);

                result[i].until = availableUntil.toLocaleDateString("en-CA");
              }
                      
              
            }
          }
        }
        setResult(result);
        // console.log(result);
      } catch (e) {
        throw new Error(e);
      }
    };
    fetchData();
  }, []);

  const categories = [
    {
      name: "All",
    },
    {
      name: ""
    },
    {
      name: "pending",
    },
    {
      name: "confirmed",
    },
  ];
  const booking = async (V_ID) => {
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
    if (!responseVerify.ok) {
      navigate("/login");
      return;
    }
    const resultVerify = await responseVerify.json();
    navigate(`/booking/${V_ID}`);
  };

  const filteredVehicles = result.filter((car) => {
      const matchesCategory =
      selectedCategory === "All" || car.status === selectedCategory;
    const filtered = car.V_Name.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    return filtered && matchesCategory;
  });
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-8">
      {/* Hero Section */}
      <section className="pt-16 pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
              <Car className="w-5 h-5 text-green-500" />
              <span className="text-green-700 font-medium">Our Fleet</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your Perfect <span className="text-green-500">Ride</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Experience premium service with unlimited miles and flexible
              pick-up options at unbeatable prices. Select from our wide range
              of well-maintained vehicles.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="grid w-[70%] mx-auto max-md:w-[100%] gap-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search for a car..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none 
                           focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Filter className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
              {/* Category Filter */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap
                             ${
                               selectedCategory === category.name
                                 ? "bg-green-500 text-white"
                                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                             }`}
                  >
                    <Car className="w-5 h-5" />
                    <span>{category.name === "All" ? "All" : category.name === "pending" ? "Booked" : category.name ==="" ? "Available" : "Rented"}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Car Models Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles &&
              filteredVehicles.map((car) => (
                <motion.div
                  key={car.V_ID}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div
                    className={`rounded-xl p-6 ${car.color} transition-all duration-300 
                             group-hover:-translate-y-2`}
                  >
                    {/* Car Image */}
                    <div className="aspect-[4/3] rounded-lg bg-white mb-6 overflow-hidden">
                      <a
                        style={{ pointerEvents: car.status === "confirmed" ? "none" : car.status === "onhHold" ? "unset" : car.status=="pending" ? "none" : "unset" }}
                        href={`/singlemodel/${car.V_Name}/${car.V_ID}`}
                      >
                        <img
                          src={`http://localhost:3000${car.image[0]}`}
                          // alt={car.name}
                          className="w-full h-full object-cover"
                        />
                      </a>
                    </div>

                    {/* Car Info */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold mb-1">
                            {car.V_Name}
                          </h3>
                          <span className="text-sm text-gray-600">
                            {car.Model_Year}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-green-500">
                            Birr {car.Price_Per_Day}
                          </span>
                          <span className="text-sm text-gray-600">/day</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex justify-between py-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-gray-500" />
                          <span>{car.Seating_Capacity} Seats</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Fuel className="w-5 h-5 text-gray-500" />
                          <span>{car.Fuel_Type}</span>
                        </div>
                      </div>

                      {/* Rating and Book Button */}
                      <div className={`flex items-center ${car.status == 'confirmed' ? "justify-center" : "justify-between"} `}>
                        <div className="flex flex-col items-center">
                          <span
                            className={`flex gap-2 font-medium ${
                              statusColor[car.status] || "text-green-700"
                            }`}
                          >
                            {statusIcon[car.status] || (
                              <Star className="w-5 h-5 text-green-700" />
                            )}
                            {statusTitle[car.status] || "available"}
                          </span>
                          <span className={`text-sm`}>
                            {car.status== "confirmed"
                              ? "Available on " +
                                new Date(car.availableFor).toLocaleDateString(
                                  "en-CA"
                                )
                              :car.status== "onHold" ? 
                               "Available until " +
                                new Date(car.until).toLocaleDateString(
                                  "en-CA"
                                ) : ""}
                          </span>
                        </div>
                        
                        {car.status !== "confirmed" && (
                           <motion.a
                          style={{
                            pointerEvents: car.status === "confirmed" ? "none" : car.status === "onHold" ? "unset" : car.status=="pending" ? "none" : "unset"
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => booking(car.V_ID)}
                          className={`px-6 py-2  text-white rounded-lg ${car.status == 'pending' ? 'bg-red-400/50': 'bg-green-500 hover:bg-green-600 ' } 
                                 transition-colors cursor-pointer`}
                        >
                          {car.status == "pending" ? "Soon" : "Book Now"}
                        </motion.a>
                        )}
                        
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Quick Booking Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Settings className="w-6 h-6 text-green-500" />
              <h2 className="text-3xl font-bold">How to Book</h2>
            </div>
            <p className="text-gray-600">
              We've streamlined our rental process to get you on the road
              quickly and safely
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Car,
                title: "Choose Your Car",
                description: "Select from our wide range of premium vehicles",
              },
              {
                icon: Calendar,
                title: "Pick Date & Location",
                description: "Choose your pickup date and preferred location",
              },
              {
                icon: MapPin,
                title: "Book & Enjoy",
                description: "Complete your booking and enjoy your journey",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center 
                             mx-auto mb-6"
                >
                  <step.icon className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Models;
