import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/components/gallery.css";

export default function Gallery() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get("http://localhost:8800/api/store/get-banner");
      setData(res.data.value);
    };

    loadData();
  }, []);

  return (
    <div className="gallery-container">
      {data.map((value, i) => (
        <div className="image-gallery">
          <img src={value.Image} alt="" />
        </div>
      ))}
    </div>
  );
}
