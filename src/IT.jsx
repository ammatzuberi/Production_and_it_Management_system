import { async } from "@firebase/util";
import { MDBDataTable } from "mdbreact";
import { MDBBtn } from "mdb-react-ui-kit";
import {
  doc,
  setDoc,
  updateDoc,
  addDoc,
  arrayUnion,
  Firestore,
} from "firebase/firestore";

import ReactPaginate from "react-paginate";

import { DataGrid } from "@mui/x-data-grid";
import { MultiSelect } from "react-multi-select-component";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
import { db } from "./Firebase";
import { collection, query, getDocs } from "firebase/firestore";
// import "./Production.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import debounce from "@mui/material";
// import { useAuth } from "./../context/AuthContext";
import { FaEdit } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { IoMdAddCircle } from "react-icons/io";
import { ImCross } from "react-icons/im";

import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { DatePicker } from "@mui/lab";
import Nav from "./Nav";
import { transform } from "lodash";
import id from "date-fns/locale/id";
import { height } from "@mui/system";

function IT() {
  const uuid = uuidv4();
  var emailLogin = localStorage.getItem("Email");
  // console.log(emailLogin);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openproduction, setOpenProduction] = useState(false);

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };
  const handleClose = () => {
    setOpen(false);
    setOpenProduction(!openproduction);
    setRotate(!rotate);
    setShowForm(!showForm);
  };
  const [showproduction, setShowproductin] = useState(true);
  const [existingval, setExistingval] = useState([]);
  const [checkval, setCheckval] = useState([]);

  // const options = [
  //   { label: "SOX", value: "SOX" },
  //   { label: "NOX", value: "NOX" },
  //   { label: "BOD", value: "BOD" },
  //   { label: "COD", value: "COD" },
  //   { label: "TSS", value: "TSS" },
  //   { label: "PH", value: "PH" },
  // ];

  const [firebaseOption, setfirebaseOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [para, setPara] = useState([]);

  const hanfleProductionForm = (id, selectedOptions) => {
    setOpenProduction(!openproduction);

    // console.log(id);

    var obj = firebaseData.find((item) => item.ProductionData.id === id);
    // console.log(obj);

    // console.log(obj?.ProductionData.Parameters);
    // let availableParam = obj?.ProductionData.Parameters;
    // availableParam.map((item) => {
    //   console.log(item);
    // });
    // setCheckboxValues(obj?.ProductionData.Parameters)

    // console.log(obj?.ProductionData?.headname);

    setDataproduction(obj.ProductionData);
    // let PreData = productiondata;
    // PreData.headname = obj?.ProductionData?.headname;
    // PreData.ProductionQno = obj?.ProductionData?.ProductionQno;
    // PreData.QuotationDetails = obj?.ProductionData?.QuotationDetails;
    // PreData.ProductionInDate = obj?.ProductionData?.ProductionInDate;
    // PreData.ProductionOUtDate = obj?.ProductionData?.ProductionOUtDate;
    var existing_value = obj.Parameters;
    // console.log(obj?.ProductionData.Parameters);
    console.log(existing_value);
    console.log(options);

    var exval;
    exval = obj?.ProductionData.Parameters;

    // setExistingval(exval);
    console.log(exval);

    // console.log(existingval);

    // setSelectedOptions(selected);
    // options.forEach((item) => {
    //   console.log(item.value);
    // });

    var selectedValues = obj?.Parameters;
    console.log(selectedValues);
    selectedValues.forEach((item) => {
      setPara(item.value);
    });
    // obj?.Parameters.forEach((data) => {
    // console.log(data.value.toString());
    // selectedValues = data.value.toString();

    var optionsToSelect = obj?.Parameters.map((value) => {
      var selval = value.value;
      return options.find((option) => option.value === selval);
    });
    console.log(optionsToSelect);
    setSelectedOptions(optionsToSelect);

    optionsToSelect?.map((option) => {
      console.log(option?.value);
    });
  };

  const productionClose = () => {
    setShowproductin(!showproduction);
  };
  const [options, setOptions] = useState([]);
  //   const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [firebaseData, setFirebasedata] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState([]);

  const [ITissue, setItIssue] = useState([
    {
      Issue: "",
      Department: "",
    },
  ]);
  const [itdata, setItdata] = useState({
    ModelNo: "",
    SerialNo: "",
    INDate: "",
    OutDate: "",
    AllotedTo: "",
  });

  var dep = localStorage.getItem("Department");
  var user = localStorage.getItem("Email");
  // console.log(user);sss

  // console.log(dep);
  var issues_data = [];
  var ptable;

  const PrevParameter = async (e) => {
    const q = query(collection(db, "Parameters"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      id: detail.id,
      ...detail.data(),
    }));

    queryData.forEach((data) => {
      setOptions(data?.Parameter || []);
    });
  };

  const ShowData = async (e) => {
    const q = query(collection(db, "ProductionData"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      id: detail.id,
      ...detail.data(),
    }));

    // console.log(queryData.at(1));
    setFirebasedata(queryData);

    queryData.forEach((issueData) => {
      // console.log(issueData.ProductionData);

      ptable = issueData.ProductionData;

      issues_data = issueData.Issue;
      // console.log(issueData.Issue)e

      // console.log(issues_data)
    });
  };
  const [selected, setSelected] = useState([]);

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelected([...selected, value]);
      console.log(selected);
    } else {
      setSelected(selected.filter((s) => s !== value));
    }
  };

  const [productiondata, setDataproduction] = useState({
    headname: "",
    QuotationDetails: "",
    ProductionInDate: "",
    ProductionOUtDate: "",
    ProductionQno: "",
    Parameters: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchIT, setSearchIT] = useState("");

  const AddProductionData = (e) => {
    e.preventDefault();
    setSelectedOptions([]);
    productiondata.headname = "";
    productiondata.QuotationDetails = "";
    productiondata.ProductionInDate = "";
    productiondata.ProductionOUtDate = "";
    productiondata.ProductionQno = "";
    // selectedOptions = "";
    // setSelected("");

    setOpenProduction(!openproduction);
  };
  const handleQNo = (e) => {
    name = e.target.name;
    value = e.target.value;
    setQuotationNo({ ...quotationNo, [name]: value });
  };

  async function handleLogout() {
    setError("");
    try {
      // await logout();
      localStorage.clear();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const [rotate, setRotate] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);
  const handleButtonClick = (e) => {
    // alert(1)
    e.preventDefault();
    setIsDisabled(false);
    setDisableUpdate(true)
    setRotate(!rotate);
  
    setDept("");
    setNames("");
    // setActions("");

    setShowForm(!showForm);

    // setShowForm(false);
  };

  // const handleCloseForm = (e) => {
  //   e.preventDefault();
  //   setShowForm(!showForm);
  // };

  // const [isVisible, setVisibility] = useState(false);
  let name, value;

  const PostProductionData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setDataproduction({
      ...productiondata,
      [name]: value,
      id: uuid,
    });

    console.log(productiondata);

    console.log(ITissue);
  };
  function handle(e) {
    var v;
    //  setActions(e.target.value)
    //  console.log(actions)
    v = e.target.value;
    setActions(v);
    // console.log(actions);
  }
  const HandleItData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setItdata({
      ...itdata,
      [name]: value,
    });
    // setDataproduction({
    //   ...productiondata.QuotationNo,
    //   [name]: value,
    // });

    console.log(itdata);
  };
  const [names, setNames] = useState("");
  const [dept, setDept] = useState();

  const [artists, setArtists] = useState();
  // const Issues = (e) => {
  //   setCases("");

  //   setNewArrays([...newarry, { id: nextid++, name: cases }]);
  //   console.log(newarry);
  // };

  // Connect With Firebase
  const submitData = async (e) => {
    e.preventDefault();
    setShowproductin(false);

    const q = query(collection(db, "ProductionData"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    setFirebasedata(queryData);
    // console.log(queryData);
    queryData.map(async (v) => {
      await setDoc(doc(db, "ProductionData", productiondata.ProductionQno), {
        ProductionData: productiondata,
        Parameters: selectedOptions,
        QuotationNo: productiondata.ProductionQno,

        // Issue: "",
        // Department: ITissue?.Department,
      });
    });
    console.log(queryData);
  };

  const [quotationNo, setQuotationNo] = useState("");

  const handleItemclicked = async (id) => {
    console.log(id);
    setOpen(true);

    setQuotationNo(id);
    setNames("");
    setDept("");

    console.log(firebaseData);
    let obj = firebaseData.find((element) => element.id === id) || {};
    // console.log(obj);

    let new_data = [];
    console.log(obj?.Issue);
    setArtists(obj?.Issue || []);
    console.log(obj?.Issue);
    obj?.Issue?.map((element) => {
      new_data = element;

      console.log(new_data);
    });
    setItdata(obj.ItData);

    setItdata((prev) => ({
      ...prev,
      [name]: obj,
    }));
  };
  const [edit, setEdit] = useState(null);
  const [active, setActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const setCase = (id) => {
    setIsDisabled(true);
    setActive(!active);
    // console.log(id);
    setRotate(!rotate);
    setShowForm(true);
    setDisableUpdate(false)

    let newEditItem = artists.find((element) => {
      return element.id === id;
    });
    console.log(newEditItem);
    setNames(newEditItem.case);
    setDept(newEditItem.Department);
    setEdit(id);
  };

  var data = [];
  const [actions, setActions] = useState("Pending");

  const CasesData = (e) => {
    e.preventDefault();

    setNames("");
    setDept("");

    // artists.map((item) => {
    setArtists(
      artists.map((elm) => {
        if (elm.id === edit) {
          return { id: edit, Action: actions, case: names, Department: dept };
        }
        return elm;
      })
    );

    console.log(artists);
  };
  const AddData = (e) => {
    e.preventDefault();

    setNames("");
    setDept("");
    artists?.push({
      id: uuid,
      case: names,
      Department: dept,
      Action: actions,
    });
  };
  console.log(actions);

  // const updatearray = (artist) => {
  //   setArtists(
  //     artists.map((t) => {
  //       if (t.id === artist.id) {
  //         return;
  //       }
  //     })
  //   );
  // };
  const SubmitIT = async (e) => {
    e.preventDefault();
    console.log(itdata);

    // setNames("");
    // setDept("");
    // if (names && dept) {
    //   setArtists([...artists, { case: names, Department: dept }]);
    //   // artists.push({
    //   //   case: names,
    //   //   Department: dept,
    //   // });
    // }
    // console.log(artists);

    const q = query(collection(db, "ProductionData"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    setFirebasedata(queryData);
    console.log(queryData);

    queryData.map(async (v) => {
      await updateDoc(doc(db, "ProductionData", quotationNo), {
        // ProductionData: productiondata,

        QuotationNo: quotationNo,
        ItData: itdata,

        // Issue: arrayUnion(artists),
        Issue: artists,
      })
        .then(() => {
          console.log("Data Added Successfully");
          // Swal.fire({
          //   title: "Data Added Successfully",
          //   // text: "Please Change the Parameter",
          //   icon: "success",
          //   confirmButtonText: "OK",
          // });

          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    });

    setOpen(false);
  };

  // const FilterData = firebaseData.filter((item) => {
  //   item.QuotationNo.toLowerCase().includes(searchQuery.toLowerCase());

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const FilterData = firebaseData
    .filter((item) => {
      return item.id.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((item) => {
      return searchQuery ? item : true;
    });

  const HandleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSearchIT(e.target.value);
    // setCurrentPage(0);
  };
  const displayData = searchQuery
    ? FilterData.slice(startIndex, endIndex)
    : firebaseData.slice(startIndex, endIndex);

  const pageCount = searchQuery
    ? Math.ceil(FilterData.length / itemsPerPage)
    : Math.ceil(firebaseData.length / itemsPerPage);

  useEffect(() => {
    ShowData();
    PrevParameter();
  }, []);

  var columns = [
    {
      label: "Id",
      field: "id",
      sort: "asc",
    },
    {
      label: "Headname",
      field: "headname",
      sort: "asc",
    },
    {
      label: "Parameters",
      field: "Parameters",
      sort: "asc",
    },
    {
      label: "Quotation details",
      field: "QuotationDetails",
      sort: "asc",
    },
    {
      label: "Production in date",
      field: "ProductionInDate",
      sort: "asc",
    },
    {
      label: "Alloted",
      field: "Alloted",
      sort: "asc",
    },
    {
      label: "No of issues",
      field: "No_of_Issues",
      sort: "asc",
    },
    {
      label: "Model no",
      field: "Model_No",
      sort: "asc",
    },
    {
      label: "Serial no",
      field: "Serial_No",
      sort: "asc",
    },
    {
      label: "It in date",
      field: "IT_IN_Date",
      sort: "asc",
    },
    {
      label: "It out date",
      field: "IT_OUT_Date",
      sort: "asc",
    },

    {
      label: "Edit",
      field: "Edit",
    },
  ];

  var rows = firebaseData.map((row) => ({
    id: row.id,
    headname: row.ProductionData.headname,
    Parameters: row.Parameters.map((data, index) => (
      <tr key={index}>
        <td>{data.value}</td>
      </tr>
    )),

    QuotationDetails: row.ProductionData.QuotationDetails,
    ProductionInDate: row.ProductionData.ProductionInDate,
    ProductionOutDate: row.ProductionData.ProductionOUtDate,
    Alloted: row?.ItData?.AllotedTo,
    No_of_Issues: row?.Issue?.length,
    Model_No: row?.ItData?.ModelNo,
    Serial_No: row?.ItData?.SerialNo,
    IT_IN_Date: row?.ItData?.INDate,
    IT_OUT_Date: row?.ItData?.OutDate,
    Edit: (
      <Button
        key={row.id}
        onClick={() => handleItemclicked(row.id)}
        style={{
          textDecoration: "none",
          color: "green",
          fontSize: "20px",
        }}
      >
        <FaEdit key={row.id} />
      </Button>
    ),
  }));
  const tableData = {
    columns,
    rows,
  };

  return (
    <>
      {/* <Nav /> */}
      <div>
        <MDBDataTable
          data={tableData}
          noBottomColumns
          striped
          // bordered
          responsive
          sortable
          // options={options}
        />

        <div className="maindiv">
          <Dialog
            className="ItFormContainer"
            open={open}
            onClose={handleClose}
            style={{ width: "100% ", borderRadius: "20px" }}
          >
            <DialogTitle
              style={{
                fontSize: "30px",
                display: "flex",
                justifyContent: "center",
                fontWeight: 600,
              }}
            >
              <span style={{ color: "#6096b4" }}> EESPL IT Form</span>
            </DialogTitle>
            <DialogContent
              style={{
                width: "600px",
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              <form style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="ProductId" style={{ fontSize: "20px" }}>
                  Quotation No
                </label>

                <input
                  type="text"
                  name="QuotationNo"
                  id="QNO"
                  className="ItInput"
                  value={quotationNo}
                  onChange={handleQNo}
                  required
                />
                <label htmlFor="" style={{ fontSize: "20px" }}>
                  Serial No
                </label>
                <input
                  type="text"
                  name="SerialNo"
                  className="ItInput"
                  id=""
                  value={itdata.SerialNo}
                  onChange={HandleItData}
                />
                <label htmlFor="" style={{ fontSize: "20px" }}>
                  Model No
                </label>
                <input
                  className="ItInput"
                  type="text"
                  name="ModelNo"
                  id=""
                  // defaultValue=""
                  value={itdata.ModelNo}
                  onChange={HandleItData}
                />
                <label htmlFor="Alloted TO ">Alloted To</label>
                <input
                  type="text"
                  name="AllotedTo"
                  className="ItInput"
                  value={itdata.AllotedTo}
                  onChange={HandleItData}
                />

                <label htmlFor="IN Date" style={{ fontSize: "20px" }}>
                  In Date
                </label>
                <input
                  className="ItInput"
                  type="date"
                  name="INDate"
                  id=""
                  value={itdata.INDate}
                  onChange={HandleItData}
                />
                <label htmlFor="OUtDate" style={{ fontSize: "20px" }}>
                  Out Date
                </label>
                <input
                  id=""
                  className="ItInput"
                  type="date"
                  name="OutDate"
                  onChange={HandleItData}
                  value={itdata.OutDate}
                />
              </form>
              <span> Previous Issues:</span>
              <div className="cardsContainer">
                {artists?.map((issuedata, index) => {
                  // console.log(index);
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginRight: "20px",

                        // marginBottom:"10px"
                      }}
                    >
                      <div
                        key={index}
                        className="Issues_style"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          borderBottomLeftRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }}
                      >
                        <div
                        // style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            className={
                              issuedata.id === edit ? "active" : "notactive"
                            }
                            onClick={() => setCase(issuedata.id)}
                            style={{
                              // borderRadius: "20px",
                              // borderBottomLeftRadius: "20px"
                              borderRadius: "15px",

                              display: "flex",
                              flexDirection: "column",
                              padding: "10px",
                              marginLeft: "-10px",

                              // color:
                              //   issuedata.Action === "Pending"
                              //     ? "yellow"
                              //     : "green",
                              // color: "#fff",
                              // padding: "5px",
                            }}
                          >
                            <span>
                              <span
                                style={{
                                  fontWeight: 500,

                                  padding: "5px",
                                }}
                              >
                                Case:
                              </span>
                              {issuedata?.case}
                            </span>
                            <span>
                              <span
                                style={{
                                  fontWeight: 600,
                                  padding: "5px",
                                }}
                              >
                                Department:
                              </span>
                              {issuedata?.Department}
                            </span>
                            <span>
                              <span
                                style={{
                                  fontWeight: 600,
                                  padding: "5px",
                                }}
                              >
                                Action:
                              </span>
                              <span
                                style={{
                                  // paddingBottom:"100px",
                                  fontWeight: 800,
                                  color:
                                    issuedata?.Action === "Pending"
                                      ? "#f0ad4e"
                                      : "Green",
                                }}
                              >
                                {issuedata?.Action}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <label style={{ fontSize: "20px", marginTop: "10px" }}>
                <span> New Issues ?</span>
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid blue",
                  width: "fit-content",
                }}
              ></div>
              {/* <input value={previssue} /> */}
              <div>
                <div
                  // style={{display:"flex", justifyContent:"space-between"}}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    className={`btn ${rotate ? "rotate-90" : ""}`}
                    onClick={handleButtonClick}
                    style={{
                      border: "none",
                      color: "green",
                      fontSize: "30px",
                    }}
                  >
                    {showForm ? (
                      <IoMdAddCircle className="CrossContainer" />
                    ) : (
                      <IoMdAddCircle className="plusContainer" />
                    )}
                  </button>
                </div>
                {showForm && (
                  <div className="popup_form">
                    <form
                      action=""
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <label style={{ fontSize: "20px", color: "#454545" }}>
                        Issue
                      </label>
                      {/* {artists?.map((data, index) => { */}
                      <textarea
                        name="names"
                        id=""
                        cols="5"
                        rows="5"
                        placeholder="Enter Issues "
                        // onChange={Issues}
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                      ></textarea>
                      ;{/* })} */}
                      {/* <button onClick={(e) => {}}>add</button> */}
                      <label style={{ fontSize: "20px", color: "#454545" }}>
                        Department
                      </label>
                      <input
                        className="ItInput"
                        name="Department"
                        type="text"
                        placeholder="Enter Department Name"
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                      />
                      <label style={{ fontSize: "20px", color: "#454545" }}>
                        Action
                      </label>
                      <select
                        style={{ padding: "10px" }}
                        onChange={(e) => handle(e)}
                        value={actions}
                        // defaultValue={actions}
                      >
                        {/* <option>--Select--</option> */}
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </form>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {disableUpdate ? null : (
                        <button
                          onClick={CasesData}
                          disabled={disableUpdate}
                          style={{
                            marginTop: "10px",
                            width: "30%",
                            marginBottom: "10px",
                            backgroundColor: "#f7a933",
                            color: "white",
                            border: "none",
                            padding: "10px",
                          }}
                        >
                          Update
                        </button>
                      )}
                      {isDisabled ? null : (
                        <button
                          disabled={isDisabled}
                          onClick={AddData}
                          style={{
                            marginTop: "10px",
                            width: "30%",
                            marginBottom: "10px",
                            backgroundColor: "#47958a",
                            color: "white",
                            border: "none",
                            padding: "10px",
                          }}
                        >
                          Add New Case
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogActions>
              <div style={{ marginBottom: "20px" }}>
                <Button
                  onClick={handleClose}
                  style={{
                    textDecoration: "none",
                    color: "red",
                    border: "1px solid red",
                    marginRight: "20px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={SubmitIT}
                  style={{ border: "1px solid green", color: "green" }}
                >
                  Save
                </Button>
              </div>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default IT;
