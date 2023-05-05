import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import {
  doc,
  setDoc,
  updateDoc,
  addDoc,
  arrayUnion,
  Firestore,
} from "firebase/firestore";
import { db } from "./Firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Test() {
  const [datashow, setDatashow] = useState([]);
  const [para, setPara] = useState([]);
  const ShowData = async (e) => {
    const q = query(collection(db, "ProductionData"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
      id: detail.id,
      ...detail.data(),
    }));
    setDatashow(queryData);

    datashow.map((item) => {
      console.log(item);
      item.Parameters.forEach((data) => {
        // console.log(data.value);
        // setPara(data.value);
      });
    });

    // console.log(queryData.at(1));

    console.log(queryData.ProductionData);
  };

  useEffect(() => {
    ShowData();
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
      sort: "asc",
    },
    {
      label: "QuotationDetails",
      field: "QuotationDetails",
      sort: "asc",
    },
    {
      label: "ProductionInDate",
      field: "ProductionInDate",
      sort: "asc",
    },
    {
      label: "ProductionOutDate",
      field: "ProductionOutDate",
      sort: "asc",
    },
    {
      label: "Edit",
      field: "Edit",

    },
  ];

  console.log(para);
  const rows = datashow.map((row) => ({
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
    Edit: <button onClick={() => row.id}></button>,
  }));

  const tableData = {
    columns,
    rows,
  };

  //   columns: [
  //     {
  //       label: 'Name',
  //       field: 'name',
  //       sort: 'asc'
  //     },
  //     {
  //       label: 'Age',
  //       field: 'age',
  //       sort: 'asc'
  //     },
  //     {
  //       label: 'City',
  //       field: 'city',
  //       sort: 'asc'
  //     },
  //     {
  //       label: 'Country',
  //       field: 'country',
  //       sort: 'asc'
  //     },
  //     {
  //       label: 'Skills',
  //       field: 'skills',
  //       sort: 'asc'
  //     }
  //   ],
  //   rows: [
  //     {
  //       name: 'John Doe',
  //       age: 25,
  //       city: 'New York',
  //       country: 'USA',
  //       skills: ['React', 'JavaScript', 'CSS']
  //     },
  //     {
  //       name: 'Jane Smith',
  //       age: 30,
  //       city: 'San Francisco',
  //       country: 'USA',
  //       skills: ['Angular', 'TypeScript', 'HTML']
  //     }
  //   ]
  // };

  // const data = {
  //   columns: [
  //     {
  //       label: "Name",
  //       field: "name",
  //       sort: "asc",
  //       width: 150,
  //     },
  //     {
  //       label: "Position",
  //       field: "position",
  //       sort: "asc",
  //       width: 270,
  //     },
  //     {
  //       label: "Office",
  //       field: "office",
  //       sort: "asc",
  //       width: 200,
  //     },
  //     {
  //       label: "Age",
  //       field: "age",
  //       sort: "asc",
  //       width: 100,
  //     },
  //     {
  //       label: "Start date",
  //       field: "date",
  //       sort: "asc",
  //       width: 150,
  //     },
  //     {
  //       label: "Salary",
  //       field: "salary",
  //       sort: "asc",
  //       width: 100,
  //     },
  //   ],
  //   rows: [
  //     {
  //       name: "Tiger Nixon",
  //       position: "System Architect",
  //       office: "Edinburgh",
  //       age: 61,
  //       date: "2011/04/25",
  //       salary: "$320,800",
  //     },
  //     {
  //       name: "Garrett Winters",
  //       position: "Accountant",
  //       office: "Tokyo",
  //       age: 63,
  //       date: "2011/07/25",
  //       salary: "$170,750",
  //     },
  //     // Add more rows as needed
  //   ],
  // };
  return (
    // <MDBDataTable
    //   striped
    //   bordered
    //   small
    //   searchLabel="Search"
    //   hover
    //   responsive
    //   data={tableData}
    // />
    <MDBDataTable responsive striped  hover data={tableData} />
  );
}
