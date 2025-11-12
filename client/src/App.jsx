import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Models from "./Pages/Models";
import SingleModel from "./Pages/singleModel";
import Services from "./Pages/Services"
import Testimonials from "./Pages/Testimonials";
import Booking from "./Pages/Booking";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Errorpage from "./Pages/Errorpage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LearnMore from "./Pages/LearnMore";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { MainLayout } from "./layout/MainLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { MouseTrail } from "@stichiboi/react-elegant-mouse-trail";


function App() {
  return (
    <>
      <MouseTrail strokeColor="#F97316" lineWidthStart={30} />
      <AnimatePresence mode="wait">
        <Routes>

          {/* Auth routes without Navbar and Footer */}

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Main routes with Navbar and Footer */}
          <Route element={<MainLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/models" element={<Models />} />
            <Route path="/singlemodel/:name/:id" element={<SingleModel />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/learnmore" element={<LearnMore />} />
            <Route path="*" element={<Errorpage />} />
            <Route
              path="/booking/:id"
              element={
                // <ProtectedRoute>
                <Booking />
                // </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
