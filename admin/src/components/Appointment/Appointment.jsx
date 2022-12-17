import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../../styles/appointment.css";
import { BsPersonFill } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdContentCut } from "react-icons/md";
import moment from "moment";
import "../../styles/components/find.css";
import { BsSearch, BsPersonPlus, BsTelephonePlus } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Appointment() {
  const { user: currentUser } = useContext(AuthContext);
  const [staff, setStaff] = useState([]);
  const [service, setService] = useState([]);
  const [slotArray, setSlotArray] = useState([]);
  const [date, setDate] = useState(moment().format("yyyy-MM-DD"));
  const [openService, setOpenService] = useState(false);
  const [nameService, setNameService] = useState("");
  const [staffId, setStaffId] = useState("");
  const [slotId, setSlotId] = useState("");
  const [check, setCheck] = useState(-1);
  const [dateId, setDateId] = useState("");
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [checkData, setCheckData] = useState(false);

  const currentTime = new Date();
  useEffect(() => {
    const fetchStaff = async () => {
      const res = await axios.get("http://localhost:8800/api/staff/all");
      setStaff(res.data.value);
    };
    fetchStaff();
    // fetService

    const fetchService = async () => {
      const res = await axios.get("http://localhost:8800/api/service/all");
      setService(res.data.value);
    };
    fetchService();
  }, []);

  const handleServices = async (name) => {
    setNameService(name);
    setOpenService(false);
    setStep1(true);
  };

  const handleStaff = async (e) => {
    setStep2(true);
    setStaffId(e.target.value);
  };
  const handleSlot = async (slotid, index) => {
    setSlotId(slotid);
    setStep4(true);
    setCheck(index);
  };

  const FindCustomer = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

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
      setCheckData(true);
    };

    return (
      <div className="find-container">
        <div className="close-booking">
          <Link
            to={`/booking`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <IoIosCloseCircleOutline />
          </Link>
        </div>
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
            <input type="text" className="input-find" defaultValue={name} />
          </div>
          <div className="item-find">
            <span>
              <BsTelephonePlus />
            </span>
            <input
              type="text"
              className="input-find"
              defaultValue={telephone}
            />
          </div>
          <div className="item-find">
            <span>
              <HiOutlineMail />
            </span>
            <input type="text" className="input-find" defaultValue={email} />
          </div>
        </div>
      </div>
    );
  };

  const DateHandle = async (e) => {
    const newDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setDate(newDate);
    setStep3(true);
    const data = {
      staffId: staffId,
      date: newDate,
    };

    try {
      const res = await axios.post(
        "http://localhost:8800/api/appointment/get-slots",
        data
      );

      setSlotArray(res.data.slots);
      setDateId(res.data._id);
    } catch (error) {}
  };
  const history = useNavigate();

  const submitBooking = async () => {
    const data = {
      StaffId: staffId,
      DateId: dateId,
      SlotId: slotId,
      CustomerId: id,
      NameCustomer: name,
      TelephoneCustomer: telephone,
      Email: email,
      Services: nameService,
    };
    try {
      const res = await axios.post(
        "http://localhost:8800/api/appointment/add",
        data
      );

      toast.success("Appointment successfully!!");
      setTimeout(() => {
        history("/booking");
      }, 3000);
    } catch (error) {
      toast.error("Appointment failed");
    }
  };

  return (
    <div className="container">
      <div className="left-container">
        <Sidebar />
      </div>
      <div className="right-container">
        <div className="top-container">
          <TopBar />
        </div>
        <div className="bottom-container">
          <ToastContainer />
          <div className="appointment-container">
            <div className="find-customer">
              <div className="search-customer">
                <FindCustomer />
              </div>
            </div>
            {checkData ? (
              <div className="booking-container">
                <div className="header-booking">Make a reservation</div>
                <div className="form-booking">
                  <span className="title-booking"> 1.Choose Service </span>
                  <div className="item-booking">
                    <span className="icon-booking">
                      <MdContentCut />
                    </span>
                    <div
                      className="input-booking choose"
                      onClick={() => {
                        setOpenService(true);
                      }}
                    >
                      {step1 ? (
                        <span>{nameService} </span>
                      ) : (
                        "View all services"
                      )}
                    </div>
                    <span className="icon-booking">
                      <IoMdArrowDropright />
                    </span>
                  </div>
                  {openService ? (
                    <div className="show-service-bookings">
                      <div className="grid-service">
                        {service.map((services, i) => (
                          <div key={i} className="items-service-bookings">
                            <img
                              src={services.Image}
                              alt=""
                              className="img-booking"
                            />
                            <span> {services.Name_Service}</span>
                            <span> {services.Price}</span>
                            <span className="desc-booking">
                              {services.Description}
                            </span>
                            <button
                              className="button-choose"
                              onClick={() => {
                                handleServices(services.Name_Service);
                              }}
                            >
                              Choose
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/*  choose staff */}

                  <span className="title-booking"> 2.Choose Staff </span>
                  <div className="item-booking">
                    <span className="icon-booking">
                      <BsPersonFill />
                    </span>
                    <select
                      type="text"
                      className="input-booking"
                      placeholder="Staff"
                      name="StaffId"
                      onChange={handleStaff}
                    >
                      {staff.map((value, i) => (
                        <option value={value._id} key={i}>
                          {value.Name}
                        </option>
                      ))}
                    </select>
                    <span className="icon-booking">
                      <IoMdArrowDropright />
                    </span>
                  </div>
                  <span className="title-booking"> 3.Choose Date </span>
                  <div className="item-booking">
                    <span className="icon-booking">
                      <BsPersonFill />
                    </span>
                    <input
                      type="date"
                      name="Date"
                      className="input-booking"
                      value={moment(date).format("yyyy-MM-DD")}
                      onChange={DateHandle}
                    ></input>

                    <span className="icon-booking">
                      <IoMdArrowDropright />
                    </span>
                  </div>

                  {step3 ? (
                    <React.Fragment>
                      <span className="title-booking">
                        {" "}
                        4.Choose Slot{" "}
                        <span
                          style={{
                            fontSize: "16px",
                            paddingLeft: "10px",
                            fontWeight: "400",
                          }}
                        >
                          {" "}
                          (Please select the available time periods)
                        </span>{" "}
                      </span>
                      <div className="grid-slot">
                        {slotArray?.map((slot, index) => {
                          const Time = new Date(date + "T" + slot.Time);
                          if (Time < currentTime) {
                            return (
                              <button key={index} className="item-false">
                                {slot.Time}
                              </button>
                            );
                          }
                          if (slot.isBooked === true) {
                            return (
                              <button key={index} className="item-false">
                                {slot.Time}
                              </button>
                            );
                          } else {
                            return (
                              <button
                                key={index}
                                className="slot-item"
                                onClick={() => {
                                  handleSlot(slot._id, index);
                                }}
                                style={{
                                  backgroundColor:
                                    check === index ? "#bf925b" : "white",
                                  color: check === index ? "white" : "black",
                                }}
                              >
                                {slot.Time}
                              </button>
                            );
                          }
                        })}
                      </div>
                    </React.Fragment>
                  ) : null}
                  {step4 ? (
                    <React.Fragment>
                      <button
                        className="submit-booking true"
                        onClick={submitBooking}
                      >
                        {" "}
                        Complete
                      </button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <button className="submit-booking false">
                        {" "}
                        Complete
                      </button>
                    </React.Fragment>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
