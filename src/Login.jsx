import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "./Component/context/AuthContext";
import { Link } from "react-router-dom";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "./Firebase";
import "./login.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { height, width } from "@mui/system";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

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
    // console.log(Email);
  };
  const handleChangePassword = (e) => {
    // e.preventDefault();
    setPassword(e.target.value);
  };
  var dept;



  async function handleSubmit(e) {
    e.preventDefault();


     db.collection("users")
      .where("Email", "==", emailRef.current.value)
    
      .get()
      .then((querySnapshot) => {
        const queryData = querySnapshot.docs.map((detail) => ({
          id: detail.id,
          ...detail.data(),
        }));
        // console.log(queryData.Department);

        if (querySnapshot.docs.length > 0) {
          // alert("Login successful");
          localStorage.setItem("Email", emailRef.current.value);
          queryData.forEach((item) => {
            // console.log(item.Department);

            localStorage.setItem("Department", item.Department);
          });

          // window.location.reload();

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


    setLoading(false);

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);




      
      navigate("/Dashboard");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
  // useEffect(() => {

  // }, [Email]);

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
                  Already Have an account? <Link to="/signup" replace={true}>Sign UP</Link>
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
