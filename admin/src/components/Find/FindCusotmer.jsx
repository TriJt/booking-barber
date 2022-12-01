import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/components/find.css";
import { BsSearch, BsPersonPlus, BsTelephonePlus } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function FindCustomer({}) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get("http://localhost:8800/api/customer/all");
      setData(res.data.value);
    };
    loadData();
  }, []);

  const handleFilter = async (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.Name_Customer.toLowerCase().includes(
        searchWord.toLowerCase()
      );
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const ChooseHandler = async (id, name, tel, email) => {
    setId(id);
    setName(name);
    setTelephone(tel);
    setEmail(email);
    setWordEntered("");
    setFilteredData([]);
  };

  return (
    <div className="find-container">
      <div className="header-find">Find the customer </div>
      <div className="item-find">
        <span>
          <BsSearch />
        </span>
        <input
          type="text"
          className="input-find"
          placeholder="Search customer"
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
          {filteredData.map((value, index) => {
            return (
              <div
                className="info-customer"
                key={index}
                onClick={() => {
                  ChooseHandler(
                    value._id,
                    value.Name_Customer,
                    value.Telephone,
                    value.Email
                  );
                }}
              >
                <img className="img-search" src={value.Image[0]} alt="" />
                <p className="data">{value.Name_Customer} </p>
              </div>
            );
          })}
        </div>
      )}
      <div className="container-info-appointment">
        <div className="header-receipt"> Info customer</div>
        <div className="item-find">
          <span>
            <BsPersonPlus />
          </span>
          <input type="text" className="input-find" value={name} />
        </div>
        <div className="item-find">
          <span>
            <BsTelephonePlus />
          </span>
          <input type="text" className="input-find" value={telephone} />
        </div>
        <div className="item-find">
          <span>
            <HiOutlineMail />
          </span>
          <input type="text" className="input-find" value={email} />
        </div>
      </div>
    </div>
  );
}
