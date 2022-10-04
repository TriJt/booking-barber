
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/home/Home';
import Booking from "./pages/booking/Booking"
import Customer from "./pages/customer/Customer"
import Discount from "./pages/discount/Discount"; 
import Staff from "./pages/staff/Staff"; 
import Contact from "./pages/contact/Contact"; 
import Forgot from "./pages/forgot/Forget"; 
import Login from "./pages/login/Login"; 
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Profile from "./pages/profile/Profile"; 
import Store from "./pages/store/Store"; 
import Posts from "./pages/post/Posts"

function App() {
  return (
    <Router> 
      <Routes> 
        <Route exact path="/" element={ <Home />} />  
        <Route  path="/booking" element={ <Booking/>} />
        <Route  path="/customer"  element={ <Customer /> } /> 
        <Route  path="/discount" element={ <Discount />} /> 
        <Route  path="/staff" element={ <Staff />} /> 
        <Route  path="/store" element={ <Store />} />
        <Route  path="/posts" element={ <Posts />} />
        <Route  path="/contact" element={ <Contact />} />
        <Route  path="/forgot" element={ <Forgot />} />
        <Route  path="/login" element={ <Login />} />
        <Route  path="/reset-password" element={ <ResetPassword />} />
        <Route  path="/profile" element={ <Profile />} /> 
      </Routes>
    </Router>
  );
}

export default App;
