import React, { useState, useEffect, useMemo } from "react";
import "../../styles/staff.css";
import "../../styles/service.css";
import TopBar from "../../components/topbar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableUser from "../../components/table/table-custom/TableUser";
import axios from "axios";

import { MdDeleteOutline, MdSaveAlt, MdViewHeadline } from "react-icons/md";

export default function Category() {
  const [dataCategory, setDataCategory] = useState([]);
  const [rowId, setRowId] = useState("");
  const [open, setOpen] = useState(false);
  //effect data staff
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/category/all");
        setDataCategory(res.data.value);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategory();
  }, []);

  const Delete = ({ params }) => {
    const handleDelete = async () => {
      const data = params.row._id;
      const categoryName = params.row.Category;
      const response = await axios.delete(
        "http://localhost:8800/api/category/delete/" + data,
        categoryName
      );
      const fetchData = await axios.get(
        "http://localhost:8800/api/category/all"
      );

      const record = response.data;
      if (record.status === 200) {
        toast.success("Delete information successfully");
        setDataCategory(fetchData.data.value);
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

  const Save = ({ params }) => {
    const handleSubmit = async () => {
      const data = {
        Title: params.row.Title,
      };
      const response = await axios.put(
        "http://localhost:8800/api/category/update/" + params.row._id,
        data
      );
      const record = response.data;
      if (record.status === 200) {
        toast.success("Update information successfully");
      } else {
        toast.error("Update information failed");
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

  const View = ({ params, setCategory }) => {
    const submitHandle = () => {
      setOpen(true);
      setCategory(params.row.Category);
    };
    // add link to page information customer
    return (
      <div className="view">
        <button className="button-view" onClick={submitHandle}>
          <MdViewHeadline className="icon-view" />
        </button>
      </div>
    );
  };

  const Modal = ({ open, onClose, category }) => {
    const [dataService, setDataService] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(
          "http://localhost:8800/api/service/category?Category=" + category
        );
        setDataService(res.data.value);
      };
      fetchData();
    }, [category]);

    if (!open) return null;

    return (
      <div className="overlay">
        <div className="modalContainer">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="modal-service">
            <div className="center-modal">
              {dataService.map((value) => (
                <h4 className="list-service" key={value} value={value}>
                  {value}
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // state columns of table
  const columns = useMemo(
    () => [
      {
        field: "Title",
        headerName: "Title",
        width: 300,
        editable: true,
      },
      {
        field: "save",
        width: 150,
        headerName: "Save",
        type: "actions",
        renderCell: (params) => <Save {...{ params }} />,
        editable: true,
      },
      {
        field: "delete",
        width: 150,
        headerName: "Delete",
        type: "actions",
        renderCell: (params) => <Delete {...{ params, rowId, setRowId }} />,
        editable: true,
      },
    ],
    [rowId]
  );
  // create new service
  const [inputField, setInputField] = useState({
    Title: "",
  });

  const InputHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const [errField, setErrField] = useState({
    TitleErr: "",
  }); // validate form before handClick action
  const validateForm = () => {
    let formValid = true;
    setInputField({
      TitleErr: "",
    });
    if (inputField.Title === "") {
      formValid = false;
      setErrField((prevState) => ({
        ...prevState,
        TitleErr: "Please Enter Title !!",
      }));
    }

    return formValid;
  };

  const CreateCategory = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const category = {
        Title: inputField.Title,
      };
      try {
        const response = await axios.post(
          "http://localhost:8800/api/category/add",
          category
        );
        const record = response.data;
        const newData = record.value;
        setDataCategory([...dataCategory, newData]);
        setInputField({
          Title: "",
        });
        setErrField({
          TitleErr: "",
        });
        if (record.status === 200) {
          toast.success(record.message);
        } else {
          toast.error(record.message);
        }
      } catch (err) {
        toast.error("Create is Failed");
      }
    }
  };

  return (
    <div className="container">
      {/* container for sidebar */}
      <Modal open={open} onClose={() => setOpen(false)} rowId={rowId} />
      <ToastContainer />
      <div className="left-container">
        <Sidebar />
      </div>
      {/* container for topBar and mainBar */}
      <div className="right-container">
        <div className="top-container">
          <TopBar />
        </div>
        {/* phần thông tin của staff */}
        <div className="bottom-profile">
          <div className="staff">
            <TableUser
              title={"Manager Category"}
              column={columns}
              row={dataCategory}
              rowId={rowId}
              setRowId={setRowId}
            />
          </div>
        </div>
        <div className="create-service-container">
          <div className="left-service"></div>
          <div className="right-service">
            <form>
              <div className="right-create">
                <h3 className="header-receipt padding-none">
                  {" "}
                  Create new category
                </h3>
                <input
                  type="text"
                  className="input-service"
                  name="Title"
                  placeholder="Title"
                  value={inputField.Title}
                  onChange={InputHandler}
                />
                {errField.TitleErr.length > 0 && (
                  <span className="error">{errField.TitleErr} </span>
                )}
                <button className="button-action" onClick={CreateCategory}>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
