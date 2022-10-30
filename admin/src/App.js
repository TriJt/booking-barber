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
import Services from "./pages/services/Services";
import Staff from "./pages/staff/Staff";
import Contact from "./pages/contact/Contact";
import Forgot from "./pages/forgot/Forget";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Posts from "./pages/post/Posts";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate replace to="/home" /> : <Home />}
        />

        <Route exact path="/home" element={user ? <Home /> : <Login />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/service" element={<Services />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/post" element={<Posts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:Name" element={user ? <Profile /> : <Login />} />
        <Route
          path="/contact/profile/:Name"
          element={
            user ? <Navigate replace to="/profile/:Name" /> : <Profile />
          }
        />
        <Route
          path="/customer/profile/:Name"
          element={
            user ? <Navigate replace to="/profile/:Name" /> : <Profile />
          }
        />
        <Route
          path="/staff/profile/:Name"
          element={
            user ? <Navigate replace to="/profile/:Name" /> : <Profile />
          }
        />
        <Route
          path="/booking/profile/:Name"
          element={
            user ? <Navigate replace to="/profile/:Name" /> : <Profile />
          }
        />
        <Route
          path="/post/profile/:Name"
          element={
            user ? <Navigate replace to="/profile/:Name" /> : <Profile />
          }
        />
        <Route
          path="/home/profile/:Name"
          element={
            user ? <Navigate replace to="/profile/:Name" /> : <Profile />
          }
        />
        <Route
          path="/service/profile/:Name"
          element={
            user ? <Navigate replace to="/profile/:Name" /> : <Profile />
          }
        />
      </Routes>
    </Router>
  );
}
