import "../../../styles/components/pricing.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pricing() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/service/limit");
      setServices(res.data.value);
    };
    fetchData();
  }, []);

  return (
    <div className="pricing">
      {services.map((value) => (
        <div className="item-service">
          <img src={value.Image} alt="" />
          <div className="text-pricing">
            <div className="h3"> {value.Name_Service}</div>
            <p>{value.Description}</p>
            <div className="price-link">
              <span className="price"> {value.Price}$</span>
              <Link to={``} className="link">
                <span> See Detail</span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
