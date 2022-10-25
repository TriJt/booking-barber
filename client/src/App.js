import "./index.css";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./page/Home/Home.jsx";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Services from "./page/Services/Services";
import Profile from "./page/Profile/Profile";
import Reset from "./page/ResetPassword/Reset";
import Contact from "./page/Contact/Contact";
import Gallery from "./page/Gallenry/Gallery";
import Blog from "./page/Blog/Blog";
import About from "./page/About/About.jsx";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile/:Name" element={user ? <Profile /> : <Login />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
