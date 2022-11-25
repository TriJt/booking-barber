import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/components/find.css";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function FindService() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get("http://localhost:8800/api/service/all");
      setData(res.data.value);
    };

    loadData();
  }, []);

  const handleFilter = async (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.Name_Service.toLowerCase().includes(
        searchWord.toLowerCase()
      );
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="find-container">
      <div className="header-find">Find the service you want</div>
      <div className="item-find">
        <span>
          <BsSearch />
        </span>
        <input
          type="text"
          className="input-find"
          placeholder="Search for services"
          value={wordEntered}
          onChange={handleFilter}
        />
        {filteredData.length !== 0 ? (
          <>
            <span
              onClick={() => {
                setWordEntered("");
                setFilteredData([]);
              }}
            >
              <AiOutlineCloseCircle />
            </span>
          </>
        ) : null}
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return (
              <Link
                to={`/services/${value.Name_Service}`}
                className="search-link"
                key={key}
              >
                <img className="img-search" src={value.Image[0]} alt="" />
                <p className="data">{value.Name_Service} </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
