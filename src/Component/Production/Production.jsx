import { async } from "@firebase/util";
import { MDBDataTable } from "mdbreact";
import { MDBBtn } from "mdb-react-ui-kit";
import { startTransition } from "react";

import {
  doc,
  setDoc,
  updateDoc,
  addDoc,
  arrayUnion,
  Firestore,
} from "firebase/firestore";

import ReactPaginate from "react-paginate";

import "./pagination.css";

import { DataGrid } from "@mui/x-data-grid";
import { MultiSelect } from "react-multi-select-component";
import Swal from "sweetalert2";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../../Firebase";
import { collection, query, getDocs } from "firebase/firestore";
import "./Production.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import debounce from "@mui/material";
import { useAuth } from "./../context/AuthContext";
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
import Nav from "../../Nav";
import { transform } from "lodash";
import id from "date-fns/locale/id";
import { height } from "@mui/system";
import Demo from "../../Demo";
import Test from "../../Test";
import IT from "../../IT";
import { useCallback } from "react";
import { useMemo } from "react";

export default function Production() {
  // Data Table For Production

  const uuid = uuidv4();
  var emailLogin = localStorage.getItem("Email");
  // console.log(emailLogin);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openproduction, setOpenProduction] = useState(false);
  const [openeditproduction, setOpenEditProduction] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setOpenProduction(!openproduction);
  };
  const handleCloseEdit_production = () => {
    setOpenEditProduction(!openeditproduction);
  };
  const [showproduction, setShowproductin] = useState(true);
  const [existingval, setExistingval] = useState([]);
  const [checkval, setCheckval] = useState([]);

  // const options = [
  //   { label: "SOX", value: "SOX" },
  //   { label: "NOX", value: "NOX" },openeditprodution
  //   { label: "BOD", value: "BOD" },
  //   { label: "COD", value: "COD" },
  //   { label: "TSS", value: "TSS" },
  //   { label: "PH", value: "PH" },
  // ];

  const [firebaseOption, setfirebaseOption] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [para, setPara] = useState([]);

  // edit_Production
  const SubmitEdit_Production = async (e) => {
    e.preventDefault();
    setShowproductin(false);

    const q = query(collection(db, "ProductionData"));
    const querySnapshot = await getDocs(q); 
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    // setFirebasedata(queryData);
    // console.log(queryData);
    queryData.map(async (v) => {
      const docRef = db
        .collection("ProductionData")
        .doc(productiondata.ProductionQno);

      await setDoc(doc(db, "ProductionData", productiondata.ProductionQno), {
        ProductionData: productiondata,
        Parameters: selectedOptions,
        QuotationNo: productiondata.ProductionQno,

        // Issue: "",
        // Department: ITissue?.Department,
      });
    });
    console.log(queryData);
    // window.location.reload();
  };

  const hanfleProductionForm = (id, selectedOptions) => {
    setOpenEditProduction(!openeditproduction);

    var obj = firebaseData.find((item) => item.ProductionData.id === id);

    setDataproduction(obj.ProductionData);

    var existing_value = obj.Parameters;

    console.log(existing_value);
    console.log(options);

    var exval;
    exval = obj?.ProductionData.Parameters;

    console.log(exval);

    var selectedValues = obj?.Parameters;
    console.log(selectedValues);
    selectedValues.forEach((item) => {
      setPara(item.value);
    });

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
  const { currentUser, logout } = useAuth();
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

  const proRef = useRef("");

  const ShowData = async (e) => {
    const q = query(collection(db, "ProductionData"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      id: detail.id,
      ...detail.data(),
    }));

    // console.log(queryData.at(1));

    setFirebasedata(queryData);
    proRef.current = queryData;
    // console.log(proRef.current);

    queryData.forEach((issueData) => {
      // console.log(issueData.ProductionData);

      ptable = issueData.ProductionData;

      issues_data = issueData.Issue;
      // console.log(issueData.Issue)e

      // console.log(issues_data)
    });
  };
  console.log(proRef);
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
    // setOpenEditProduction(!openeditproduction);
  };

  const EditProductionData = (e) => {
    e.preventDefault();

    // selectedOptions = "";
    // setSelected("");

    // setOpenProduction(!openproduction);
    setOpenEditProduction(!openeditproduction);
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
  const handleButtonClick = (e) => {
    e.preventDefault();
    setRotate(!rotate);

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
  const [ProData, setProdData] = useState();

  const HandleProductionData = () => {
    setProdData(firebaseData);
  };

  const submitData = async (e) => {
    e.preventDefault();
    setShowproductin(false);

    const q = query(collection(db, "ProductionData"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    // setFirebasedata(queryData);
    // console.log(queryData);
    queryData.map(async (v) => {
      const docRef = db
        .collection("ProductionData")
        .doc(productiondata.ProductionQno);

      try {
        const document = await docRef.get();
        console.log(document.exists);
        if (document.exists) {
          Swal.fire({
            title: "Data Already Found",
            // text: "Please Change the Parameter",
            icon: "Error",
            confirmButtonText: "OK",
          });
          // window.location.reload();
        } else {
          await setDoc(
            doc(db, "ProductionData", productiondata.ProductionQno),
            {
              ProductionData: productiondata,
              Parameters: selectedOptions,
              QuotationNo: productiondata.ProductionQno,

              // Issue: "",
              // Department: ITissue?.Department,
            }
          );
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error creating document!");
      }
    });
    console.log(queryData);
    // setFirebasedata(queryData);

    // window.location.reload();
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
  const setCase = (id) => {
    setActive(!active);
    // console.log(id);
    setRotate(!rotate);
    setShowForm(true);

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
          return { ...elm, Action: actions, Case: names, Department: dept };
        }
        return elm;
      })
    );

    console.log(artists);
  };
  // const AddData = (e) => {
  //   e.preventDefault();

  //   setNames("");
  //   setDept("");
  //   artists?.push({
  //     id: uuid,
  //     case: names,
  //     Department: dept,
  //     Action: actions,
  //   });
  // };

  // const updatearray = (artist) => {
  //   setArtists(
  //     artists.map((t) => {
  //       if (t.id === artist.id) {
  //         return;
  //       }
  //     })
  //   );
  // };
  // const SubmitIT = async (e) => {
  //   e.preventDefault();
  //   console.log(itdata);

  //   const q = query(collection(db, "ProductionData"));
  //   const querySnapshot = await getDocs(q);
  //   const queryData = querySnapshot.docs.map((detail) => ({
  //     ...detail.data(),
  //     id: detail.id,
  //   }));
  //   setFirebasedata(queryData);
  //   console.log(queryData);

  //   queryData.map(async (v) => {
  //     await updateDoc(doc(db, "ProductionData", quotationNo), {
  //       // ProductionData: productiondata,

  //       QuotationNo: quotationNo,
  //       ItData: itdata,

  //       // Issue: arrayUnion(artists),
  //       Issue: artists,
  //     })
  //       .then(() => {
  //         console.log("Data Added Successfully");

  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });

  //   setOpen(false);
  // };

  // const FilterData = firebaseData.filter((item) => {
  //   item.QuotationNo.toLowerCase().includes(searchQuery.toLowerCase());

  // const [currentPage, setCurrentPage] = useState(0);

  // const handlePageChange = ({ selected }) => {
  //   setCurrentPage(selected);
  // };

  // const itemsPerPage = 4;
  // const startIndex = currentPage * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  // const FilterData = firebaseData
  //   .filter((item) => {
  //     return item.id.toLowerCase().includes(searchQuery.toLowerCase());
  //   })
  //   .filter((item) => {
  //     return searchQuery ? item : true;
  //   });

  // const HandleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  //   setSearchIT(e.target.value);
  //   // setCurrentPage(0);
  // };
  // const displayData = searchQuery
  //   ? FilterData.slice(startIndex, endIndex)
  //   : firebaseData.slice(startIndex, endIndex);

  // const pageCount = searchQuery
  //   ? Math.ceil(FilterData.length / itemsPerPage)
  //   : Math.ceil(firebaseData.length / itemsPerPage);

  console.log(proRef);

  useEffect(() => {
    // console;
    PrevParameter();
    ShowData();

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
      label: "Production out date",
      field: "ProductionOutDate",
      sort: "asc",
    },
    {
      label: "Edit",
      field: "Edit",
    },
  ];
  // var rows = proRef.current?.map((item) => {
  //   console.log(item);
  // });

  // console.log(proRef.current.map((item)=>));
  var rows = firebaseData?.map((row) => ({
    id: row?.id,
    headname: row?.ProductionData?.headname,
    Parameters: row?.Parameters?.map((data, index) => (
      <div key={index}>
        <td>{data.value}</td>
      </div>
    )),

    QuotationDetails: row?.ProductionData?.QuotationDetails,
    ProductionInDate: row?.ProductionData?.ProductionInDate,
    ProductionOutDate: row?.ProductionData?.ProductionOUtDate,
    Edit: (
      <button
        onClick={() => hanfleProductionForm(row.ProductionData.id)}
        style={{
          border: "none",
          backgroundColor: "#45857d",
          color: "white",
          borderRadius: "50%",
        }}
      >
        <i class="fas fa-pen"></i>
      </button>
    ),
  }));

  const tableData = {
    columns,
    rows,
  };

  // IT Table

  return (
    <>
      <Nav />
      {/* <Test /> */}

      {user === "admin@enggenv.com" ? (
        <Demo />
      ) : (
        <div className="DivContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "self-end",
              marginTop: 0,
              padding: 0,
            }}
          ></div>

          {dep == "Production" ? (
            <div
              className=""
              // style={{
              //   display: "flex",
              //   flexDirection: "column",
              //   padding: "20px",
              //   backgroundColor: "#f9fdfe",
              //   marginTop: "-20px",
              // }}
            >
              {" "}
              <MDBDataTable data={tableData} noBottomColumns sortable />
              {/* <input
                className="Search_TopBox"
                type="search"
                placeholder="Search Quotation here"
                // onChange={(e) => setSearchQuery(e.target.value)}
                onChange={HandleSearch}
                style={{
                  border: "1px solid #f7f8fc",
                  height: "40px",

                  background: "#f7f8fc",
                  margin: "10px",
                  position: "absolute",
                  top: "0",
                  marginLeft: "430px",
                }}
              /> */}
              <div
                style={{ position: "absolute", top: " 67px", right: "38px" }}
              >
                <div style={{ width: "100%" }}>
                  <div>
                    {/* <span
                      style={{
                        color: "#020d4c",
                        fontWeight: 600,
                        fontSize: "25px",
                      }}
                    >
                      List Of Quotation
                    </span> */}

                    {/* ADD button */}
                    {/* <input type="search">Search </input> */}
                    <div>
                      <button
                        onClick={AddProductionData}
                        className="AddProductionBtn"
                        style={{
                          backgroundColor: "#37c2ce",
                          color: "white",
                          width: "150px",
                          fontSize: "13px",
                          padding: "10px",
                        }}
                      >
                        <span style={{ marginRight: "10px", fontWeight: 700 }}>
                          {" "}
                          ADD NEW
                        </span>
                        {/* <AiOutlinePlus /> */}
                        <span>
                          <AddIcon style={{ fontWeight: 900 }} />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* mui Table OF Production */}

                <ul>
                  {/* {displayedData.ProductionData.map((item) => (
                    <li key={item.id}>{item.headname}</li>
                  ))} */}

                  {/* {console.log(displayedData)} */}
                </ul>

                {/* <div className="tableConatiner">
                  <table className="table_production">
                    <thead>
                      <tr>
                        <th className="Production_TH">Quotation No</th>
                        <th className="Production_TH">Parameters</th>
                        <th className="Production_TH">Head Name</th>
                        <th className="Production_TH">Quotation Details</th>
                        <th className="Production_TH">Production In Date</th>
                        <th className="Production_TH">Production Out Date</th>
                        <th className="Production_TH">Action</th>
                      </tr>
                    </thead>

                    {displayData.map((pdata) => (
                      // <li key={item.id}>{item.id}</li>

                      <tbody key={pdata.id}>
                        <tr>
                          <td className="Production_TD">{pdata.id}</td>
                          <td
                            style={{ padding: "10px" }}
                            className="parameterDatagrid"
                          >
                            {pdata?.Parameters?.map((ParametersData, index) => {
                              return (
                                <span
                                  style={{ padding: "10px" }}
                                  key={index}
                                  className="ParamerterGridCss"
                                >
                                  {ParametersData.value}
                                </span>
                              );
                            })}
                          </td>
                          <td className="Production_TD">
                            {pdata.ProductionData?.headname}
                          </td>
                          <td className="Production_TD">
                            {pdata.ProductionData?.QuotationDetails}
                          </td>
                          <td className="Production_TD">
                            {pdata.ProductionData?.ProductionInDate}
                          </td>
                          <td className="Production_TD">
                            {pdata.ProductionData?.ProductionOUtDate}
                          </td>
                          <td className="Production_TD">
                            <button
                              style={{
                                border: "none",
                                color: "green",
                                fontSize: "20px",
                              }}
                              onClick={() =>
                                hanfleProductionForm(pdata.ProductionData.id)
                              }
                            >
                              <TbEdit />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}

                    <span>
                      <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        // pageCount={page}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        className="pagination"
                        // forcePage={0}
                      />
                    </span>

                    {/* {firebaseData
                      .filter((pdata) =>
                        pdata.id
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((pdata) => {
                        // setProductiontable(pdata.ProductionData);
                        // console.log(pdata.QuotationNo.QuotationNo);
                        return (
                          <tbody key={pdata.id}>
                            <tr>
                              <td className="Production_TD">{pdata.id}</td>
                              <td
                                style={{ marginRight: "10px", padding: "10px" }}
                                className="Production_TD"
                              >
                                {pdata?.Parameters?.map(
                                  (ParametersData, index) => {
                                    return (
                                      <span
                                        style={{ padding: "10px" }}
                                        key={index}
                                      >
                                        {ParametersData.value}
                                      </span>
                                    );
                                  }
                                )}
                              </td>
                              <td className="Production_TD">
                                {pdata.ProductionData?.headname}
                              </td>
                              <td className="Production_TD">
                                {pdata.ProductionData?.QuotationDetails}
                              </td>
                              <td className="Production_TD">
                                {pdata.ProductionData?.ProductionInDate}
                              </td>
                              <td className="Production_TD">
                                {pdata.ProductionData?.ProductionOUtDate}
                              </td>
                              <td className="Production_TD">
                                <button
                                  style={{
                                    border: "none",
                                    color: "green",
                                    fontSize: "20px",
                                  }}
                                  onClick={() =>
                                    hanfleProductionForm(
                                      pdata.ProductionData.id
                                    )
                                  }
                                >
                                  <TbEdit />
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })} *
                  </table>
                </div> */}

                {showproduction && (
                  <div
                    className="formContainer"
                    style={{ position: "absolute" }}
                  >
                    {/* ADD New */}
                    <div className="ProductionFormContainer">
                      <Dialog
                        open={openproduction}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{ padding: "50px" }}
                        className="ProductionForm"
                      >
                        <div>
                          {/* <div></div> */}
                          <DialogTitle
                            style={{
                              fontSize: "15px",
                              display: "flex",
                              justifyContent: "left",
                              fontWeight: 600,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "#4e5560",
                                  fontSize: "25px",
                                  marginRight: "110px",
                                  cursor: "default",
                                }}
                              >
                                E&E Production Form
                              </span>
                              <span
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                }}
                                onClick={AddProductionData}
                              >
                                <ImCross onClick={AddProductionData} />
                              </span>
                            </div>
                          </DialogTitle>
                          <DialogContent>
                            <form
                              onSubmit={submitData}
                              className="productionForm"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                // height: "100%",
                              }}
                            >
                              <label className="ProdutcionFormLabel">
                                Head Name
                              </label>
                              <input
                                className="Production_Input"
                                type="text"
                                name="headname"
                                id=""
                                value={productiondata.headname}
                                onChange={PostProductionData}
                                placeholder="Enter head name"
                                required
                              />
                              <label
                                htmlFor="ProductId"
                                className="ProdutcionFormLabel"
                              >
                                Quotation No
                              </label>
                              <input
                                className="Production_Input"
                                type="text"
                                name="ProductionQno"
                                id="ProductionQno"
                                value={productiondata.ProductionQno}
                                onChange={PostProductionData}
                                placeholder="Enter Quotation "
                                required
                              />

                              <label className="ProdutcionFormLabel">
                                Quotation Details
                              </label>
                              <textarea
                                name="QuotationDetails"
                                id=""
                                // cols="10"
                                rows="2 "
                                className="Production_Input"
                                placeholder="Enter Quotation Details"
                                value={productiondata.QuotationDetails}
                                onChange={PostProductionData}
                              ></textarea>
                              <label
                                htmlFor="Parameters"
                                className="ProdutcionFormLabel"
                              >
                                Parameters:
                              </label>

                              {/* <p className="checkbox">{checkboxValues.join(",")}</p> */}

                              <MultiSelect
                                options={options}
                                value={selectedOptions}
                                onChange={setSelectedOptions}
                                labelledBy="Select"
                                hasSelectAll={false}
                                disableSearch={true}
                                overrideStrings={{
                                  selectSomeItems: "Select options",
                                  allItemsAreSelected:
                                    "All options are selected",
                                  selectAll: "Select all",
                                  search: "Search",
                                }}
                              />
                              <label className="ProdutcionFormLabel">
                                Production In Date
                              </label>
                              <input
                                type="date"
                                name="ProductionInDate"
                                id=""
                                className="Production_Input"
                                value={productiondata.ProductionInDate}
                                onChange={PostProductionData}
                                required
                              />

                              <label
                                htmlFor="Out Date"
                                className="ProdutcionFormLabel"
                              >
                                Production Out Date
                              </label>
                              <input
                                type="date"
                                name="ProductionOUtDate"
                                id=""
                                className="Production_Input"
                                value={productiondata.ProductionOUtDate}
                                onChange={PostProductionData}
                              />

                              <DialogActions>
                                <Button
                                  onClick={AddProductionData}
                                  className="Cancle_production_Btn"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  className="submit_ProductionBtn"
                                  // onClick={submitData}
                                  autoFocus
                                  style={{ border: "1px solid #bfdbfe" }}
                                >
                                  Send To It
                                </Button>
                              </DialogActions>
                            </form>
                          </DialogContent>
                        </div>
                      </Dialog>
                    </div>

                    {/* Edit Production Data */}

                    <div className="ProductionFormContainer">
                      <Dialog
                        open={openeditproduction}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{ padding: "50px" }}
                        className="ProductionForm"
                      >
                        <div>
                          {/* <div></div> */}
                          <DialogTitle
                            style={{
                              fontSize: "15px",
                              display: "flex",
                              justifyContent: "left",
                              fontWeight: 600,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  color: "#4e5560",
                                  fontSize: "25px",
                                  marginRight: "110px",
                                  cursor: "default",
                                }}
                              >
                                E&E Production Edit Form
                              </span>
                              <span
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                }}
                                onClick={EditProductionData}
                              >
                                <ImCross onClick={EditProductionData} />
                              </span>
                            </div>
                          </DialogTitle>
                          <DialogContent>
                            <form
                              onSubmit={SubmitEdit_Production}
                              className="productionForm"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                // height: "100%",
                              }}
                            >
                              <label className="ProdutcionFormLabel">
                                Head Name
                              </label>
                              <input
                                className="Production_Input"
                                type="text"
                                name="headname"
                                id=""
                                value={productiondata.headname}
                                onChange={PostProductionData}
                                placeholder="Enter head name"
                                required
                              />
                              <label
                                htmlFor="ProductId"
                                className="ProdutcionFormLabel"
                              >
                                Quotation No
                              </label>
                              <input
                                className="Production_Input"
                                type="text"
                                name="ProductionQno"
                                id="ProductionQno"
                                value={productiondata.ProductionQno}
                                onChange={PostProductionData}
                                placeholder="Enter Quotation "
                                required
                                disabled
                              />

                              <label className="ProdutcionFormLabel">
                                Quotation Details
                              </label>
                              <textarea
                                name="QuotationDetails"
                                id=""
                                // cols="10"
                                rows="2 "
                                className="Production_Input"
                                placeholder="Enter Quotation Details"
                                value={productiondata.QuotationDetails}
                                onChange={PostProductionData}
                              ></textarea>
                              <label
                                htmlFor="Parameters"
                                className="ProdutcionFormLabel"
                              >
                                Parameters:
                              </label>

                              {/* <p className="checkbox">{checkboxValues.join(",")}</p> */}

                              <MultiSelect
                                options={options}
                                value={selectedOptions}
                                onChange={setSelectedOptions}
                                labelledBy="Select"
                                hasSelectAll={false}
                                disableSearch={true}
                                overrideStrings={{
                                  selectSomeItems: "Select options",
                                  allItemsAreSelected:
                                    "All options are selected",
                                  selectAll: "Select all",
                                  search: "Search",
                                }}
                              />
                              <label className="ProdutcionFormLabel">
                                Production In Date
                              </label>
                              <input
                                type="date"
                                name="ProductionInDate"
                                id=""
                                className="Production_Input"
                                value={productiondata.ProductionInDate}
                                onChange={PostProductionData}
                                required
                              />

                              <label
                                htmlFor="Out Date"
                                className="ProdutcionFormLabel"
                              >
                                Production Out Date
                              </label>
                              <input
                                type="date"
                                name="ProductionOUtDate"
                                id=""
                                className="Production_Input"
                                value={productiondata.ProductionOUtDate}
                                onChange={PostProductionData}
                              />

                              <DialogActions>
                                <Button
                                  onClick={handleCloseEdit_production}
                                  className="Cancle_production_Btn"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  className="submit_ProductionBtn"
                                  // onClick={submitData}
                                  autoFocus
                                  style={{ border: "1px solid #bfdbfe" }}
                                >
                                  Send To It
                                </Button>
                              </DialogActions>
                            </form>
                          </DialogContent>
                        </div>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // E&E IT LOGin
            <IT />
            // <div className="formitconatiner">
            //   {/* <MDBDataTable data={ITTable} /> */}
            //   <div
            //     className="ITContainer"
            //     style={{
            //       display: "flex",
            //       flexDirection: "column",
            //       padding: "20px",
            //       // padding: "30px",
            //       background: "#f9fdfe",

            //       marginTop: "-18px",
            //     }}
            //   >
            //     {/* <input
            //       className="Search_TopBox"
            //       type="search"
            //       placeholder="Search Quotation here"
            //       // onChange={(e) => setSearchIT(e.target.value)}
            //       onChange={HandleSearch}
            //       style={{
            //         border: "1px solid #f7f8fc",
            //         height: "40px",

            //         background: "#f7f8fc",
            //         margin: "10px",
            //         position: "absolute",
            //         top: "0",
            //         marginLeft: "430px",
            //       }}
            //     /> */}
            //     {/* <table
            //       style={{
            //         marginTop: "40px",
            //         fontSize: "12px",
            //         position: "absolute",
            //         top: "68px",
            //       }}
            //       className="IT_Table"
            //     >
            //       <thead>
            //         <tr>
            //           <th className="IT_th">Quotation No</th>
            //           <th className="IT_th">Parameters</th>
            //           <th className="IT_th">Head Name</th>
            //           <th className="IT_th">Quotation Details</th>
            //           <th className="IT_th">Production In Date</th>
            //           <th className="IT_th">Production Out Date</th>
            //           <th className="IT_th">Alloted To</th>
            //           <th className="IT_th">No of Issues</th>
            //           <th className="IT_th">Model No</th>
            //           <th className="IT_th">Serial No</th>
            //           <th className="IT_th">IT IN Date</th>
            //           <th className="IT_th">IT OUT Date</th>

            //           <th className="IT_th">Edit</th>
            //         </tr>
            //       </thead>
            //       {displayData
            //         // .filter((pdata) =>
            //         //   pdata.id.toLowerCase().includes(searchIT.toLowerCase())
            //         // )
            //         .map((pdata) => {
            //           // console.log(pdata.Parameters);
            //           // console.log(pdata.QuotationNo.QuotationNo);
            //           return (
            //             <tbody
            //               key={pdata.id}
            //               style={{
            //                 marginBottom: "20px",
            //                 borderSpacing: "10px",
            //               }}
            //             >
            //               <tr style={{ paddingBottom: "50px" }}>
            //                 <td className="IT_td">{pdata.id} </td>

            //                 <td className="parameterDatagrid">
            //                   {pdata?.Parameters?.map(
            //                     (ParametersData, index) => {
            //                       return (
            //                         <span
            //                           className="parameterDatagrid"
            //                           style={{
            //                             padding: "10px",
            //                           }}
            //                           key={index}
            //                         >
            //                           <span>{ParametersData.value}</span>
            //                         </span>
            //                       );
            //                     }
            //                   )}
            //                 </td>
            //                 <td className="IT_td">
            //                   {pdata?.ProductionData?.headname}
            //                 </td>
            //                 <td className="IT_td">
            //                   {pdata?.ProductionData?.QuotationDetails}
            //                 </td>
            //                 <td className="IT_td">
            //                   {pdata?.ProductionData?.ProductionInDate}
            //                 </td>
            //                 <td className="IT_td">
            //                   {pdata?.ProductionData?.ProductionOUtDate}
            //                 </td>
            //                 <td className="IT_td" style={{ fontWeight: "700" }}>
            //                   {pdata?.ItData?.AllotedTo}
            //                 </td>

            //                 <td className="IT_td">
            //                   <span
            //                   // style={{
            //                   //   color:
            //                   //     issue?.Action === "Resolved"
            //                   //       ? "green"
            //                   //       : "red",
            //                   // }}
            //                   >
            //                     {pdata?.Issue?.length}
            //                   </span>
            //                 </td>
            //                 <td className="IT_td">{pdata?.ItData?.ModelNo}</td>
            //                 <td className="IT_td">{pdata?.ItData?.SerialNo}</td>
            //                 <td className="IT_td">{pdata?.ItData?.INDate}</td>
            //                 <td className="IT_td">{pdata?.ItData?.OutDate}</td>

            //                 <td className="IT_td">
            //                   <Button
            //                     key={pdata.id}
            //                     onClick={() => handleItemclicked(pdata.id)}
            //                     style={{
            //                       textDecoration: "none",
            //                       color: "green",
            //                       fontSize: "20px",
            //                     }}
            //                   >
            //                     <FaEdit key={pdata.id} />
            //                   </Button>
            //                 </td>
            //               </tr>
            //             </tbody>
            //           );
            //         })}
            //       <span>
            //         <ReactPaginate
            //           previousLabel={"<"}
            //           nextLabel={">"}
            //           breakLabel={"..."}
            //           pageCount={pageCount}
            //           // pageCount={page}
            //           marginPagesDisplayed={2}
            //           pageRangeDisplayed={5}
            //           onPageChange={handlePageChange}
            //           containerClassName={"pagination"}
            //           activeClassName={"active"}
            //           className="pagination"
            //           // forcePage={0}
            //         />
            //       </span>
            //       </table> */}
            //   </div>

            //   <div className="maindiv">
            //     <Dialog
            //       className="ItFormContainer"
            //       open={open}
            //       onClose={handleClose}
            //       style={{ width: "100% ", borderRadius: "20px" }}
            //     >
            //       <DialogTitle
            //         style={{
            //           fontSize: "30px",
            //           display: "flex",
            //           justifyContent: "center",
            //           fontWeight: 600,
            //         }}
            //       >
            //         <span style={{ color: "#6096b4" }}> EESPL IT Form</span>
            //       </DialogTitle>
            //       <DialogContent
            //         style={{
            //           width: "600px",
            //           paddingLeft: "50px",
            //           paddingRight: "50px",
            //         }}
            //       >
            //         <form style={{ display: "flex", flexDirection: "column" }}>
            //           <label htmlFor="ProductId" style={{ fontSize: "20px" }}>
            //             Quotation No
            //           </label>

            //           <input
            //             type="text"
            //             name="QuotationNo"
            //             id="QNO"
            //             className="ItInput"
            //             value={quotationNo}
            //             onChange={handleQNo}
            //             required
            //           />
            //           <label htmlFor="" style={{ fontSize: "20px" }}>
            //             Serial No
            //           </label>
            //           <input
            //             type="text"
            //             name="SerialNo"
            //             className="ItInput"
            //             id=""
            //             value={itdata.SerialNo}
            //             onChange={HandleItData}
            //           />
            //           <label htmlFor="" style={{ fontSize: "20px" }}>
            //             Model No
            //           </label>
            //           <input
            //             className="ItInput"
            //             type="text"
            //             name="ModelNo"
            //             id=""
            //             // defaultValue=""
            //             value={itdata.ModelNo}
            //             onChange={HandleItData}
            //           />
            //           <label htmlFor="Alloted TO ">Alloted To</label>
            //           <input
            //             type="text"
            //             name="AllotedTo"
            //             className="ItInput"
            //             value={itdata.AllotedTo}
            //             onChange={HandleItData}
            //           />

            //           <label htmlFor="IN Date" style={{ fontSize: "20px" }}>
            //             In Date
            //           </label>
            //           <input
            //             className="ItInput"
            //             type="date"
            //             name="INDate"
            //             id=""
            //             value={itdata.INDate}
            //             onChange={HandleItData}
            //           />
            //           <label htmlFor="OUtDate" style={{ fontSize: "20px" }}>
            //             Out Date
            //           </label>
            //           <input
            //             id=""
            //             className="ItInput"
            //             type="date"
            //             name="OutDate"
            //             onChange={HandleItData}
            //             value={itdata.OutDate}
            //           />
            //         </form>
            //         <span> Previous Issues:</span>
            //         <div className="cardsContainer">
            //           {artists?.map((issuedata, index) => {
            //             // console.log(index);
            //             return (
            //               <div
            //                 key={index}
            //                 style={{
            //                   display: "flex",
            //                   flexDirection: "row",
            //                   marginRight: "20px",

            //                   // marginBottom:"10px"
            //                 }}
            //               >
            //                 <div
            //                   key={index}
            //                   className="Issues_style"
            //                   style={{
            //                     display: "flex",
            //                     flexDirection: "row",
            //                     borderBottomLeftRadius: "20px",
            //                     borderBottomRightRadius: "20px",
            //                   }}
            //                 >
            //                   <div
            //                   // style={{ display: "flex", flexDirection: "column" }}
            //                   >
            //                     <div
            //                       className={
            //                         issuedata.id === edit
            //                           ? "active"
            //                           : "notactive"
            //                       }
            //                       onClick={() => setCase(issuedata.id)}
            //                       style={{
            //                         // borderRadius: "20px",
            //                         // borderBottomLeftRadius: "20px"
            //                         borderRadius: "15px",

            //                         display: "flex",
            //                         flexDirection: "column",
            //                         padding: "10px",
            //                         marginLeft: "-10px",

            //                         // color:
            //                         //   issuedata.Action === "Pending"
            //                         //     ? "yellow"
            //                         //     : "green",
            //                         // color: "#fff",
            //                         // padding: "5px",
            //                       }}
            //                     >
            //                       <span>
            //                         <span
            //                           style={{
            //                             fontWeight: 500,

            //                             padding: "5px",
            //                           }}
            //                         >
            //                           Case:
            //                         </span>
            //                         {issuedata?.case}
            //                       </span>
            //                       <span>
            //                         <span
            //                           style={{
            //                             fontWeight: 600,
            //                             padding: "5px",
            //                           }}
            //                         >
            //                           Department:
            //                         </span>
            //                         {issuedata?.Department}
            //                       </span>
            //                       <span>
            //                         <span
            //                           style={{
            //                             fontWeight: 600,
            //                             padding: "5px",
            //                           }}
            //                         >
            //                           Action:
            //                         </span>
            //                         <span
            //                           style={{
            //                             // paddingBottom:"100px",
            //                             fontWeight: 800,
            //                             color:
            //                               issuedata?.Action === "Pending"
            //                                 ? "#f0ad4e"
            //                                 : "Green",
            //                           }}
            //                         >
            //                           {issuedata?.Action}
            //                         </span>
            //                       </span>
            //                     </div>
            //                   </div>
            //                 </div>
            //               </div>
            //             );
            //           })}
            //         </div>
            //         <label style={{ fontSize: "20px", marginTop: "10px" }}>
            //           <span> New Issues ?</span>
            //         </label>
            //         <div
            //           style={{
            //             display: "flex",
            //             flexDirection: "column",
            //             border: "1px solid blue",
            //             width: "fit-content",
            //           }}
            //         ></div>
            //         {/* <input value={previssue} /> */}
            //         <div>
            //           <div
            //             // style={{display:"flex", justifyContent:"space-between"}}
            //             style={{
            //               display: "flex",
            //               justifyContent: "space-between",
            //             }}
            //           >
            //             <button
            //               className={`btn ${rotate ? "rotate-90" : ""}`}
            //               onClick={handleButtonClick}
            //               style={{
            //                 border: "none",
            //                 color: "green",
            //                 fontSize: "30px",
            //               }}
            //             >
            //               {showForm ? (
            //                 <IoMdAddCircle className="CrossContainer" />
            //               ) : (
            //                 <IoMdAddCircle className="plusContainer" />
            //               )}
            //             </button>
            //           </div>
            //           {showForm && (
            //             <div className="popup_form">
            //               <form
            //                 action=""
            //                 style={{ display: "flex", flexDirection: "column" }}
            //               >
            //                 <label
            //                   style={{ fontSize: "20px", color: "#454545" }}
            //                 >
            //                   Issue
            //                 </label>
            //                 {/* {artists?.map((data, index) => { */}
            //                 <textarea
            //                   name="names"
            //                   id=""
            //                   cols="5"
            //                   rows="5"
            //                   placeholder="Enter Issues "
            //                   // onChange={Issues}
            //                   value={names}
            //                   onChange={(e) => setNames(e.target.value)}
            //                 ></textarea>
            //                 ;{/* })} */}
            //                 {/* <button onClick={(e) => {}}>add</button> */}
            //                 <label
            //                   style={{ fontSize: "20px", color: "#454545" }}
            //                 >
            //                   Department
            //                 </label>
            //                 <input
            //                   className="ItInput"
            //                   name="Department"
            //                   type="text"
            //                   placeholder="Enter Department Name"
            //                   value={dept}
            //                   onChange={(e) => setDept(e.target.value)}
            //                 />
            //                 <label
            //                   style={{ fontSize: "20px", color: "#454545" }}
            //                 >
            //                   Action
            //                 </label>
            //                 <select
            //                   style={{ padding: "10px" }}
            //                   onChange={(e) => handle(e)}
            //                   value={actions}
            //                   // defaultValue={actions}
            //                 >
            //                   {/* <option>--Select--</option> */}
            //                   <option value="Pending">Pending</option>
            //                   <option value="Resolved">Resolved</option>
            //                 </select>
            //               </form>
            //               <div
            //                 style={{
            //                   display: "flex",
            //                   justifyContent: "space-between",
            //                 }}
            //               >
            //                 <button
            //                   onClick={CasesData}
            //                   style={{
            //                     marginTop: "10px",
            //                     width: "30%",
            //                     marginBottom: "10px",
            //                     backgroundColor: "#f7a933",
            //                     color: "white",
            //                     border: "none",
            //                     padding: "10px",
            //                   }}
            //                 >
            //                   Update
            //                 </button>
            //                 <button
            //                   onClick={AddData}
            //                   style={{
            //                     marginTop: "10px",
            //                     width: "30%",
            //                     marginBottom: "10px",
            //                     backgroundColor: "#47958a",
            //                     color: "white",
            //                     border: "none",
            //                     padding: "10px",
            //                   }}
            //                 >
            //                   Add New Case
            //                 </button>
            //               </div>
            //             </div>
            //           )}
            //         </div>
            //       </DialogContent>
            //       <DialogActions>
            //         <div style={{ marginBottom: "20px" }}>
            //           <Button
            //             onClick={handleClose}
            //             style={{
            //               textDecoration: "none",
            //               color: "red",
            //               border: "1px solid red",
            //               marginRight: "20px",
            //             }}
            //           >
            //             Cancel
            //           </Button>
            //           <Button
            //             onClick={SubmitIT}
            //             style={{ border: "1px solid green", color: "green" }}
            //           >
            //             Save
            //           </Button>
            //         </div>
            //       </DialogActions>
            //     </Dialog>
            //   </div>

            //   {/* <h1 className="TitleIT">EESPL IT Form </h1> */}
            //   {/* <form style={{ display: "flex", flexDirection: "column" }}>
            //   <label htmlFor="ProductId">Quotation No</label>
            //   <input
            //     type="text"
            //     name="QuotationNo"
            //     id="QNO"
            //     className="ItInput"
            //     value={quotationNo}
            //     onChange={handleQNo}
            //     required
            //   />
            //   <label htmlFor="">Serial No</label>
            //   <input
            //     type="text"
            //     name="SerialNo"
            //     id=""
            //     value={itdata.SerialNo}
            //     onChange={ItData}
            //   />
            //   <label htmlFor="">Model No</label>
            //   <input
            //     type="text"
            //     name="ModelNo"
            //     id=""
            //     value={itdata.ModelNo}
            //     onChange={ItData}
            //   />

            //   <div>
            //     <label style={{ fontSize: "20px" }}>Any Issues ?</label>
            //     {artists.map((issuedata) => {
            //       return (
            //         <div style={{ display: "flex", flexDirection: "column" }}>
            //           <div style={{ display: "flex", flexDirection: "row" }}>
            //             <span>{issuedata.case}</span>
            //             <span>{issuedata.Department}</span>
            //           </div>
            //         </div>
            //       );
            //     })}

            //     <button onClick={handleButtonClick}>Show Form</button>
            //     <button onClick={handleCloseForm}>X</button>
            //     {showForm && (
            //       <div className="popup-form" style={{ background: "teal" }}>
            //         <form
            //           action=""
            //           style={{ display: "flex", flexDirection: "column" }}
            //         >
            //           <label style={{ fontSize: "20px", color: "white" }}>
            //             Issue
            //           </label>

            //           <textarea
            //             name="Issue"
            //             id=""
            //             cols="10"
            //             rows="10"
            //             placeholder="Enter Issues "
            //             // onChange={Issues}
            //             value={names}
            //             onChange={(e) => setNames(e.target.value)}
            //           ></textarea>
            //           {/* <button onClick={(e) => {}}>add</button> */}

            //   {/* <label style={{ fontSize: "20px", color: "white" }}>
            //             Department
            //           </label>
            //           <input
            //             className="ItInput"
            //             name="Department"
            //             type="text"
            //             placeholder="Enter Department Name"
            //             value={dept}
            //             onChange={(e) => setDept(e.target.value)}
            //           /> */}

            //   {/* <button onClick={SubmitIT}> Boom</button> */}
            //   {/* </form>
            //         <button onClick={CasesData}>Add</button>
            //       </div>
            //     )}
            //   </div>
            //   <label htmlFor="IN Date">In Date</label>
            //   <input
            //     type="date"
            //     name="INDate"
            //     id=""
            //     value={itdata.INDate}
            //     onChange={ItData}
            //   />
            //   <label htmlFor="OUtDate">Out Date</label>
            //   <input
            //     type="date"
            //     name="OutDate"
            //     onChange={ItData}
            //     value={itdata.OutDate}
            //   />
            //   <button className="btnProduction" onClick={SubmitIT}>
            //     Finish
            //   </button>
            // </form>  */}
            // </div>
          )}
        </div>
      )}
    </>
  );
}
