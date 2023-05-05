import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { db } from "./Firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { MDBDataTable } from "mdbreact";

import {
  doc,
  setDoc,
  updateDoc,
  addDoc,
  arrayUnion,
  Firestore,
  deleteDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import Nav from "./Nav";
import {
  CardGroup,
  Col,
  Container,
  FormGroup,
  InputGroup,
  Row,
} from "react-bootstrap";

export default function Demo() {
  const uuid = uuidv4();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setInputval("");
    setShow(true);
  };

  const [admindata, setAdmindata] = useState([]);

  const [parametershow, setParametershow] = useState([]);
  const PrevParameter = async (e) => {
    const q = query(collection(db, "Parameters"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      id: detail.id,
      ...detail.data(),
    }));

    // setFirebasedata(queryData);
    setParametershow(queryData);
    queryData.forEach((data) => {
      console.log(data);
      setPara(data.Parameter || []);
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
    setAdmindata(queryData);
    console.log(admindata);
  };
  // }

  const [inputval, setInputval] = useState("");
  const [para, setPara] = useState("");
  const [paraId, setParaId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(data);
    // para.forEach((item) => {
    //   console.log(item.value);
    // });

    console.log(inputval);
    let arr = inputval.toString().toUpperCase().split(",");

    let filteredArr = arr.filter((val) => {
      // console.log(val);
      // console.log(para);
      let ret = !para.find((item) => {
        // console.log({ item: item.value, match: val });
        return item.value.toLowerCase() === val.toLowerCase();
      });
      console.log(ret);
      return ret;
    });

    console.log({ filteredArr });

    const Datafound = para.some((item) =>
      item.value.toLowerCase().includes(inputval.toLowerCase())
    );

    console.log(Datafound);
    if (Datafound) {
      alert("Data Already Found");
    } else if (inputval != "") {
      para?.push({
        value: inputval[0],
        label: inputval[0],
      });
    }
    // setPara([...para, { Parameter: inputval }]);
    console.log(para);

    setInputval("");
  };

  const AddtoFirebase = async (e) => {
    const q = query(collection(db, "Parameters"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));

    console.log(queryData);
    // var paraArr = inputval;

    let arr = inputval.toString().trim().toUpperCase().split(",");

    let filteredArr = arr.filter((val) => {
      let ret = !para.find((item) => {
        console.log({ item: item.value, match: val });
        return item.value.toLowerCase() === val.toLowerCase();
      });
      console.log(ret);

      return ret;
    });

    filteredArr.forEach((item) => {
      console.log(item);
      const itemId = uuidv4();

      para.push({
        label: item,
        value: item,
        id: itemId,
      });
    });

    queryData.map(async (v, id) => {
      await updateDoc(doc(db, `Parameters/Parameter`), {
        Parameter: arrayUnion(...para),
      })
        .then(() => {
          Swal.fire("Data Added Successful!", "success");
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setShow(false);
  };

  const [editpara, setEditpara] = useState(null);

  const Updatepara = async (e) => {
    setInputval("");
    e.preventDefault();
    if (inputval === "") {
      alert("Please Enter Parameter");
    } else {
      var editPara = para.map((item) => {
        console.log(paraId);
        if (item.id === paraId) {
          return {
            id: paraId,
            label: inputval.toUpperCase(),
            value: inputval.toUpperCase(),
          };
        } else {
          return item;
        }
      });
    }

    console.log(editPara);
    // para.push(editPara);

    const q = query(collection(db, "Parameters"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));

    console.log(queryData);

    queryData.map(async (v, id) => {
      await updateDoc(doc(db, `Parameters/Parameter`), {
        // ProductionData: productiondata,
        Parameter: editPara,
      })
        .then(() => {
          Swal.fire("Data Added Successful!", "success");
        })
        .then(() => {
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setShow(false);
  };

  const HandleDelete = async (id) => {
    Swal.fire({
      title: "Do you want to Delete This?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteDoc(doc(db, "ProductionData", id)); // replace 'collectionName' with the name of your Firestore collection
        console.log("Document successfully deleted!");

        setAdmindata(admindata.filter((item) => item.id !== id));
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 4;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const FilterData = admindata
    .filter((item) => {
      return item.id.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter((item) => {
      return searchQuery ? item : true;
    });

  const HandleSearch = (e) => {
    setSearchQuery(e.target.value);

    // setCurrentPage(0);
  };
  const displayData = searchQuery
    ? FilterData.slice(startIndex, endIndex)
    : admindata.slice(startIndex, endIndex);

  const pageCount = searchQuery
    ? Math.ceil(FilterData.length / itemsPerPage)
    : Math.ceil(admindata.length / itemsPerPage);

  const handleClick = async () => {
    const { value: email } = await Swal.fire({
      title: "Parameters Add To Database",

      inputLabel: "Please  Enter Parameters",
      inputPlaceholder: "Enter Parameters ",
    });

    if (email) {
      Swal.fire(`Entered email: ${email}`);
    }
  };

  const Paraset = (id) => {
    console.log(id);
    setParaId(id);

    // console.log(parametershow.Parameter)
    parametershow.forEach((item) => {
      console.log(item);
      // return item.id === id;
      const paraData = item.Parameter.find((para) => {
        return para.id === id;
      });
      setInputval(paraData.value);
      setEditpara(paraData.value);

      console.log(paraData.value);
    });
  };

  useEffect(() => {

    const sorted=
    ShowData();
    PrevParameter();
  }, []);

  const columns = [
    {
      label: "ID",
      field: "id",
      sort: "asc",
    },
    {
      label: "headname",
      field: "headname",
      sort: "asc",
    },
    {
      label: "Parameters",
      field: "Parameters",
    },
    {
      label: "Quotation Details",
      field: "QuotationDetails",
      sort: "asc",
    },
    {
      label: "Production In Date",
      field: "ProductionInDate",
      sort: "asc",
    },
    {
      label: "Alloted",
      field: "Alloted",
      sort: "asc",
    },
    {
      label: "No of Issues",
      field: "No_of_Issues",
      sort: "asc",
    },
    {
      label: "Model No",
      field: "Model_No",
      sort: "asc",
    },
    {
      label: "Serial No",
      field: "Serial_No",
      sort: "asc",
    },
    {
      label: "IT IN Date",
      field: "IT_IN_Date",
      sort: "asc",
    },
    {
      label: "IT OUT Date",
      field: "IT_OUT_Date",
      sort: "asc",
    },

    {
      label: "Delete",
      field: "Delete",
    },
  ];

  const rows = displayData.map((row) => ({
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

    Delete: (
      <button
        key={row.id}
        onClick={() => HandleDelete(row.id)}
        style={{
          textDecoration: "none",
          color: "red",
          fontSize: "20px",
          border: "none",
          backgroundColor: "#fff",
        }}
      >
        <AiFillDelete key={row.id} />
      </button>
    ),
  }));

  const tableData = {
    columns,
    rows,
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          float: "right",
          background: "#6b7397",
          color: "#fff",
          border: "none",
          marginRight: "55px",
        }}
      >
        Add New Parameters
      </Button>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Parameters </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Parameter </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter New Parameters."
                onChange={(e) => setInputval(e.target.value)}
                value={inputval}
              />
              <Form.Text className="text-muted">
                Example: BOD, COD etc
              </Form.Text>
            </Form.Group>
          </Form>
          <label>All Parameter</label>
          {parametershow.map((parameter) => {
            return (
              <Card
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  padding: "10px",
                  height: "25vh",
                }}
              >
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    width: "50px",
                    overflowX: "auto",
                  }}
                >
                  {parameter?.Parameter?.map((item, index) => (
                    <div key={index} onClick={() => Paraset(item.id)}>
                      <div>
                        <div
                          className={
                            item.id === paraId ? "ActivePara" : "notActivePara"
                          }
                        >
                          {item?.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            );
          })}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ background: "#ff0000", color: "#fff", border: "none" }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={AddtoFirebase}
            style={{ color: "#fff", background: "#06aa8b", border: "none" }}
          >
            Add to Database
          </Button>

          <Button
            variant="primary"
            onClick={Updatepara}
            style={{ color: "#fff", background: "#202a34", border: "none" }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{ background: "#f5f6fa", height: "90vh", marginTop: "-20px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <button onClick={handleClick}>Try me</button> */}
          <input
            className="Search_TopBox"
            type="search"
            placeholder="Search Quotation here"
            // onChange={(e) => setSearchQuery(e.target.value)}
            onChange={HandleSearch}
            style={{
              marginTop: "-57px",
              marginleft: "417px",
              width: "200px",
              height: "40px",
            }}
            required
          />
        </div>
        {/* <MultiSelect
        options={options}
        value={selectedOptions}
        onChange={setSelectedOptions}
        labelledBy="Select"
        hasSelectAll={false}
        disableSearch={true}
        overrideStrings={{
          selectSomeItems: "Select options",
          allItemsAreSelected: "All options are selected",
          selectAll: "Select all",
          search: "Search",
        }}
      />
      <button onClick={handleSelectedOptionsChange}> Add</button> */}
        <MDBDataTable
          striped
          bordered
          small
          hover
          responsive
          data={tableData}
        />
        <div
          style={{
            // position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            right: 0,
            marginRight: "15px",
          }}
        >
          {/* <label htmlFor="Parameters">Parameters</label> */}

          {/* <button onClick={handleSubmit}>Add to array </button> */}
          {/* <button onClick={AddtoFirebase} className="Admin_button">
            Add To Database
          </button> */}

          {/* <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
           >
            <table
              style={{
                marginTop: "60px",
                fontSize: "12px",
                position: "absolute",
                top: "68px",
              }}
              className="IT_Table"
            >
              <thead>
                <tr>
                  <th className="IT_th">Quotation No</th>
                  <th className="IT_th">Parameters</th>
                  <th className="IT_th">Head Name</th>
                  <th className="IT_th">Quotation Details</th>
                  <th className="IT_th">Production In Date</th>
                  <th className="IT_th">Production Out Date</th>
                  <th className="IT_th">Alloted To</th>
                  <th className="IT_th">No of Issues</th>
                  <th className="IT_th">Model No</th>
                  <th className="IT_th">Serial No</th>
                  <th className="IT_th">IT IN Date</th>
                  <th className="IT_th">IT OUT Date</th>

                  <th className="IT_th">Delete</th>
                </tr>
              </thead>
              {displayData?.map((pdata) => {
                // console.log(pdata.Parameters);
                // console.log(pdata.QuotationNo.QuotationNo);
                return (
                  <tbody
                    key={pdata.id}
                    style={{
                      marginBottom: "20px",
                      borderSpacing: "10px",
                    }}
                  >
                    <tr style={{ paddingBottom: "50px" }}>
                      <td className="IT_td">{pdata.id} </td>

                      <td className="IT_td">
                        {pdata?.Parameters?.map((ParametersData, index) => {
                          return (
                            <span
                              style={{ padding: "10px" }}
                              key={index}
                              className="col-6"
                            >
                              {ParametersData.value}
                            </span>
                          );
                        })}
                      </td>
                      <td className="IT_td">
                        {pdata?.ProductionData?.headname}
                      </td>
                      <td className="IT_td">
                        {pdata?.ProductionData?.QuotationDetails}
                      </td>
                      <td className="IT_td">
                        {pdata?.ProductionData?.ProductionInDate}
                      </td>
                      <td className="IT_td">
                        {pdata?.ProductionData?.ProductionOUtDate}
                      </td>
                      <td className="IT_td" style={{ fontWeight: "700" }}>
                        {pdata?.ItData?.AllotedTo}
                      </td>

                      <td className="IT_td">
                        <span
                        // style={{
                        //   color:
                        //     issue?.Action === "Resolved"
                        //       ? "green"
                        //       : "red",
                        // }}
                        >
                          {pdata?.Issue?.length}
                        </span>
                      </td>
                      <td className="IT_td">{pdata?.ItData?.ModelNo}</td>
                      <td className="IT_td">{pdata?.ItData?.SerialNo}</td>
                      <td className="IT_td">{pdata?.ItData?.INDate}</td>
                      <td className="IT_td">{pdata?.ItData?.OutDate}</td>

                      <td className="IT_td">
                        <button
                          key={pdata.id}
                          onClick={() => HandleDelete(pdata.id)}
                          style={{
                            textDecoration: "none",
                            color: "red",
                            fontSize: "20px",
                            border: "none",
                            backgroundColor: "#fff",
                          }}
                        >
                          <AiFillDelete key={pdata.id} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
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
            </table>
          </div> */}
        </div>
      </div>
    </>
  );
}
