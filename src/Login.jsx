import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "./Component/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "./Firebase";
import "./login.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { height, width } from "@mui/system";
import Swal from "sweetalert2";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [firebasedata, setFirebasedata] = useState([]);
  const [Role, setRole] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleChange = (event) => {
    // setRole(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeEmail = (e) => {
    // e.preventDefault();
    setEmail(e.target.value);
    console.log(Email);
  };
  const handleChangePassword = (e) => {
    // e.preventDefault();
    setPassword(e.target.value);
  };
  var dept;
  function handleSubmit(e) {
    e.preventDefault();

    // const query = db
    //   .collection("users")
    //   .where("Email", "==", Email && "Password", "==", Email);
    // console.log(query);
    // query.onSnapshot((snapshot) => {
    //   const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //   if (snapshot.docs.length > 0) {
    //     localStorage.setItem("Email", Email);
    //     localStorage.setItem("Department", dept);
    //   }
    //   // setFirebasedata(data);
    //   console.log(data);
    //   // if(!data.length ) alert("Id does not exist")
    // });

    db.collection("users")
      .where("Email", "==", Email)
      .where("Password", "==", Password)
      .get()
      .then((querySnapshot) => {
        const queryData = querySnapshot.docs.map((detail) => ({
          id: detail.id,
          ...detail.data(),
        }));
        // console.log(queryData.Department);

        if (querySnapshot.docs.length > 0) {
          // alert("Login successful");
          localStorage.setItem("Email", Email);
          queryData.forEach((item) => {
            // console.log(item.Department);
            localStorage.setItem("Department", item.Department);
          });

          window.location.reload();
        } else {
          Swal.fire({
            title: "Login Failed",
            text: "Please Check Email And Password",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // try {
    //   setError("");

    //   setLoading(true);
    //   console.log(firebasedata);

    //   // dept = firebasedata.Role;
    //   // console.log(dept);
    //   // console.log({ Email, Password, Role });

    //   // firebasedata.forEach((user) => {
    //   //   console.log(user.Department);

    //   //   dept = user.Department;
    //   //   console.log(dept);
    //   //   console.log(user.Password);
    //   //   if (
    //   //     Email === user.Email &&
    //   //     Password === user.Password
    //   //     // Role === user.Role
    //   //   ) {
    //   //     localStorage.setItem("Email", Email);
    //   //     localStorage.setItem("Department", dept);

    //   //     // navigate("/");
    //   //     // window.location.reload();
    //   //     // <Alert>{"Login Successful"}</Alert>;
    //   //     userData();
    //   //   } else {
    //   //     Swal.fire({
    //   //       title: "Login Failed",
    //   //       text: "Please Check Email And Password",
    //   //       icon: "error",
    //   //       confirmButtonText: "OK",
    //   //     });
    //   //   }
    //   // });
    // } catch {
    //   // setError("Email And Password Does Not Match");
    // }

    setLoading(false);
  }
  useEffect(() => {
    // const query = db
    //   .collection("users")
    //   .where("Email", "==", Email && "Password", "==", Password);
    // console.log(query);
    // const unsubscribe = query.onSnapshot((snapshot) => {
    //   const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    //   if (data.length > 0) {
    //     localStorage.setItem("Email", Email);
    //     localStorage.setItem("Department", dept);
    //   }
    //   setFirebasedata(data);
    //   console.log(data);
    //   // if(!data.length ) alert("Id does not exist")
    // });
    // return () => unsubscribe();
    // unsubscribe();
  }, [Email]);

  return (
    <>
      <div
        className="loginContainer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          height: "100vh",
          width: "100%",
        }}
      >
        <div className="containerLogin">
          <div
            className="loginDiv"
            style={{
              display: "flex",
              flexDirection: "row",
              background: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card className="loginform">
              <Card.Body>
                <h2
                  className="text-center mb-4"
                  style={{ position: "absolute", top: "0" }}
                >
                  Login
                </h2>

                {error && <Alert variant="danger">{error} </Alert>}
                <Form onSubmit={handleSubmit} style={{}}>
                  <Form.Group id="email" style={{ display: "flex" }}>
                    <Form.Label
                      style={{ position: "absolute", marginRight: "10px" }}
                    >
                      <MdEmail />
                    </Form.Label>
                    <Form.Control
                      className="Emaillogin"
                      type="email"
                      ref={emailRef}
                      onChange={handleChangeEmail}
                      required
                      placeholder=" Your Email"
                      style={{
                        border: "none",
                        paddingLeft: "30px",
                        fontWeight: 800,

                        borderBottom: "1px solid #999",
                        borderRadius: "0px",

                        marginBottom: "20px",
                      }}
                    />
                  </Form.Group>
                  <Form.Group id="password" style={{ display: "flex" }}>
                    <Form.Label
                      style={{ position: "absolute", marginRight: "10px" }}
                    >
                      <RiLockPasswordLine />
                    </Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      onChange={handleChangePassword}
                      required
                      placeholder="Your Password"
                      style={{
                        border: "none",
                        paddingLeft: "30px",

                        borderBottom: "1px solid #999",
                        borderRadius: "0px",
                        fontFamily: "Poppins !important",
                        marginBottom: "20px",
                      }}
                    />
                  </Form.Group>
                  {/* <label style={{ marginTop: "10px", marginBottom: "10px" }}>
                    Department:{" "}
                  </label> */}
                  {/* <select
                    value={Role}
                    onChange={handleChange}
                    style={{
                      marginLeft: "10px",
                      marginTop: "10px",
                      height: "35px",
                      marginBottom: "20px",
                    }}
                    required
                  >
                    <option>Select</option>
                    <option value="Production">Production</option>
                    <option value="IT Department">IT Department</option>
                  </select> */}

                  <Button
                    // disabled={loading}
                    // onClick={userData}
                    type="submit"
                    className="w-100 "
                    style={{ marginBottom: "10px" }}
                  >
                    Log In
                  </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                  Already Have an account? <Link to="/signup">Sign UP</Link>
                </div>
              </Card.Body>
            </Card>
            <div>
              <img
                src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
