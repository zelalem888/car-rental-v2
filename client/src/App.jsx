import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Models from "./Pages/Models";
import SingleModel from "./Pages/singleModel";
import Services from "./Pages/Services";
import Testimonials from "./Pages/Testimonials";
import Booking from "./Pages/Booking";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Errorpage from "./Pages/Errorpage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LearnMore from "./Pages/LearnMore";
import UpdateVehicle from "./Pages/admin/UpdateVehicle";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { MainLayout } from "./layout/MainLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { AdminLayout } from "./layout/AdminLayout";
import { AuthAdminLayout } from "./layout/AuthAdminLayout";
import { MouseTrail } from "@stichiboi/react-elegant-mouse-trail";
import LoginForm from "./components/Auth/admin/admin.login";
import AdminVehicle from "./Pages/admin/Vehicles";
import AddVehicle from "./Pages/admin/AddVehicle";
import AddDriver from "./Pages/superAdmin/AddDriver";
import PendingReserve from "./Pages/admin/pendingReserve";
import UserAccount from "./Pages/UserAccount";
import MyReservation from "./Pages/MyReservation";
import UpdateBooking from "./Pages/UpdateBooking";
import ConfirmedReservations from "./Pages/admin/confirmedReservations";
import { SuperAdminLayout } from "./layout/SuperAdminLayout";
import ManageAdmins from "./Pages/superAdmin/ManageAdmins";
import AddAdmin from "./Pages/superAdmin/AddAdmin";
import UpdateAdmin from "./Pages/superAdmin/UpdateAdmin";
import DigitalID from "./Pages/DigitalID";
import TermAndCondition from "./components/default/TermAndCondition";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import ManageDrivers from "./Pages/superAdmin/manageDrivers";
import UpdateDriver from "./Pages/superAdmin/UpdateDriver";
import Users from "./Pages/admin/Users";
import UserDetail from "./Pages/admin/UserDetail";

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
            <Route path="/account/:id" element={<UserAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
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
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/myreservation/:id" element={<MyReservation />} />
            <Route path="/booking/update/:rid" element={<UpdateBooking />} />
            <Route path="/verifyid/:id" element={<DigitalID />} />
          </Route>



          {/* Admin and Super admin Auth Layout */}
          <Route element={<AuthAdminLayout />}>
            <Route path="/admin/login" element={<LoginForm />} />
          </Route>


          {/* admin Main layout */}
          <Route element={<AdminLayout />}>

            <Route path="/admin" element={<AdminVehicle />} />
            <Route path="/admin/add" element={<AddVehicle />} />
            <Route path="/admin/update/:vname/:vid" element={<UpdateVehicle />} />
            <Route path="/admin/pending" element={<PendingReserve />} />
            <Route path="/admin/confirmed" element={<ConfirmedReservations />} />
            <Route path="/admin/users" element= {<Users />} />
            <Route path="/admin/user/:id" element = {<UserDetail />} />
          </Route>

          {/* super admin Main layout */}

          <Route element={<SuperAdminLayout />}>
            <Route path="/superadmin/manage-admins" element={<ManageAdmins />} />
            <Route path="/superadmin/manage-drivers" element={<ManageDrivers />} />
            <Route path="/superadmin/add-admin" element={<AddAdmin />} />
            <Route path="/superadmin/update-admin/:id" element={<UpdateAdmin />} />
            <Route path="/superadmin/update-driver/:id" element={<UpdateDriver />} />
            <Route path="/superadmin/add-driver" element = {<AddDriver />} />

          </Route>
          <Route path="/terms-and-conditions" element={<TermAndCondition />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;