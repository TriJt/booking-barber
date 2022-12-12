import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/components/salary.css";
import { Avatar } from "@mui/material";
import { MdDeleteOutline, MdSaveAlt, MdViewHeadline } from "react-icons/md";
import TableUser from "../../components/table/table-custom/TableUser";

import moment from "moment";

export default function Salary() {
  const [rowId, setRowId] = useState("");
  const [dataRange, setDataRange] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataMonthCurrent, setDataMonthCurrent] = useState([]);
  const [dataPrevious, setDataMonthPrevious] = useState([]);

  const [dateStart, setDateStart] = useState(moment().format("yyyy-MM-DD"));
  const [dateEnd, setDateEnd] = useState(
    moment(new Date()).format("yyyy-MM-DD")
  );
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(true);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const handleStep1 = () => {
    setStep1(true);
    setStep2(false);
    setStep3(false);
    setStep4(false);
  };
  const handleStep2 = () => {
    setStep2(true);
    setStep1(false);
    setStep3(false);
    setStep4(false);
  };
  const handleStep3 = () => {
    setStep2(false);
    setStep1(false);
    setStep3(true);
    setStep4(false);
    setOpen(true);
  };

  const handleStep4 = () => {
    setStep2(false);
    setStep1(false);
    setStep4(true);
    setStep3(false);
  };

  // current date
  const current = new Date();

  // date for current month
  const startMonthCurrent = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-01`;

  const endMonthCurrent = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-30`;

  // date for previous month
  const startMonthPrevious = `${current.getFullYear()}-${current.getMonth()}-01`;

  const endMonthPrevious = `${current.getFullYear()}-${current.getMonth()}-30`;

  useEffect(() => {
    const fetchMonthCurrent = async () => {
      const data = {
        Start: startMonthCurrent,
        End: endMonthCurrent,
      };
      const res = await axios.post(
        "http://localhost:8800/api/salary/month",
        data
      );
      setDataMonthCurrent(res.data.value);
    };
    fetchMonthCurrent();

    // fetch data for previous month
    const fetchMonthPrevious = async () => {
      const data = {
        Start: startMonthPrevious,
        End: endMonthPrevious,
      };
      const res = await axios.post(
        "http://localhost:8800/api/salary/month",
        data
      );
      setDataMonthPrevious(res.data.value);
    };
    fetchMonthPrevious();
  }, []);

  const DateStartHandle = async (e) => {
    setDateStart(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
  };

  const DateEndHandle = async (e) => {
    setDateEnd(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
    handleStep4();
  };

  const loadData = async () => {
    const dataCurrent = {
      Start: startMonthCurrent,
      End: endMonthCurrent,
    };
    const currents = await axios.post(
      "http://localhost:8800/api/salary/month",
      dataCurrent
    );
    setDataMonthCurrent(currents.data.value);

    const dataPrevious = {
      Start: startMonthPrevious,
      End: endMonthPrevious,
    };
    const previous = await axios.post(
      "http://localhost:8800/api/salary/month",
      dataPrevious
    );
    setDataMonthPrevious(previous.data.value);
  };

  const submitHandle = async () => {
    try {
      const data = {
        Start: dateStart,
        End: dateEnd,
      };
      const res = await axios.post(
        "http://localhost:8800/api/salary/month",
        data
      );
      setDataRange(res.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  const Delete = ({ params }) => {
    const handleDelete = async () => {
      const data = params.row._id;
      const response = await axios.delete(
        "http://localhost:8800/api/salary/delete/" + data
      );
      loadData();

      const record = response.data;
      if (record.status === 200) {
        toast.success("Delete information successfully");
      } else {
        toast.error("Delete information failed");
      }
    };
    return (
      <div className="delete">
        <button
          className="button-delete"
          onClick={() => {
            if (window.confirm("Are you sure to delete this object?"))
              handleDelete();
          }}
        >
          <MdDeleteOutline className="icon-delete" />
        </button>
      </div>
    );
  };

  const Save = ({ params, rowId, setRowId }) => {
    const handleSubmit = async () => {
      const data = {
        Name: params.row.Name,
        Status: params.row.Status,
        Date: params.row.Date,
        Salary: params.row.Salary,
        Allowance: params.row.Allowance,
      };
      const res = await axios.put(
        "http://localhost:8800/api/salary/update/" + params.row._id,
        data
      );

      if (res.data.status === 200) {
        toast.success(res.data.message);
        loadData();
      } else {
        toast.error(res.data.message);
      }
    };

    return (
      <div className="save">
        <button
          className="button-save"
          onClick={() => {
            if (window.confirm("Are you sure to update this object?"))
              handleSubmit();
          }}
        >
          <MdSaveAlt className="icon-save" />
        </button>
      </div>
    );
  };

  const columns = useMemo(
    () => [
      {
        field: "Name",
        headerName: "Name",
        width: 200,
        editable: true,
      },
      {
        field: "Status",
        headerName: "Status",
        width: 90,
        editable: true,
        type: "singleSelect",
        valueOptions: ["Paid", "Unpaid"],
      },
      {
        field: "Date",
        headerName: "Date",
        width: 150,
      },
      {
        field: "Salary",
        headerName: "Salary",
        width: 130,
        editable: true,
        type: Number,
      },
      {
        field: "Allowance",
        headerName: "Allowance",
        width: 130,
        editable: true,
        type: Number,
      },

      {
        field: "Total",
        headerName: "Total",
        width: 130,
        type: Number,
      },
      {
        field: "save",
        width: 80,
        headerName: "Save",
        type: "actions",
        renderCell: (params) => <Save {...{ params, rowId, setRowId }} />,
        editable: true,
      },
      {
        field: "delete",
        width: 80,
        headerName: "Delete",
        type: "actions",
        renderCell: (params) => <Delete {...{ params, rowId, setRowId }} />,
        editable: true,
      },
    ],
    [rowId]
  );

  const ModalSalary = ({ open }) => {
    const [staff, setStaff] = useState([]);
    const [nameStaff, setNameStaff] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState(moment().format("yyyy-MM-DD"));
    const [salary, setSalary] = useState(0);
    const [allowance, setAllowance] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      const fetchStaff = async () => {
        const res = await axios.get("http://localhost:8800/api/staff/all");
        setStaff(res.data.value);
      };
      fetchStaff();
    }, []);

    const handleStaff = (e) => {
      setNameStaff(e.target.value);
    };
    const handleDate = (e) => {
      const newDate = moment(new Date(e.target.value));
      setDate(newDate);
    };

    const onChangeSalary = (e) => {
      setSalary(e.target.value);
    };

    const onChangeAllow = (e) => {
      setAllowance(e.target.value);
    };

    useEffect(() => {
      const update = async () => {
        const check = parseInt(allowance) + parseInt(salary);
        setTotal(check);
      };
      update();
    });

    const resetForm = () => {
      setDate(moment().format("yyyy-MM-DD"));
      setSalary();
      setAllowance();
      setNameStaff("");
      setStatus("");
      setTimeout(() => {
        setErrField({
          NameErr: "",
          DateErr: "",
          StatusErr: "",
          SalaryErr: "",
        });
      }, 3000);
    };

    const [errField, setErrField] = useState({
      DateErr: "",
      SalaryErr: 0,
      AllowanceErr: 0,
      NameErr: "",
      StatusErr: "",
    });

    const validateForm = () => {
      let formValid = true;
      setDate(moment().format("yyyy-MM-DD"));
      setSalary();
      setAllowance();
      setNameStaff("");
      setStatus("");

      if (nameStaff === "") {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          NameErr: "Please choose name",
        }));
      }

      if (date === "") {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          DateErr: "Please choose date",
        }));
      }

      if (status === "") {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          StatusErr: "Please choose status",
        }));
      }

      if (salary < 0 || salary === 0) {
        formValid = false;
        setErrField((prevState) => ({
          ...prevState,
          SalaryErr: "You have entered an invalid salary",
        }));
      }

      resetForm();
      return formValid;
    };

    const submitHandle = async (e) => {
      e.preventDefault();
      if (validateForm()) {
        const data = {
          Name: nameStaff,
          Status: status,
          Date: date,
          Salary: salary,
          Allowance: allowance,
          Total: total,
        };
        try {
          const res = await axios.post(
            "http://localhost:8800/api/salary/add",
            data
          );
          resetForm();
          if (res.data.status === 200) {
            toast.success(res.data.message);
            loadData();
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          toast.error("Crete salary failed");
          resetForm();
        }
      }
    };

    return (
      open && (
        <div className="salary-modal">
          <ToastContainer />
          <div className="modal-container">
            <div className="header-receipt"> Add salary</div>
            <div className="item-receipt">
              <span className="title-salary"> Staff Name: </span>
              <select
                type="text"
                className="input-receipt"
                placeholder="Staff"
                onChange={handleStaff}
              >
                {staff.map((values, u) => (
                  <option value={values.Name} key={u}>
                    {values.Name}
                  </option>
                ))}
              </select>
            </div>
            {errField.NameErr.length > 0 && (
              <span className="error padding-salary">{errField.NameErr} </span>
            )}
            <div className="item-receipt">
              <span className="title-salary"> Status: </span>
              <select
                type="text"
                className="input-receipt"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            {errField.StatusErr.length > 0 && (
              <span className="error padding-salary">
                {errField.StatusErr}{" "}
              </span>
            )}
            <div className="item-receipt">
              <span className="title-salary"> Date: </span>
              <input
                type="date"
                className="input-receipt"
                placeholder="Date"
                value={moment(date).format("yyyy-MM-DD")}
                onChange={handleDate}
              />
            </div>
            {errField.DateErr.length > 0 && (
              <span className="error padding-salary">{errField.DateErr} </span>
            )}
            <div className="item-receipt">
              <span className="title-salary"> Salary: </span>
              <input
                type="number"
                className="input-receipt"
                placeholder="Salary"
                value={salary}
                onChange={onChangeSalary}
              />
            </div>
            {errField.SalaryErr.length > 0 && (
              <span className="error padding-salary">{errField.SalaryErr}</span>
            )}
            <div className="item-receipt">
              <span className="title-salary"> Allowance: </span>
              <input
                type="number"
                className="input-receipt"
                value={allowance}
                onChange={onChangeAllow}
                placeholder="Allowance"
              />
            </div>
            <div className="item-receipt">
              <span className="title-salary"> Total: </span>
              <input
                type="number"
                className="input-receipt"
                value={total}
                placeholder="0"
              />
            </div>
            <div className="button-receipt">
              <button className="button-action padding" onClick={submitHandle}>
                Create
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="revenue-container">
      <div className="choose-chart">
        <div className="header-revenue">
          <span> Table of salary</span>
        </div>
        <div className="button-revenue">
          {step3 ? (
            <React.Fragment>
              <button
                className="button-action"
                onClick={handleStep3}
                style={{ backgroundColor: "#bf925b", color: "white" }}
              >
                add salary
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button onClick={handleStep3} className="button-action">
                add salary
              </button>
            </React.Fragment>
          )}
          {step1 ? (
            <React.Fragment>
              <button
                className="button-action"
                onClick={handleStep1}
                style={{ backgroundColor: "#bf925b", color: "white" }}
              >
                last month
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button className="button-action" onClick={handleStep1}>
                last month
              </button>
            </React.Fragment>
          )}
          {step2 ? (
            <React.Fragment>
              <button
                className="button-action"
                onClick={handleStep2}
                style={{ backgroundColor: "#bf925b", color: "white" }}
              >
                current month
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button onClick={handleStep2} className="button-action">
                current month
              </button>
            </React.Fragment>
          )}

          {step4 ? (
            <React.Fragment>
              <input
                type="date"
                className="input-date"
                max={dateEnd}
                value={moment(dateStart).format("yyyy-MM-DD")}
                onChange={DateStartHandle}
                style={{ backgroundColor: "#bf925b", color: "white" }}
              ></input>
              <input
                type="date"
                className="input-date"
                value={moment(dateEnd).format("yyyy-MM-DD")}
                onChange={DateEndHandle}
                style={{ backgroundColor: "#bf925b", color: "white" }}
              ></input>
              <button className="button-action" onClick={submitHandle}>
                {" "}
                Submit
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <input
                type="date"
                className="input-date"
                max={dateEnd}
                value={moment(dateStart).format("yyyy-MM-DD")}
                onChange={DateStartHandle}
              ></input>

              <input
                type="date"
                className="input-date"
                value={moment(dateEnd).format("yyyy-MM-DD")}
                onChange={DateEndHandle}
              ></input>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className="charts-container">
        {step1 ? (
          <TableUser
            title={"Manager Salary"}
            column={columns}
            row={dataPrevious}
            rowId={rowId}
            setRowId={setRowId}
          />
        ) : null}
        {step2 ? (
          <TableUser
            title={"Manager Salary"}
            column={columns}
            row={dataMonthCurrent}
            rowId={rowId}
            setRowId={setRowId}
          />
        ) : null}
        {step3 ? <ModalSalary open={open} /> : null}
        {step4 ? (
          <TableUser
            title={"Manager Salary"}
            column={columns}
            row={dataRange}
            rowId={rowId}
            setRowId={setRowId}
          />
        ) : null}
      </div>
    </div>
  );
}
