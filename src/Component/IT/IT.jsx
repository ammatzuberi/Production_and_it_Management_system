import React from "react";

export default function IT() {
  return (
    <div>
      <div className="ITFormContainer" style={{ padding: "20px" }}>
        <h1>E&E IT Form</h1>
        <form
          className="ITForm"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <label>Head Name</label>
          <input type="text" name="" id="" className="HeadName" required />
          <label htmlFor="IT Id">IT ID</label>
          <input type="text" name="" id="" className="IT Id" required />
          <label>In Date</label>
          <input type="date" name="" id="" className="indate" required />
          <label htmlFor="Out Date"> Out Date</label>
          <input type="date" name="" id="" className="outdate" required />
          <input type="submit" value="Done" className="btnIT" />
        </form>
      </div>
    </div>
  );
}
