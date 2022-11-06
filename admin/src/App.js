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
        <Route path="/booking" element={user ? <Booking /> : <Login />} />
        <Route path="/customer" element={user ? <Customer /> : <Login />} />
        <Route path="/category" element={user ? <Category /> : <Login />} />
        <Route path="/service" element={user ? <Services /> : <Login />} />
        <Route path="/staff" element={user ? <Staff /> : <Login />} />
        <Route path="/post" element={user ? <Posts /> : <Login />} />
        <Route path="/contact" element={user ? <Contact /> : <Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:Name" element={user ? <Profile /> : <Login />} />
        <Route
          path="/contact/profile/:id"
          element={user ? <Navigate replace to="/profile/:id" /> : <Profile />}
        />
        <Route
          path="/customer/profile/:id"
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
      </Routes>
    </Router>
  );
}
