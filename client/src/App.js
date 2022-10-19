import "./index.css";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/profile/:Name" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
