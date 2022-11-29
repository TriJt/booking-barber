import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/components/gallery.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Gallery() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get("http://localhost:8800/api/store/get-banner");
      setData(res.data.value);
    };

    loadData();
  }, []);

  const [model, setModel] = useState(false);
  const [tempImage, setTempImage] = useState("");

  const getImg = (Image) => {
    setTempImage(Image);
    setModel(true);
  };

  return (
    <>
      <div className={model ? "model open" : "model"}>
        <img src={tempImage} alt="" className="image-model" />
        <AiOutlineCloseCircle
          onClick={() => setModel(false)}
          className="close-model-gal"
        />
      </div>
      <div className="gallery-container">
        {data.map((value, i) => (
          <div
            className="image-gallery"
            key={i}
            onClick={() => getImg(value.Image)}
          >
            <img src={value.Image} alt="" style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </>
  );
}
