import React, { useContext } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Booking from "./pages/booking/Booking";
import Customer from "./pages/customer/Customer";
import Category from "./pages/category/Category";
import Services from "./pages/services/Services";
import Staff from "./pages/staff/Staff";
import Receipt from "./pages/receipt/Receipt";
import Forgot from "./pages/forgot/Forget";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Reset from "./pages/resetPass/Reset";
import Posts from "./pages/post/Posts";
import { AuthContext } from "./context/AuthContext";
import Revenue from "./pages/revenue/Revenue";
import SinglePost from "./components/Post/SinglePost";
import Banner from "./pages/banner/Banner";
import Store from "./pages/store/Store";
import Appointment from "./components/Appointment/Appointment.jsx";
import ListAppointment from "./pages/appointmentForStaff/ListAppointment";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/home" element={user ? <Home /> : <Login />} />
        <Route
          path="/"
          element={user ? <Navigate replace to="/home" /> : <Home />}
        />
        <Route path="/booking" element={user ? <Booking /> : <Login />} />
        <Route
          path="/appointment"
          element={user ? <Appointment /> : <Login />}
        />
        <Route
          path="/appointment-staff"
          element={user ? <ListAppointment /> : <Login />}
        />
        <Route path="/customer" element={user ? <Customer /> : <Login />} />
        <Route path="/category" element={user ? <Category /> : <Login />} />
        <Route path="/service" element={user ? <Services /> : <Login />} />
        <Route path="/staff" element={user ? <Staff /> : <Login />} />
        <Route path="/post" element={user ? <Posts /> : <Login />} />
        <Route path="/post/:id" element={user ? <SinglePost /> : <Login />} />
        <Route path="/receipt" element={user ? <Receipt /> : <Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/store" element={<Store />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Login />} />
        <Route path="/reset/:id" element={user ? <Reset /> : <Login />} />
        <Route
          path="/contact/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/store/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/customer/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/banner/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/staff/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/booking/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/post/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/home/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/service/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/category/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/receipt/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/revenue/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
      </Routes>
    </Router>
  );
}
